/*
Copyright (c) 2013 Sam Decrock / iMinds Media Innovation Center <sam.decrock@gmail.com>

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var httpreq = require('httpreq');
var sprintf = require('sprintf').sprintf;
var commands = require('./commands');

function Camera(ip) {
	this.ip = ip;

	return this;
}

function getBaseUrl (ip) {
	return "http://"+ip+"/cgi-bin/";
}

/**
 * moveToPreset(presetnumber, [callback])
 */
Camera.prototype.moveToPreset = function (presetnumber, callback) {
	// #R[Data]
	var cmd = '#R' + sprintf("%02d", (presetnumber-1) );
	this.sendPtCommand(cmd, callback);
};

Camera.prototype.pantiltAbsolute = function (panDegrees, tiltDegrees, callback) {
	var pan = parseInt(panDegrees) + 180;
	pan = pan/(180+180)*0xFFFF;
	pan = Math.round(pan);

	var tilt = parseInt(tiltDegrees) + 90;
	tilt = tilt/(90+90)*0xFFFF;
	tilt = 0xFFFF - tilt;
	tilt = Math.round(tilt);

	pan = Math.min(pan, 0xFFFF);
	pan = Math.max(pan, 0x0000);

	tilt = Math.min(tilt, 0xFFFF);
	tilt = Math.max(tilt, 0x0000);

	// #APC[Data1][Data2]
	var cmd = '#APC' + (sprintf("%04x", pan)).toUpperCase() + (sprintf("%04x", tilt)).toUpperCase();
	this.sendPtCommand(cmd, callback);
};

Camera.prototype.sendPtCommand = function (cmd, callback) {
	console.log("sending " + cmd);
	httpreq.get( getBaseUrl(this.ip) + 'aw_ptz' , {
		parameters:{
			cmd: cmd,
			res: 1
		}
	}, function (err, res) {
		if(!callback) return;
		if(err) return callback(err);
		return callback(null, parseResponse(res.body));
	});
};

Camera.prototype.sendCameraCommand = function (cmd, callback) {
	console.log("sending " + cmd);
	httpreq.get( getBaseUrl(this.ip) + 'aw_cam' , {
		parameters:{
			cmd: cmd,
			res: 1
		}
	}, function (err, res) {
		if(!callback) return;
		if(err) return callback(err);
		return callback(null, parseResponse(res.body));
	});
};

function parseResponse (response) {
	var outputdata = {};

	var cmdFound = false;

	for (var i = commands.length - 1; i >= 0; i--) {
		var cmd = commands[i];


		var responseRegexes = createResponseRegexes(cmd);
		if(!responseRegexes) continue; // if none, just skip to the next one




		for(var key in responseRegexes){

			var responseRegex = responseRegexes[key];

			var match = response.match(responseRegex);
			if(match && match[1]){
				cmdFound = true;
				outputdata[key] = {code: match[1], code_text: null};
			}
		}

		if(cmdFound) break;
	};


	for(var key in outputdata){
		outputdata[key].code_text = getHumanReadableResponse(cmd, key, outputdata[key].code);
	}

	return outputdata;
}

function createResponseRegexes (cmd) {
	if(!cmd.commands.response) return null;


	var regexPerValue = null;

	for(var key in cmd.values){

		var completeRegex = cmd.commands.response;

		for(var key2 in cmd.values){
			var regex = getRegexFromValue(cmd.values[key]);

			if(key == key2){
				regex = '('+regex+')';
			}
			completeRegex  = completeRegex.replace(key2, regex);
		}

		if(!regexPerValue) regexPerValue = {};
		regexPerValue[key] = new RegExp(completeRegex, 'i');
	}

	return regexPerValue;
}

function getRegexFromValue (value) {
	var stops;

	if(value.type == 'range'){
		stops = value.stops;
	}else{
		stops = value;
	}

	for(var stop in stops){
		var lastChar = stop.substr(stop.length - 1);

		var regex = "";
		if(lastChar == 'h'){
			for (var i = 0; i < stop.length-1; i++) {
				regex += '[0-9a-f]';
			};

		}else{
			for (var i = 0; i < stop.length; i++) {
				regex += '[0-9]';
			};
		}
		return regex;
	}
}

function getHumanReadableResponse(cmd, key, responseCode){
	var stops;

	if(cmd.values[key].type == 'range'){
		stops = cmd.values[key].stops;
	}else{
		stops = cmd.values[key];
	}

	var radix = 10;

	var exact = null;
	var lowValue = 0;
	var lowText = '';
	var highValue = Number.MAX_VALUE;
	var highText = '';

	for(var code in stops){
		var text = stops[code];

		var lastChar = code.substr(code.length - 1);
		if(lastChar == 'h'){
			radix = 16;
			code = code.substr(0, code.length-1);
		}

		var value = parseInt(code, radix);
		var responseValue = parseInt(responseCode, radix);

		if(responseValue == value){
			exact = text;
			break;
		}

		if(responseValue > value && responseValue > lowValue){
			lowValue = value;
			lowText = text;
		}

		if(responseValue < value && responseValue < highValue){
			highValue = value;
			highText = text;
		}
	}

	if(exact){
		return exact;
	}else{
		return lowText + ' - ' + highText;
	}
}

console.log( createResponseRegexes(commands[commands.length-1]) );

exports.commands = commands;
exports.Camera = Camera;

