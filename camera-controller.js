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
	// console.log(response);
	var outputdata = null;

	for (var i = commands.length - 1; i >= 0; i--) {
		var cmd = commands[i];
		var responseFormat = cmd.commands.response;
		if(!responseFormat) continue;

		var matchregex = responseFormat.replace(/\[Data(\d+)?\]/ig, "(.+)");
		matchregex = '^' + matchregex + '$';
		var match = response.match(new RegExp(matchregex, 'i'));
		if(!match) continue;




		// console.log('found matching responseFormat', responseFormat);


		// first check the number of [DataX] occurrences:
		var data_occurrences = responseFormat.match(/\[Data(\d+)?\]/g);

		var responseRegex = responseFormat;

		// now loop over each [DataX] occurrence to extract the matching response:
		for (var i = 0; i < data_occurrences.length; i++) {
			var data_occurrence = data_occurrences[i];


			if(data_occurrences.length > 1)
				responseRegex = responseRegex.replace(data_occurrence, "(\.{4})?"); //un-hardcode this !! (if there are more than 1 [Data]-elements, first find the number of characters a [DataX]-element has)
			else
				responseRegex = responseRegex.replace(data_occurrence, "(\.+)");
		};

		responseRegex = '^' + responseRegex + '$';

		// console.log(responseRegex);

		var match = response.match(new RegExp(matchregex));
		outputdata = {};
		if(match && match[1]){
			for (var i = 0; i < data_occurrences.length; i++) {
				var data_occurrence = data_occurrences[i];

				var code = match[i+1];

				var code_text = cmd.values[data_occurrence][code];

				outputdata[data_occurrence] = {code: code, code_text: code_text};
			};
		}
	};

	return outputdata;
}

exports.commands = commands;
exports.Camera = Camera;

