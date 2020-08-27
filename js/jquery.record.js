// Audio model

// First init

// Get saved sound volume
if (!$.Storage.get('record_volume')) { var sm_volume = 60; $.Storage.set('record_volume', '60'); }
var sm_volume = $.Storage.get('record_volume');

// soundManager init
soundManager.setup({
	url: '/bitrix/templates/flat-new/js/soundmanagerv297a-20150601/swf/',
	useHTML5Audio: false,
	flashVersion: 9,	// версия флеш
	preferFlash: false,	// предпочитаем использовать именно флеш
	useHighPerformance: false,	// включаем повышенный приоритет flash для улучшения whileplaying и EQ
	forceUseGlobalHTML5Audio: false,
	onready: function() {
		$(document).trigger('soundManagerReady', [soundManager]);
	}
});

var sm_duration = 0;
var sm_durationEstimate = 0;
var sm_positon = 0;
var old_seconds = 0;
var time_played = 0;
var current_station = 0;

function start_play(url, from) {
	if (window.globalSound && window.globalSound.paused  === true && !url.match("^http://air") && window.globalSound.url == url) { resume_play(from) }
//	if (window.globalSound && window.globalSound.paused  === true && window.globalSound.url == url) { resume_play(from) }
	else {
		if (window.globalSound && window.globalSound.playState && window.globalSound.url == url) { }
		else {
			stop_play(from); 	// mb need check for paused state?
			time_played = Math.floor((new Date().getTime())/1000);
			window.globalSound = soundManager.createSound({
				id: from,
				url: url,
				autoLoad: false,
				autoPlay: true,
				stream: true,
				useFastPolling: true,
				multiShot: false,
				volume: getVolume(),
				stopOtherSounds: true,
				whileplaying: function() {
					sm_durationEstimate = this.durationEstimate
					sm_positon = this.position;
					sm_duration = this.duration;
					old_seconds = Math.floor(this.position/1000);
				},
				onplay: function() {
					$(document).trigger('soundManagerStart', from);
				},
				onstop: function() {
					$(document).trigger('soundManagerStop', window.globalSound.id);
					if ($.Storage.get('play_from')) { $.Storage.remove('play_from'); }	// deprecated
				},
				onpause: function() {
					$(document).trigger('soundManagerPause', window.globalSound.id);
				},
				onresume: function() {
					$(document).trigger('soundManagerResume', window.globalSound.id);
				},
				onfinish: function(){
					$(document).trigger('soundManagerFinish', window.globalSound.id);
				}
			});

			window.localStorage.currentPlayer = window.currentInstance;

		}
	}
}

function getVolume() {
	return sm_volume;
}

function setVolume(value) {
	$.Storage.set('record_volume', value.toString());
	window.sm_volume = value;
	$(document).trigger('soundManagerVolumeChange', value);
	return soundManager.setVolume(value);
}

function stop_play(from) {
	if (window.globalSound) {
		window.globalSound.destruct();
	}
}

function pause_play(from) {
	window.globalSound.pause();
}

function resume_play(from) {
	window.globalSound.resume();
}

var stations = {
	'rr' :	{ 
		'name' 		: 'Radio Record',
		'short' 	: 'rr',
		"tns": {
			"stationId": "20015",
			"secName": "radio_record-1"
		},
		'color' 	: 'hsla(195, 5%, 23%, 1)',
		'fcolor' 	: 'hsla(195, 5%, 75%, 1)',
		'bcolor' 	: 'hsla(195, 5%, 50%, 0.5)',
		'text' 		: ''
	},
	'sd90' :	{
		'name' 		: 'Супердискотека 90-х',
		'short' 	: 'sd90',
		'color' 	: 'hsla(202, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(202, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(202, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'elect' :	{
		'name' 		: 'Electro',
		'short' 	: 'elect',
		'color' 	: 'hsla(202, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(202, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(202, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'rus' :	{
		'name' 		: 'Russian Mix',
		'short' 	: 'rus',
		'color' 	: 'hsla(20, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(20, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(20, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'tm' :	{
		'name' 		: 'Trancemission Radio',
		'short' 	: 'tm',
		'color' 	: 'hsla(278, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(278, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(278, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'deep' :	{
		'name' 		: 'Record Deep',
		'short' 	: 'deep',
		'color' 	: 'hsla(252, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(252, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(252, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'chil' :	{
		'name' 		: 'Record Chill-Out',
		'short' 	: 'chil',
		'color' 	: 'hsla(28, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(28, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(28, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'club' :	{
		'name' 		: 'Record EDM',
		'short' 	: 'club',
		'color' 	: 'hsla(297, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(297, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(297, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'vip' :	{
		'name' 		: 'Vip House',
		'short' 	: 'vip',
		'color' 	: 'hsla(340, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(340, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(340, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'rock' :	{
		'name' 		: 'Record Rock',
		'short' 	: 'rock',
		'color' 	: 'hsla(0, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(0, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(0, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'ps' :	{
		'name' 		: 'Pirate Station',
		'short' 	: 'ps',
		'color' 	: 'hsla(204, 10%, 10%, 1)',
		'fcolor' 	: 'hsla(204, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(204, 10%, 20%, 0.5)',
		'text' 		: ''
	},
	'mdl' :	{
		'name' 		: 'Медляк FM',
		'short' 	: 'mdl',
		'color' 	: 'hsla(314, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(314, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(314, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'trap' :	{
		'name' 		: 'Record Trap',
		'short' 	: 'trap',
		'color' 	: 'hsla(7, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(7, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(7, 15%, 40%, 0.5)',
		'text' 		: 'Hip-Hop, Trap.'
	},
	'gop' :	{
		'name' 		: 'Гоп FM',
		'short' 	: 'gop',
		'color' 	: 'hsla(192, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(192, 25%, 75%, 1)',
		'bcolor' 	: 'hsla(192, 25%, 40%, 0.5)',
		'text' 		: ''
	},
	'yo' :	{
		'name' 		: 'Black',
		'short' 	: 'yo',
		'color' 	: 'hsla(274, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(274, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(274, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'brks' :	{
		'name' 		: 'Record Breaks',
		'short' 	: 'brks',
		'color' 	: 'hsla(107, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(107, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(107, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'dub' :	{
		'name' 		: 'Record Dubstep',
		'short' 	: 'dub',
		'color' 	: 'hsla(60, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(60, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(60, 15%, 40%, 0.5)',
		'text' 		: 'Dubstep.'
	},
	'dc' :	{
		'name' 		: 'Record Dancecore',
		'short' 	: 'dc',
		'color' 	: 'hsla(18, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(18, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(18, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'teo' :	{
		'name' 		: 'Record Hardstyle',
		'short' 	: 'teo',
		'color' 	: 'hsla(60, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(60, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(60, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'pump' :	{
		'name' 		: 'Old School',
		'short' 	: 'pump',
		'color' 	: 'hsla(43, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(43, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(43, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'techno' :	{
		'name' 		: 'Record Techno',
		'short' 	: 'techno',
		'color' 	: 'hsla(175, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(175, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(175, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'mix' :	{
		'name' 		: 'Record Megamix',
		'short' 	: 'mix',
		'color' 	: 'hsla(343, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(343, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(343, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'fut' :	{
		'name' 		: 'Future House',
		'short' 	: 'fut',
		'color' 	: 'hsla(179, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(179, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(179, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'mini' :	{
		'name' 		: 'Minimal / Tech',
		'short' 	: 'mini',
		'color' 	: 'hsla(56, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(56, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(56, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'rave' :	{
		'name' 		: 'Rave FM',
		'short' 	: 'rave',
		'color' 	: 'hsla(255, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(255, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(255, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'goa' :	{
		'name' 		: 'GOA/PSY',
		'short' 	: 'goa',
		'color' 	: 'hsla(10, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(10, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(10, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'trop' :	{
		'name' 		: 'Tropical',
		'short' 	: 'trop',
		'color' 	: 'hsla(17, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(17, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(17, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'naft' :	{
		'name' 		: 'Нафталин FM',
		'short' 	: 'naft',
		'color' 	: 'hsla(113, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(113, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(113, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'gold' :	{
		'name' 		: 'Gold',
		'short' 	: 'gold',
		'color' 	: 'hsla(67, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(67, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(67, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'hbass' :	{
		'name' 		: 'Hard Bass',
		'short' 	: 'hbass',
		'color' 	: 'hsla(10, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(10, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(10, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'rmx' :	{
		'name' 		: 'Remix',
		'short' 	: 'rmx',
		'color' 	: 'hsla(200, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(200, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(200, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'fbass' :	{
		'name' 		: 'Future Bass',
		'short' 	: 'fbass',
		'color' 	: 'hsla(31, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(31, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(31, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'gast' :	{
		'name' 		: 'Гастарбайтер FM',
		'short' 	: 'gast',
		'color' 	: 'hsla(120, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(120, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(120, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'ansh' :	{
		'name' 		: 'Аншлаг FM',
		'short' 	: 'ansh',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'ibiza' :	{
		'name' 		: 'Innocence (Ibiza)',
		'short' 	: 'ibiza',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'mf' :	{
		'name' 		: 'Маятник Фуко',
		'short' 	: 'mf',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'symph' :	{
		'name' 		: 'Симфония FM',
		'short' 	: 'symph',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'mt' :	{
		'name' 		: 'Midtempo',
		'short' 	: 'mt',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'mmbt' :	{
		'name' 		: 'Moombahton',
		'short' 	: 'mmbt',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'jackin' :	{
		'name' 		: "Jackin'/Garage",
		'short' 	: 'jackin',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'progr' :	{
		'name' 		: 'Progressive',
		'short' 	: 'progr',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'synth' :	{
		'name' 		: 'Synthwave',
		'short' 	: 'synth',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'househits' :	{
		'name' 		: 'House Hits',
		'short' 	: 'househits',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'bighits' :	{
		'name' 		: 'Big Hits',
		'short' 	: 'bighits',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'dream' :	{
		'name' 		: 'Dream Dance',
		'short' 	: 'dream',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'darkside' :	{
		'name' 		: 'Darkside',
		'short' 	: 'darkside',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'uplift' :	{
		'name' 		: 'Uplifting',
		'short' 	: 'uplift',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'houseclss' :	{
		'name' 		: 'House Classics',
		'short' 	: 'houseclss',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'edmhits' :	{
		'name' 		: 'EDM Hits',
		'short' 	: 'edmhits',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'trancehouse' :	{
		'name' 		: 'Trancehouse',
		'short' 	: 'trancehouse',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'hypno' :	{
		'name' 		: 'Hypnotic',
		'short' 	: 'hypno',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'neurofunk' :	{
		'name' 		: 'Neurofunk',
		'short' 	: 'neurofunk',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'tecktonik' :	{
		'name' 		: 'Tecktonik',
		'short' 	: 'tecktonik',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	},
	'2step' :	{
		'name' 		: '2-step',
		'short' 	: '2step',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	}, 
	'trancehits' :	{
		'name' 		: 'Trance Hits',
		'short' 	: 'trancehits',
		'color' 	: 'hsla(245, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(245, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(245, 15%, 40%, 0.5)',
		'text' 		: ''
	}, 
	'jungle' :	{
		'name' 		: 'Jungle',
		'short' 	: 'jungle',
		'color' 	: 'hsla(15, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(15, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(15, 15%, 40%, 0.5)',
		'text' 		: ''
	}, 
	'liquidfunk' :	{
		'name' 		: 'Liquid Funk',
		'short' 	: 'liquidfunk',
		'color' 	: 'hsla(100, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(100, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(100, 15%, 40%, 0.5)',
		'text' 		: ''
	}, 
	'russiangold' :	{
		'name' 		: 'Russian Gold',
		'short' 	: 'russiangold',
		'color' 	: 'hsla(140, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(140, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(140, 15%, 40%, 0.5)',
		'text' 		: ''
	}, 
	'drumhits' :	{
		'name' 		: 'Drum\'n\'Bass Hits',
		'short' 	: 'drumhits',
		'color' 	: 'hsla(140, 42%, 23%, 1)',
		'fcolor' 	: 'hsla(140, 25%, 90%, 1)',
		'bcolor' 	: 'hsla(140, 15%, 40%, 0.5)',
		'text' 		: ''
	},

	"rap": {
		"name": "Rap",
		"short": "rap",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"rapclassics": {
		"name": "Rap Classics",
		"short": "rapclassics",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"cadillac": {
		"name": "Cadillac FM",
		"short": "cadillac",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
		"1970": {
		"name": "1970-е",
		"short": "1970",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"complextro": {
		"name": "Complextro",
		"short": "complextro",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"1980": {
		"name": "1980-е",
		"short": "1980",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"chillhouse": {
		"name": "Chill House",
		"short": "chillhouse",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"groovetribal": {
		"name": "Groove\/Tribal",
		"short": "groovetribal",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"eurodance": {
		"name": "Eurodance",
		"short": "eurodance",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"technopop": {
		"name": "Technopop",
		"short": "technopop",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"discofunk": {
		"name": "Disco\/Funk",
		"short": "discofunk",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	},
	"russianhits": {
		"name": "Russian Hits",
		"short": "russianhits",
		"color": "hsla(195, 5%, 23%, 1)",
		"fcolor": "hsla(195, 5%, 75%, 1)",
		"bcolor": "hsla(195, 5%, 50%, 0.5)",
		"text": ""
	}
};



var prefixes = Object.keys(stations);

for (var i = prefixes.length - 1; i >= 0; i--) {
	//stations.prefixes[i]] = new Object();

	stations[prefixes[i]]['hq'] = 'http://air.radiorecord.ru:805/'+prefixes[i]+'_320';
	stations[prefixes[i]]['lq'] = 'http://air.radiorecord.ru:805/'+prefixes[i]+'_64';
	stations[prefixes[i]]['link'] = 'http://www.radiorecord.ru/xml/'+prefixes[i]+'_online_v8.txt';

};
	stations.rr.hq = 'http://air.radiorecord.ru:805/rr_320';
	stations.rr.lq = 'http://air.radiorecord.ru:805/rr_64';

function toHHMMSS(sec) {
	var sec_num = parseInt(sec, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10 && hours > 0) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}


	var time    = minutes+':'+seconds;

	if (hours>0) {
		var time    = hours+":"+minutes+':'+seconds;
	};
	return time; 
}
