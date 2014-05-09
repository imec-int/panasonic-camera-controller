module.exports = [
	{
		type: 'camera',
		item: 'MODEL NUMBER',
		commands: {
			confirmation: 'QID',
			response: 'OID:[Data]'
		},
		values: {
			'[Data]':{
				'00': 'AW-E300 / AW-E300P / AW-E300E',
				'01': 'AW-E600 / AW-E600P / AW-E600E',
				'02': 'AW-E800 / AW-E800P',
				'03': 'AW-E800E'
			}
		}
	},
	{
		type: 'camera',
		item: 'SOFTWARE VERSION',
		commands: {
			confirmation: 'QSV',
			response: 'OSV:[Data]'
		}
	},
	{
		type: 'camera',
		item: 'SHUTTER',
		commands: {
			control: 'OSH:[Data]',
			confirmation: 'QGU',
			response: 'OGU:[Data]'
		},
		values: {
			'[Data]':{
				'0': 'OFF',
				'3': '1/100(NSTC)',
				'5': '1/250'
			}
		}
	},
	{
		type: 'camera',
		item: 'IRIS AUTO/MANUAL',
		commands: {
			control: 'ORS:[Data]',
			confirmation: 'QRS',
			response: 'ORS:[Data]'
		},
		values:{
			'[Data]':{
				'0': 'Manual',
				'1': 'AUTO'
			}
		}
	},
	{
		type: 'camera',
		item: 'MANUAL IRIS VOLUME',
		commands: {
			control: 'ORV:[Data]',
			confirmation: 'QRV',
			response: 'ORV:[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
					'000h': 'Close',
					'3FFh': 'Open',
				}
			}
		}
	},
	{
		type: 'camera',
		item: 'MENU',
		commands: {
			control: 'DUS:[Data]',
			confirmation: 'QUS',
			response: 'OUS:[Data]'
		},
		values:{
			'[Data]':{
				'0': 'OFF',
				'1': 'ON'
			}
		}
	},
	{
		type: 'camera',
		item: 'PUSH AUTO FOCUS',
		commands: {
			control: 'OSE:69:[Data]',
		},
		values:{
			'[Data]':{
				'1': 'PUSH AUTO'
			}
		}
	},
	{
		type: 'camera',
		item: 'DIGITAL ZOOM ENABLE',
		commands: {
			control: 'OSE:70:[Data]',
			confirmation: 'QSE:70',
			response: 'OSE:70:[Data]'
		},
		values:{
			'[Data]':{
				'0': 'DISABLE',
				'1': 'ENABLE'
			}
		}
	},
	{
		type: 'camera',
		item: 'GAMMA TYPE',
		commands: {
			control: 'OSE:72:[Data]',
			confirmation: 'QSE:72',
			response: 'OSE:72:[Data]'
		},
		values:{
			'[Data]':{
				'0': 'OFF',
				'1': 'NORMAL',
				'2': 'CINEMA',
				'3': 'PC-LCD'
			}
		}
	},
	{
		type: 'pt',
		item: 'Save Preset Memory',
		commands: {
			control: '#M[Data]',
			response: 's[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
					'00': 'Preset001',
					'99': 'Preset100'
				}
			}
		}
	},
	{
		type: 'pt',
		item: 'Recall Preset Memory',
		commands: {
			control: '#R[Data]',
			response: 's[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
					'00': 'Preset001',
					'99': 'Preset100'
				}
			}
		}
	},
	{
		type: 'pt',
		item: 'TALLY Enable',
		commands: {
			control: '#TAE[Data]',
			confirmation: '#TAE',
			response: 'tAE[Data]'
		},
		values:{
			'[Data]':{
				'0': 'Disable',
				'1': 'Enable'
			}
		}
	},
	{
		type: 'pt',
		item: 'Pan Speed Control',
		commands: {
			control: '#P[Data]',
			response: 'pS[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
					'01': 'Left Max. Speed',
					'50': 'Stop',
					'99': 'Right Max. Speed'
				}
			}
		}
	},
	{
		type: 'pt',
		item: 'Tilt Speed Control',
		commands: {
			control: '#T[Data]',
			response: 'tS[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
					'01': 'Down Max. Speed',
					'50': 'Stop',
					'99': 'UP Max. Speed'
				}
			}
		}
	},
	{
		type: 'pt',
		item: 'Zoom Speed Control',
		commands: {
			control: '#Z[Data]',
			response: 'zS[Data]'
		},
		values:{
			'[Data]':{
				type: 'range',
				stops: {
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
		type: 'pt',
		item: 'Pan/Tilt Absolute Position Control',
		commands: {
			control: '#APC[Data1][Data2]',
			confirmation: '#APC',
			response: 'aPC[Data1][Data2]'
		},
		values:{
			'[Data1]':{
				type: 'range',
				stops: {
					'0000h': 'CCW Limit',
					'8000h': 'Center',
					'FFFFh': 'CW Limit'
				}
			},
			'[Data2]':{
				type: 'range',
				stops: {
					'0000h': 'UP Limit',
					'8000h': 'Center',
					'FFFFh': 'DOWN Limit'
				}
			}
		}
	}
];