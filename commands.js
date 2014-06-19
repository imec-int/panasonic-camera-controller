module.exports = [
	{
		type   : 'camera',
		name   : 'MODEL NUMBER',
		input  : 'QID',
		output : 'OID:[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'00': 'AW-E300 / AW-E300P / AW-E300E',
					'01': 'AW-E600 / AW-E600P / AW-E600E',
					'02': 'AW-E800 / AW-E800P',
					'03': 'AW-E800E'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'SOFTWARE VERSION',
		input  : 'QSV',
		output : 'OSV:[Data]'
	},
	{
		type   : 'camera',
		name   : 'SHUTTER',
		input  : 'OSH:[Data]',
		output : 'OGU:[Data]',
		values : {
			'[Data]': {
				type  : 'discrete',
				codes : {
					'0': 'OFF',
					'3': '1/100(NSTC)',
					'5': '1/250'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'IRIS AUTO/MANUAL',
		input  : 'ORS:[Data]',
		output : 'ORS:[Data]',
		values : {
			'[Data]': {
				type  : 'discrete',
				codes : {
					'0': 'Manual',
					'1': 'AUTO'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'MANUAL IRIS VOLUME',
		input  : 'ORV:[Data]',
		output : 'ORV:[Data]',
		values : {
			'[Data]': {
				type   : 'linear',
				codes: {
					'000h': 'Close',
					'3FFh': 'Open',
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'MENU',
		input  : 'DUS:[Data]',
		output : 'DUS:[Data]',
		values : {
			'[Data]': {
				type  : 'discrete',
				codes : {
					'0': 'OFF',
					'1': 'ON'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'PUSH AUTO FOCUS',
		input  : 'OSE:69:[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'1': 'PUSH AUTO'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'DIGITAL ZOOM ENABLE',
		input  : 'OSE:70:[Data]',
		output : 'OSE:70:[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'0': 'DISABLE',
					'1': 'ENABLE'
				}
			}
		}
	},
	{
		type   : 'camera',
		name   : 'GAMMA TYPE',
		input  : 'OSE:72:[Data]',
		output : 'OSE:72:[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'0': 'OFF',
					'1': 'NORMAL',
					'2': 'CINEMA',
					'3': 'PC-LCD'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Save Preset Memory',
		input  : '#M[Data]',
		output : 's[Data]',
		values : {
			'[Data]':{
				type   : 'linear',
				codes: {
					'00': 'Preset001',
					'99': 'Preset100'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Recall Preset Memory',
		input  : '#R[Data]',
		output : 's[Data]',
		values : {
			'[Data]':{
				type   : 'linear',
				codes: {
					'00': 'Preset001',
					'99': 'Preset100'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'TALLY Enable',
		input  : '#TAE[Data]',
		output : 'tAE[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'0': 'Disable',
					'1': 'Enable'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Tally Control',
		input  : '#DA[Data]',
		output : 'dA[Data]',
		values : {
			'[Data]':{
				type  : 'discrete',
				codes : {
					'0': 'OFF',
					'1': 'ON'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Pan Speed Control',
		input  : '#P[Data]',
		output : 'pS[Data]',
		values : {
			'[Data]':{
				type   : 'linear',
				codes: {
					'01': 'Left Max. Speed',
					'50': 'Stop',
					'99': 'Right Max. Speed'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Tilt Speed Control',
		input  : '#T[Data]',
		output : 'tS[Data]',
		values : {
			'[Data]':{
				type   : 'linear',
				codes: {
					'01': 'Down Max. Speed',
					'50': 'Stop',
					'99': 'UP Max. Speed'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Zoom Speed Control',
		input  : '#Z[Data]',
		output : 'zS[Data]',
		values : {
			'[Data]':{
				type   : 'linear',
				codes: {
					'01': 'Wide Max. Speed',
					'49': 'Wide Min. Speed',
					'50': 'Stop',
					'51': 'Tele Min. Speed',
					'99': 'Tele Max. Speed'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Zoom Position Control',
		input  : '#AXZ[Data]',
		output : 'axz[Data]',
		values:{
			'[Data]':{
				type   : 'linear',
				codes: {
					'555h': 'Wide',
					'FFFh': 'Tele'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Zoom Position Control (absolute)',
		input  : '#AYZ[Data]',
		output : 'axz[Data]',
		values:{
			'[Data]':{
				type   : 'linear',
				codes: {
					'001': 'Wide',
					'999': 'Tele'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Iris Control',
		input  : '#AXI[Data]',
		output : 'axi[Data]',
		values:{
			'[Data]':{
				type   : 'linear',
				codes: {
					'555h': 'Iris Close',
					'FFFh': 'Iris Open'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Iris Control (absolute)',
		input  : '#AYI[Data]',
		output : 'axi[Data]',
		values:{
			'[Data]':{
				type   : 'linear',
				codes: {
					'001': 'Iris Close',
					'999': 'Iris Open'
				}
			}
		}
	},
	{
		type   : 'pt',
		name   : 'Pan/Tilt Absolute Position Control',
		input  : '#APC[Data1][Data2]',
		output : 'aPC[Data1][Data2]',
		values:{
			'[Data1]':{
				type   : 'linear',
				codes: {
					'0000h': 'CCW Limit',
					'8000h': 'Center',
					'FFFFh': 'CW Limit'
				}
			},
			'[Data2]':{
				type   : 'linear',
				codes: {
					'0000h': 'UP Limit',
					'8000h': 'Center',
					'FFFFh': 'DOWN Limit'
				}
			}
		}
	}
];