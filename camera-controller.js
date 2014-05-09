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
	for (var i = commands.length - 1; i >= 0; i--) {
		var matchregex = commands[i].commands.response;
		if(!matchregex) continue;

		matchregex = matchregex.replace(/\[Data(\d+)?\]/ig, "(.+)");
		matchregex = '^' + matchregex + '$';

		var match = response.match(new RegExp(matchregex, 'i'));
		if(match){
			return match;
		}
	};

	return response;
}

exports.commands = commands;
exports.Camera = Camera;

