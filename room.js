
/* !outside the game */
var game;
var idleData;
var loadAnim;
/* Set game size */
function setGameSize() {
	let
  header = document.getElementById('header'),
  footer = document.getElementById('footer'),
  gameWrapper = document.getElementById('gameframe');
  let
  headerStyle = window.getComputedStyle(header),
  footerStyle = window.getComputedStyle(footer);
  let
  headerHeight = parseFloat( headerStyle.getPropertyValue('height') ),
  footerHeight = parseFloat( footerStyle.getPropertyValue('height') );
  let
	windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  gameHeight = windowHeight - headerHeight - footerHeight;
  // Set sizes
	if(gameWrapper) {
  	gameWrapper.style.marginTop = headerHeight + 'px';
  	gameWrapper.style.height = gameHeight + 'px';
  	gameWrapper.style.width = gameHeight + 'px';
		if(windowWidth < windowHeight) {
			gameWrapper.style.width = windowWidth + 'px';
			gameWrapper.style.height = windowWidth + 'px';
		}
	}
	if(game) {
  	game.style.height = gameHeight + 'px';
  	game.style.width = gameHeight + 'px';
		if(windowWidth < windowHeight) {
			game.style.width = windowWidth + 'px';
			game.style.height = windowWidth + 'px';
		}
	}
}
/*
var resizeFrame = function() {
		if (game == undefined) {
			let div = document.getElementById('gameframe');
			div.style.width = window.innerHeight + 'px';
			div.style.height = window.innerHeight + 'px';

			let dpi_w = parseInt(div.style.width) / div.width;
			let dpi_h = parseInt(div.style.height) / div.height;

			if (window.innerHeight <= window.innerWidth) {
				var height = window.innerHeight;
				var width = window.innerHeight;

			} else if (window.innerHeight > window.innerWidth) {
				var width = window.innerWidth;
				var height = window.innerWidth;
			}
			div.style.width = width + 'px';
			div.style.height = height + 'px';
		}
	}
*/
function generateRandomNumber(x, y) {
	return Math.random() * (y - x) + x;
};

window.onload = function() {
	/* If mobile, don't do nothin' */
	function isMobileDevice() {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	}
	if( isMobileDevice() ) {
		document.body.classList.add('mobile');
		return;
	}
	// window.addEventListener('resize', resizeApp);
	// resizeFrame();
	// resizeApp();
	setGameSize();
	window.addEventListener('resize', setGameSize);
	idleData = {
		wrapper: document.getElementById('gameframe'),
		animType: 'svg',
		name: 'idle',
		loop: true,
		prerender: true,
		autoplay: true,
		path: 'loadlogo.json',
	};

	loadAnim = bodymovin.loadAnimation(idleData);
	var movers = ["#rod1", "#rod2", "#rod3", "#ucones", "#dcones", "#trings"];
	$('#startbutton').click(function() {
		$('#smallhounds').css({
				'opacity': '1'
		});
		$('#colors').css({
				'opacity': '1'
		});
		clearInterval(floatInterval);
		movers.forEach(function(e) {
			newX = generateRandomNumber(-800, 800);
			newY = generateRandomNumber(-800, 800);
			$(e).css({
				'transition': 'all 0.5s',
				'transform': 'translate(' + newX + 'px,' + newY + 'px)',
				'opacity': '0'
			})
		});
		setTimeout(function() {
			movers.forEach(function(e) {
				$(e).css({
					'transform': 'translate(0px,0px)',
					'opacity': '1'
				})
			});
		}, 500)
		setTimeout(function() {
			if (game == undefined) {
				loadAnim.destroy();
				$('#gameframe').html('');
				game = new Phaser.Game(config);
			}
		}, 1500)

	});
	var floatInterval = setInterval(function() {
		movers.forEach(function(e) {
			newX = generateRandomNumber(-150, 150);
			newY = generateRandomNumber(-150, 150);
			$(e).css({
				'transform': 'translate(' + newX + 'px,' + newY + 'px)'
			})
		})

	}, 1200)

}
/*
var resizeApp = function() {
		let div = document.getElementById('gameframe');

				// Check if device DPI messes up the width-height-ratio
		if(document.getElementsByTagName('canvas')[0]){
			let canvas = document.getElementsByTagName('canvas')[0];
			let dpi_w = parseInt(div.style.width) / canvas.width;
			let dpi_h = parseInt(div.style.height) / canvas.height;
		} else {
			dpi_w=1;
			dpi_h=1;
		}


		if (window.innerHeight <= window.innerWidth) {
			var barHeight = window.innerHeight/20;
			height = window.innerHeight - (2*barHeight) * (dpi_w / dpi_h);
			width = window.innerHeight - (2*barHeight) * (dpi_w / dpi_h);
			spacer=0;
		} else if (window.innerHeight > window.innerWidth) {
			height = window.innerWidth * (dpi_w / dpi_h);
			width = window.innerWidth * (dpi_w / dpi_h);
			var barHeight = window.innerWidth/20;
			spacer = (window.innerHeight - ((barHeight*2)+height))/2;
		}

		div.style.width = width + 'px';
		div.style.height = height + 'px';

		// Scale canvas
		if(document.getElementsByTagName('canvas')[0]){
			let canvas = document.getElementsByTagName('canvas')[0];
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
			}
			$('#menubar').css({
				'height':barHeight + 'px',
				'width': width + 'px',
				'margin-top':spacer + 'px'
			});
			$('#footer').css({
				'height':barHeight + 'px',
				'width': width + 'px'
			});
			$('.barbutton').css({
				'height':barHeight + 'px',
			});
			$('#barlogo').css({
				'width': width*.25 + 'px'
			});
			$('#barhelp').css({
				'width': width*.09 + 'px',
				'left': (window.innerWidth-width)/2 + $('#barlogo').width()+'px'
			});
			$('#barkey').css({
				'width': width*.11 + 'px',
				'left': (window.innerWidth-width)/2 + $('#barlogo').width()+$('#barhelp').width()+'px'
			});

	}; */
	/* !inside the game */
var _anims;
var windowMask;
var floaters;
var floater1;
var floater2;
var floater3;
var floater4;
var floater5;
var floater6;
var floater7;
var floaterFrames;
var prevTone = 1;
var firstCard;
var secondCard;
var firstFlip;
var totalFlipped = 0;
var flipOrder;
var currentRoom = 1;
var currentPlant = 0;
var shooterTick = 0;
var dodgeCounter = 0;
var currentHoles = 0;
var keyGetTween;
var openExternalLink;
var nextSize = 1;
var cropGrid = {
	p1: {
		x: 756,
		y: 1011
	},
	p2: {
		x: 892,
		y: 947.4
	},
	p3: {
		x: 1028,
		y: 884
	},
	p4: {
		x: 756,
		y: 1247.4
	},
	p5: {
		x: 892,
		y: 1184
	},
	p6: {
		x: 1028,
		y: 1120.6
	},
	p7: {
		x: 756,
		y: 1484
	},
	p8: {
		x: 892,
		y: 1420.6
	},
	p9: {
		x: 1028,
		y: 1357
	},
};
var cropQuad = {
	topLeftX: cropGrid.p1.x,
	topLeftY: cropGrid.p1.y,
	topRightX: cropGrid.p2.x,
	topRightY: cropGrid.p2.y,
	bottomLeftX: cropGrid.p4.x,
	bottomLeftY: cropGrid.p4.y,
	bottomRightX: cropGrid.p5.x,
	bottomRightY: cropGrid.p5.y
};
var doorClicks = 0;
var collisionZone = {
	a: false,
	b: false,
	c: false,
	key: false
};
var keySpawned;
var keyGot = false;
var shipPos = 1;
var shipRespawning = false;
var startY = null;
var faces = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
var scene = {
	key: 'room',
	preload: preload,
	create: create,
	pack: {
		files: [{
			type: 'image',
			key: 'logo',
			url: 'assets/ui/logo2.png'
		}, {
			type: 'image',
			key: 'textboxbg',
			url: 'assets/chooser/chooser.png'
		}, {
			type: 'image',
			key: 'downprompt',
			url: 'assets/ui/downprompt.png'
		}, ]
	},
	update: update
};
var config = {
	type: Phaser.AUTO,
	parent: 'gameframe',
	width: 1600,
	height: 1600,
	backgroundColor: '#ffca4d',
	scene: [scene],
};
//var game = new Phaser.Game(config);

function preload() {
	resizeApp();
	$('#gameframe').css({
		"background": "#ffca4d"
	});
	var preLogo = this.add.image(800, 636, 'logo');
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;
	var progressBar = this.add.graphics();
	var progressBox = this.add.graphics();
	var percentText = this.make.text({
		x: width / 2,
		y: 836 ,
		text: '0%',
		style: {
			font: '72pt magistral',
			fill: '#ffffff'
		}
	});
	progressBox.fillStyle(0xffffff, 0);
	progressBox.fillRect(400, 930, 600, 1200);
	percentText.setOrigin(0.5, 0.5);
	var preTextBox = this.add.image(200, 1310, 'textboxbg').setOrigin(0);
	var preTextBoxText = this.add.text(240, 1340, ['Huh. I really want to go out today, but I seem','to have misplaced my key...','Where could it be?'], {
		fontFamily: 'fieldwork-hum',
		fontSize: 54,
		color: '#225a89'
	}).setOrigin(0);
	var predDownPrompt = this.add.image(1280, 2760, 'downprompt').setOrigin(0);
	this.load.on('progress', function(value) {
		progressBar.clear();
		progressBar.fillStyle(0x225a89, 2);
		progressBar.fillRect(300, 766, 1000 * value, 140);
		percentText.setText(parseInt(value * 100) + '% ');
		preTextBoxText.setText(['Huh. I really want to go out today, but I seem','to have misplaced my key...','Where could it be?']);
	});
	this.load.on('fileprogress', function(file) {
		//percentText.setText(file.key);
		//console.log(file.key+file.percentComplete);
	});
	this.load.on('complete', function() {
		preLogo.destroy();
		progressBar.destroy();
		progressBox.destroy();
		percentText.destroy();
		preTextBoxText.destroy();
		preTextBox.destroy();
	});
	// !load audio
	this.load.audio('wobblesound', 'assets/objects/lamp/audio/i.mp3');
	//universal
	this.load.audio('mugsound', 'assets/objects/mug/mug.mp3');
	//left room
	this.load.audio('scratch', 'assets/objects/rugbump/scratch.wav');
	this.load.audio('oww', 'assets/objects/rugbump/oww.wav');
	this.load.audio('sizeposter1', 'assets/objects/sizeposter/sizeposter1.wav');
	this.load.audio('sizeposter1', 'assets/objects/sizeposter/sizeposter1.wav');
	this.load.audio('sizeposter2', 'assets/objects/sizeposter/sizeposter2.wav');
	this.load.audio('sizeposter3', 'assets/objects/sizeposter/sizeposter3.wav');
	this.load.audio('sizeposter4', 'assets/objects/sizeposter/sizeposter4.wav');
	this.load.audio('sizeposter5', 'assets/objects/sizeposter/sizeposter5.wav');
	this.load.audio('sizeposter6', 'assets/objects/sizeposter/sizeposter6.wav');
	this.load.audio('sizeposter7', 'assets/objects/sizeposter/sizeposter7.wav');
	this.load.audio('sizeposter8', 'assets/objects/sizeposter/sizeposter8.wav');
	this.load.audio('sizeposter9', 'assets/objects/sizeposter/sizeposter9.wav');
	this.load.audio('sizeposter10', 'assets/objects/sizeposter/sizeposter10.wav');
	//middle room
	this.load.audio('sq', 'assets/objects/couch/sq.wav');
	this.load.audio('cardflipsound', 'assets/objects/card/cardflip.wav');
	this.load.audio('flipbacksound', 'assets/objects/card/flipback.wav');
	this.load.audio('cardwinsound', 'assets/objects/card/win.wav');
	this.load.audio('shootloop', 'assets/objects/shooter/shootloop.wav');
	this.load.audio('die', 'assets/objects/shooter/die.wav');
	//right room
	this.load.audio('chime1', 'assets/objects/books/audio/1.wav');
	this.load.audio('chime2', 'assets/objects/books/audio/2.wav');
	this.load.audio('chime3', 'assets/objects/books/audio/3.wav');
	this.load.audio('chime4', 'assets/objects/books/audio/4.wav');
	this.load.audio('chime5', 'assets/objects/books/audio/5.wav');
	this.load.audio('chime6', 'assets/objects/books/audio/6.wav');
	this.load.audio('chime7', 'assets/objects/books/audio/7.wav');
	this.load.audio('chime8', 'assets/objects/books/audio/8.wav');
	this.load.audio('chime0', 'assets/objects/books/audio/no.wav');
	// !load images
	// universal
	//this.load.image('room', 'assets/bg/room.png');
	//this.load.image('logo', 'assets/ui/logo2.png');
	this.load.image('left', 'assets/ui/left.png');
	this.load.image('right', 'assets/ui/right.png');
	this.load.image('windowmask', 'assets/objects/window/windowmask.png');
	// left room
	this.load.image('textboxbg', 'assets/chooser/chooser.png');
	this.load.image('wallposter', 'assets/objects/wallposter.png');
	this.load.image('rugbump', 'assets/objects/rugbump/rugbump.png');
	this.load.image('vase', 'assets/objects/vase.png');
	this.load.image('fronttable', 'assets/objects/fronttable.png');
	// middle room
	this.load.image('wideplant', 'assets/objects/wideplant.png');
	this.load.image('bgcouch', 'assets/objects/couch/sq/bgcouch.png');
	this.load.image('arm', 'assets/objects/couch/sq/arm.png');
	this.load.image('side', 'assets/objects/couch/sq/side.png');
	this.load.image('coftable', 'assets/objects/coftable.png');
	// right room
	this.load.image('clock', 'assets/objects/clock.png');
	this.load.image('tablelegs', 'assets/objects/table/legs.png');
	this.load.image('topleg', 'assets/objects/table/topleg.png');
	this.load.image('tabletop', 'assets/objects/table/top.png');
	// !load atlasses
	// universal
	this.load.atlas('windowatlas', 'assets/objects/window/window.png', 'assets/objects/window/window.json');
	// !left room
	this.load.atlas('sizeposteratlas', 'assets/objects/sizeposter/sizeposter.png', 'assets/objects/sizeposter/sizeposter.json');
	this.load.atlas('dooratlas', 'assets/objects/door/door.png', 'assets/objects/door/door.json');
	this.load.multiatlas('plantcycleatlas', 'assets/objects/plantcycle/plantcycle.json');
	this.load.atlas('mugatlas', 'assets/objects/mug/mug.png', 'assets/objects/mug/mug.json');
	// !middle room
	this.load.atlas('cardatlas', 'assets/objects/card/card.png', 'assets/objects/card/card.json');
	this.load.multiatlas('flyatlas', 'assets/objects/shooter/fly/fly.json');
	this.load.multiatlas('couchatlas', 'assets/objects/couch/couch.json');
	this.load.atlas('bookstackatlas', 'assets/objects/bookstack/bookstack.png', 'assets/objects/bookstack/bookstack.json');
	this.load.atlas('sqatlas', 'assets/objects/couch/sq/sq.png', 'assets/objects/couch/sq/sq.json');
	this.load.atlas('obstacleatlas', 'assets/objects/shooter/obstacle/obstacle.png', 'assets/objects/shooter/obstacle/obstacle.json');
	this.load.atlas('shooteratlas', 'assets/objects/shooter/p1.png', 'assets/objects/shooter/p1.json');
	this.load.atlas('shooterrespawn', 'assets/objects/shooter/respawn.png', 'assets/objects/shooter/respawn.json');
	// !right room
	this.load.multiatlas('lampatlas', 'assets/objects/lamp/lamp.json');
	this.load.atlas('bookatlas', 'assets/objects/books/books.png', 'assets/objects/books/books.json');
	this.load.multiatlas('holesatlas', 'assets/objects/holes/holes.json');

}

function create() {
	window.addEventListener('resize', resizeApp);
	// !create frames
	// !left room
	var sizePosterPolygon = new Phaser.Geom.Polygon([273, 472, 0, 600, 0, 126, 273, 0]);
	var doorKnobPolygon = new Phaser.Geom.Polygon([255, 429, 327, 395, 330, 518, 254, 560]);
	var frontPlantPolygon = new Phaser.Geom.Polygon([222, 74, 292, 68, 331, 292, 274, 443, 194, 469, 128, 441, 70, 271]);
	var sizePosterFrames = this.anims.generateFrameNames('sizeposteratlas', {
		prefix: 'sizeposter',
		start: 0,
		end: 3
	});
	var doorOpenFrames = this.anims.generateFrameNames('dooratlas', {
		start: 0,
		end: 2
	});
	var doorCloseFrames = this.anims.generateFrameNames('dooratlas', {
		start: 2,
		end: 4
	});
	var plantCycle1Frames = this.anims.generateFrameNames('plantcycleatlas', {
		prefix: 'plantcycle',
		start: 0,
		end: 30,
	});
	var plantCycle2Frames = this.anims.generateFrameNames('plantcycleatlas', {
		prefix: 'plantcycle',
		start: 30,
		end: 60,
	});
	var plantCycle3Frames = this.anims.generateFrameNames('plantcycleatlas', {
		prefix: 'plantcycle',
		start: 60,
		end: 89,
	});
	var plantCycle4Frames = this.anims.generateFrameNames('plantcycleatlas', {
		prefix: 'plantcycle',
		start: 90,
		end: 119,
	});
	var plantCycleArray = [0, plantCycle1Frames, plantCycle2Frames, plantCycle3Frames, plantCycle4Frames];
	var pageFrames = this.anims.generateFrameNames('pages', {
		prefix: 'page',
		start: 0,
		end: 4
	});
	// !middle room
	var csFrames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'cs',
		start: 0,
		end: 1,
		zeropad: 2
	});
	var flyFrames = this.anims.generateFrameNames('flyatlas', {
		start: 0,
		end: 118,
	});
	var p1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 0,
		end: 4,
		zeroPad: 2
	});
	var d1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 0,
		end: 2,
		zeroPad: 2
	});
	var d2Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 2,
		end: 4,
		zeroPad: 2
	});
	var u1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 4,
		end: 6,
		zeroPad: 2
	});
	var u2Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 6,
		end: 8,
		zeroPad: 2
	});
	var obstacleFrames = this.anims.generateFrameNames('obstacleatlas', {
		start: 0,
		end: 12,
	});
	var obstacle0Frames = this.anims.generateFrameNames('obstacleatlas', {
		start: 0,
		end: 12,
	});
	var obstacleAframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 1,
		end: 2,
	});
	var obstacleBframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 3,
		end: 4,
	});
	var obstacleCframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 5,
		end: 6,
	});
	var obstacleDframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 7,
		end: 8,
	});
	var obstacleEframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 9,
		end: 10,
	});
	var obstacleFframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 11,
		end: 12,
	});
	var keyGetframes = this.anims.generateFrameNames('obstacleatlas', {
		prefix: 'key',
		start: 1,
		end: 1
	});
	var respawnFrames = this.anims.generateFrameNames('shooterrespawn', {
		prefix: 'rsp',
		start: 0,
		end: 29
	});
	var crash1frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'a',
		start: 0,
		end: 1
	});
	var crash2frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'b',
		start: 0,
		end: 1
	});
	var crash3frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'c',
		start: 0,
		end: 1
	});
	var csPolygon = new Phaser.Geom.Polygon([3, 375, 53, 351, 28, 397, 35.78947448730469, 31, 28, 2, 53, 23, 35.78947448730469, 31, 3, 47, 28, 2, 36, 359, 20, 366, 19.157894134521484, 39.210540771484375, 35.78947448730469, 31, 36, 359, 3, 375, 20, 366]);
	var sqPolygon = new Phaser.Geom.Polygon([242, 1, 448, 98, 207, 211, 3, 114]);

	var couchFrames = this.anims.generateFrameNames('couchatlas', {
		prefix: 'couch',
		start: 0,
		end: 119,
		zeroPad: 3
	});
	var flipStartFrames = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flipstart',
		start: 0,
		end: 15,
		zeroPad: 2
	});
	var flipBackFrames = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flipback',
		start: 0,
		end: 60,
		zeroPad: 2
	});
	var flip1 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip1_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var flip2 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip2_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var flip3 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip3_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var flip4 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip4_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var flip5 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip5_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var flip6 = this.anims.generateFrameNames('cardatlas', {
		prefix: 'flip6_',
		start: 0,
		end: 43,
		zeroPad: 2
	});
	var bookCircFrames = this.anims.generateFrameNames('bookstackatlas', {
		prefix: 'bookstack',
		start: 0,
		end: 47,
		zeroPad: 2
	});
	var bookStackPoly = new Phaser.Geom.Polygon([279, 248, 193, 287, 88, 240, 72, 200, 90, 113, 175, 71, 278, 122]);
	var cardPolygon = new Phaser.Geom.Polygon([46, 95, 120, 130, 73, 150, 1, 117]);
	var flipArray = [0, flip1, flip2, flip3, flip4, flip5, flip6];
	// !right room
	var lampFrames = this.anims.generateFrameNames('lampatlas', {
		prefix: 'lamp',
		start: 0,
		end: 59,
		zeroPad: 2
	});
	var lampPolygon = new Phaser.Geom.Polygon([136, 252, 98, 210, 138, 38, 218, 0, 300, 38, 340, 212, 300, 254, 286, 414, 218, 440, 158, 414, 136, 252]);
	var holesPolygon = new Phaser.Geom.Polygon([814, 174, 812, 112, 845, 72, 875, 80, 877, 143, 1210, 78, 1210, 16, 1231, 3, 1272, 40, 1273, 108, 1210, 78, 877, 143, 814, 174]);
	var holes1Frames = this.anims.generateFrameNames('holesatlas', {
		prefix: 'holes1_',
		start: 0,
		end: 64,
		zeroPad: 2
	});
	var holes2Frames = this.anims.generateFrameNames('holesatlas', {
		prefix: 'holes2_',
		start: 0,
		end: 65,
		zeroPad: 2
	});
	var holes3Frames = this.anims.generateFrameNames('holesatlas', {
		prefix: 'holes3_',
		start: 0,
		end: 61,
		zeroPad: 2
	});
	// !create sprites
	// !universal
	var bgPolygon = new Phaser.Geom.Polygon([
	0, 2125, 1074, 1620, 1074, 0, 1074, 1620, 1600, 1866, 2706, 1355, 2706, 0, 2706, 1355, 3200, 1585, 4364, 1042, 4364, 0, 4364, 1042, 4800, 1245]);
	var frontRugPolygon = new Phaser.Geom.Polygon([
	120, 2106, 1012, 1689, 1480, 1906, 588, 2324,

	]);
	var frontRugBumpPolygon = new Phaser.Geom.Polygon([
	120 + 75, 2106, 1012, 1689 + 50, 1480 - 75, 1906, 588, 2324 - 50, ]);

	var graphics = this.add.graphics({
		x: 0,
		y: 0
	});
	graphics.lineStyle(2, 0xffffff);
	graphics.beginPath();
	graphics.moveTo(bgPolygon.points[0].x, bgPolygon.points[0].y);

	for (var i = 1; i < bgPolygon.points.length; i++) {
		graphics.lineTo(bgPolygon.points[i].x, bgPolygon.points[i].y);
	}
	//graphics.closePath();
	graphics.strokePath();

	var graphicsL = this.add.graphics({
		x: 0,
		y: 0
	});
	var graphicsM = this.add.graphics({
		x: 1796,
		y: -28
	});
	var graphicsR = this.add.graphics({
		x: 3264,
		y: -577
	});
	var graphicsDB = this.add.graphics({
		x: 1200,
		y: 900
	});
	var makeRug = function(x, y) {
			x.lineStyle(2, 0xffffff);
			x.fillStyle(y, 2);
			x.beginPath();
			x.moveTo(frontRugPolygon.points[0].x, frontRugPolygon.points[0].y);

			for (var i = 1; i < frontRugPolygon.points.length; i++) {
				x.lineTo(frontRugPolygon.points[i].x, frontRugPolygon.points[i].y);
			}
			x.closePath();
			x.fillPath();
			x.strokePath();
		}
	var makeBug = function(x, y, z) {
			x.lineStyle(2, 0xffffff);
			x.fillStyle(y, 2);
			x.beginPath();
			x.moveTo(z.points[0].x, z.points[0].y);

			for (var i = 1; i < z.points.length; i++) {
				x.lineTo(z.points[i].x, z.points[i].y);
			}

			x.closePath();
			x.fillPath();
			x.strokePath();
		};
	makeRug(graphicsL, '0x225a89');
	makeRug(graphicsM, '0x94da90');
	makeRug(graphicsR, '0x94da90');
	//var logo = this.add.sprite(860, -130, 'logo').setOrigin(0);

	windowMask = this.add.sprite(1259, 95, 'windowmask').setOrigin(0);
	windowMask.add = false;
	var leftWindow = this.add.sprite(1210, 792, 'windowatlas', 'leftwindow').setOrigin(0);
	var widedow = this.add.sprite(1666, 596, 'windowatlas', 'widedow').setOrigin(0);
	var rightWindow = this.add.sprite(3582, 40, 'windowatlas', 'rightwindow').setOrigin(0);
	floaterFrames = ['brod', 'wrod', 'bsphere', 'wsphere'];
	floater1 = this.add.sprite(880, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater1.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater2 = this.add.sprite(930, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater2.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater3 = this.add.sprite(800, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater3.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater4 = this.add.sprite(900, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater4.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater5 = this.add.sprite(950, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater5.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater6 = this.add.sprite(920, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater6.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floater7 = this.add.sprite(860, (Math.floor(Math.random() * 956) + 1100), 'windowatlas', floaterFrames[Math.floor(Math.random() * 4)]);
	floater7.mask = new Phaser.Display.Masks.BitmapMask(this, windowMask);
	floaters = [floater1, floater2, floater3, floater4, floater5, floater6, floater7];
	var fadeLogo = this.add.sprite(2400, -504, 'logo').setInteractive();
	var cameraFocus = this.add.sprite(2400, -340).setInteractive();
	var textBox = this.add.sprite(200, -396, 'textboxbg').setOrigin(0).setInteractive();
	textBox.ready = false;
	textBox.pos = 1;
	var textBoxText = this.add.text(240, -366, ['Huh. I really want to go out today, but I seem','to have misplaced my key...','Where could it be?'], {
		fontFamily: 'fieldwork-hum',
		fontSize: 54,
		color: '#225a89'
	}).setOrigin(0);
	var downPrompt = this.add.sprite(1280, -186, 'downprompt').setOrigin(0);
	downPrompt.alpha = 1;
	var leftButton = this.add.sprite(20, 764, 'left').setOrigin(0).setInteractive();
	var rightButton = this.add.sprite(1508, 764, 'right').setOrigin(0).setInteractive();
	// !left room
	var sizePoster = this.add.sprite(756, 884, 'sizeposteratlas', 'sizeposter0').setOrigin(0).setInteractive(sizePosterPolygon, Phaser.Geom.Polygon.Contains);
	var mesh = this.make.mesh({
		key: 'phaser2',
		x: 0,
		y: 0,
		vertices: [
		cropQuad.topLeftX, cropQuad.topLeftY, cropQuad.bottomLeftX, cropQuad.bottomLeftY, cropQuad.bottomRightX, cropQuad.bottomRightY,

		cropQuad.topLeftX, cropQuad.topLeftY, cropQuad.bottomRightX, cropQuad.bottomRightY, cropQuad.topRightX, cropQuad.topRightY],
		uv: [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
		add: false
	});
	sizePoster.mask = new Phaser.Display.Masks.GeometryMask(this, mesh);
	var rugContain = this.add.sprite(0, 0).setOrigin(0).setInteractive(frontRugBumpPolygon, Phaser.Geom.Polygon.Contains);
	rugContain.isUp = false;
	var vase = this.add.sprite(898, 1440, 'vase').setOrigin(0).setInteractive();
	var wallPoster = this.add.sprite(116, 1286, 'wallposter').setOrigin(0);
	var rugBump = this.add.sprite(120, 1688, 'rugbump').setOrigin(0.5, 1).setAlpha(1).setScale(1, 0);
	var frontTable = this.add.sprite(306, 2158, 'fronttable').setOrigin(0).setInteractive(doorKnobPolygon, Phaser.Geom.Polygon.Contains);
	var door = this.add.sprite(328, 986, 'dooratlas', '0').setOrigin(0).setInteractive(doorKnobPolygon, Phaser.Geom.Polygon.Contains);
	var doorQuips = [
		['I think I left my key', 'in deep space.'],
		['I said, I think I left my key', 'in deep space.'],
		['The door is locked.', 'Find the key.'],
		['How did I lock', 'myself inside?']
	];
	var helps = {
		l: [
			['I\'m really not sure how I got locked inside! : - /', 'How embarassing. I haven\'t swept under the','rug in a while... I don\'t leave my home','often because I really love it.'],
		],
		m: [
			['Things are always falling into my couch. I try', 'to play memory games to keep my mind sharp.', 'Try holding your mouse down on the arrows,', 'I think I left something in there : - )'],
		],
		r: [
			['I love to read and I love to sing : - ) Have you', 'ever had a song stuck in your head, but you\'ve','forgotten how it goes? If you can help','me remember, I\'ll give you a reward...'],
		],
	};
	var mugSound = this.sound.add('mugsound');
	mugSound.volume = 0.25;
	var mug1 = this.add.sprite(1232, 2300, 'mugatlas', 'mug1').setOrigin(0).setInteractive();
	mug1.pos = 1;
	frontPlant = this.add.sprite(0, 2040, 'plantcycleatlas', 'plantcycle0').setOrigin(0).setInteractive(frontPlantPolygon, Phaser.Geom.Polygon.Contains);
	// !middle room
	card1a = this.add.sprite(2250, 1868, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1);
	card1b = this.add.sprite(2320, 1832, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1);
	card1c = this.add.sprite(2392, 1796, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1);
	card1d = this.add.sprite(2464, 1760, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1);
	card2a = this.add.sprite(2340, 1910, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2);
	card2b = this.add.sprite(2412, 1874, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2);
	card2c = this.add.sprite(2484, 1838, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2);
	card2d = this.add.sprite(2556, 1802, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2);
	card3a = this.add.sprite(2432, 1952, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3);
	card3b = this.add.sprite(2504, 1916, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3);
	card3c = this.add.sprite(2576, 1880, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3);
	card3d = this.add.sprite(2648, 1844, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3);
	//shooter
	var CSTopPoly = new Phaser.Geom.Polygon([106, 46, 109, 90, 0, 141, 0, 96, 55, 2]);
	var CSMidPoly = new Phaser.Geom.Polygon([109, 203, 0, 254, 1, 140, 108, 89]);
	var CSBotPoly = new Phaser.Geom.Polygon([1, 298, 0, 255, 107, 204, 107, 249, 54, 344]);
	var controlStrip = this.add.sprite(2530, 700, 'shooteratlas', 'cs00').setOrigin(0).setInteractive();
	var controlStripTop = this.add.sprite(2530, 700).setOrigin(0).setInteractive(CSTopPoly, Phaser.Geom.Polygon.Contains);
	var controlStripMid = this.add.sprite(2530, 700).setOrigin(0).setInteractive(CSMidPoly, Phaser.Geom.Polygon.Contains);
	var controlStripBot = this.add.sprite(2530, 700).setOrigin(0).setInteractive(CSBotPoly, Phaser.Geom.Polygon.Contains);
	controlStripTop.name = "controlstriptop";
	controlStripMid.name = "controlstripmid";
	controlStripBot.name = "controlstripbot";
	var shooterBg = this.add.sprite(2776, 646, 'flyatlas', '0').setOrigin(0);
	var pane1 = this.add.sprite(2776, 646, 'obstacleatlas', '0').setOrigin(0);
	var pane2 = this.add.sprite(2912, 710, 'obstacleatlas', '0').setOrigin(0);
	var pane3 = this.add.sprite(3050, 774, 'obstacleatlas', Math.floor(Math.random() * 12) + 1).setOrigin(0);
	var p1 = this.add.sprite(2776, 646, 'shooteratlas', '02').setOrigin(0);
	var widePlant = this.add.sprite(2732, 1510, 'wideplant').setOrigin(0.5, 1);
	var bgCouch = this.add.sprite(1668, 1242, 'bgcouch').setOrigin(0);
	var couch = this.add.sprite(1726, 1392, 'couchatlas', 'couch000').setOrigin(0);
	var sq3 = this.add.sprite(2162.5, 1325, 'sqatlas', 'w').setOrigin(0).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var sq2 = this.add.sprite(1920, 1437, 'sqatlas', 'w').setOrigin(0).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var sq1 = this.add.sprite(1678, 1550, 'sqatlas', 'w').setOrigin(0).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var arm = this.add.sprite(2608, 1342, 'arm').setOrigin(0);
	var side = this.add.sprite(1667, 1611, 'side').setOrigin(0);
	var coftable = this.add.sprite(2080, 1558, 'coftable').setOrigin(0);
	var mug2 = this.add.sprite(2556, 1594, 'mugatlas', 'mug3').setOrigin(0).setInteractive();
	mug2.pos = 3;
	var bookStack = this.add.sprite(2630, 1550, 'bookstackatlas', 'bookstack00').setOrigin(0).setInteractive(bookStackPoly, Phaser.Geom.Polygon.Contains);
	var mug3 = this.add.sprite(2922, 1652, 'mugatlas', 'mug7').setOrigin(0).setInteractive();
	mug3.pos = 7;
	// !right room
	// create books
	spines = {
		"book1": [{
			"shape": [44, 86, 44, 328, 6, 308, 4, 66]
		}],
		"book2": [{
			"shape": [44, 100, 44, 288, 4, 270, 4, 80]
		}],
		"book3": [{
			"shape": [2, 292, 2, 72, 44, 90, 46, 310]
		}],
		"book4": [{
			"shape": [44, 84, 44, 328, 2, 306, 2, 64]
		}],
		"book5": [{
			"shape": [44, 86, 44, 326, 6, 308, 4, 64]
		}],
		"book6": [{
			"shape": [6, 270, 6, 82, 44, 100, 44, 290]
		}],
		"book7": [{
			"shape": [44, 90, 44, 314, 4, 296, 4, 70]
		}],
		"book8": [{
			"shape": [44, 86, 42, 326, 2, 308, 2, 66]
		}],
		"book9": [{
			"shape": [42, 100, 44, 288, 4, 272, 2, 84]
		}],
		"book10": [{
			"shape": [32, 86, 32, 344, 2, 334, 2, 72]
		}],
		"book11": [{
			"shape": [44, 84, 44, 312, 2, 294, 2, 66]
		}]
	};
	book1polygon = new Phaser.Geom.Polygon(spines.book1[0].shape);
	book2polygon = new Phaser.Geom.Polygon(spines.book2[0].shape);
	book3polygon = new Phaser.Geom.Polygon(spines.book3[0].shape);
	book4polygon = new Phaser.Geom.Polygon(spines.book4[0].shape);
	book5polygon = new Phaser.Geom.Polygon(spines.book5[0].shape);
	book6polygon = new Phaser.Geom.Polygon(spines.book6[0].shape);
	book7polygon = new Phaser.Geom.Polygon(spines.book7[0].shape);
	book8polygon = new Phaser.Geom.Polygon(spines.book8[0].shape);
	book9polygon = new Phaser.Geom.Polygon(spines.book9[0].shape);
	book10polygon = new Phaser.Geom.Polygon(spines.book10[0].shape);
	book11polygon = new Phaser.Geom.Polygon(spines.book11[0].shape);
	var clock = this.add.sprite(1628 * 2, 154 * 2, 'clock').setOrigin(0);
	bottomShelf = this.add.sprite(4164, 664, 'bookatlas', 'shelf').setOrigin(0);
	book5 = this.add.sprite(4246, 434, 'bookatlas', 'book5').setOrigin(0).setInteractive(book5polygon, Phaser.Geom.Polygon.Contains);
	book6 = this.add.sprite(4274, 500, 'bookatlas', 'book6').setOrigin(0).setInteractive(book6polygon, Phaser.Geom.Polygon.Contains);
	book7 = this.add.sprite(4338, 502, 'bookatlas', 'book7').setOrigin(0).setInteractive(book7polygon, Phaser.Geom.Polygon.Contains);
	book8 = this.add.sprite(4406, 520, 'bookatlas', 'book8').setOrigin(0).setInteractive(book8polygon, Phaser.Geom.Polygon.Contains);
	book9 = this.add.sprite(4436, 590, 'bookatlas', 'book9').setOrigin(0).setInteractive(book9polygon, Phaser.Geom.Polygon.Contains);
	book10 = this.add.sprite(4508, 546, 'bookatlas', 'book10').setOrigin(0).setInteractive(book10polygon, Phaser.Geom.Polygon.Contains);
	book11 = this.add.sprite(4564, 600, 'bookatlas', 'book11').setOrigin(0).setInteractive();
	topShelf = this.add.sprite(4164, 324, 'bookatlas', 'shelf').setOrigin(0);
	book1 = this.add.sprite(4263, 106, 'bookatlas', 'book1').setOrigin(0).setInteractive(book1polygon, Phaser.Geom.Polygon.Contains);
	book2 = this.add.sprite(4296, 172, 'bookatlas', 'book2').setOrigin(0).setInteractive(book2polygon, Phaser.Geom.Polygon.Contains);
	book3 = this.add.sprite(4360, 172, 'bookatlas', 'book3').setOrigin(0).setInteractive(book3polygon, Phaser.Geom.Polygon.Contains);
	book4 = this.add.sprite(4420, 180, 'bookatlas', 'book4').setOrigin(0).setInteractive();
	shelfPlant = this.add.sprite(4420, 64, 'plantcycleatlas', 'plantcycle0').setOrigin(0).setInteractive();
	var tableLegs = this.add.sprite(3274, 1312, 'tablelegs').setOrigin(0);
	var mouseHoles = this.add.sprite(3250, 1006, 'holesatlas', 'holes1_00').setOrigin(0).setInteractive(holesPolygon, Phaser.Geom.Polygon.Contains);
	var topLeg = this.add.sprite(3720, 1334, 'topleg').setOrigin(0);
	var tableTop = this.add.sprite(3252, 1074, 'tabletop').setOrigin(0);
	var lamp = this.add.sprite(3200, 770, 'lampatlas', 'lamp00').setOrigin(0).setInteractive(lampPolygon, Phaser.Geom.Polygon.Contains);
	var mug4 = this.add.sprite(3670, 1156, 'mugatlas', 'mug6').setOrigin(0).setInteractive();
	mug4.pos = 6;
	// !create sounds
	var wobbleSound = this.sound.add('wobblesound');
	// left room
	var sizePosterSound1 = this.sound.add('sizeposter1');
	var sizePosterSound2 = this.sound.add('sizeposter2');
	var sizePosterSound3 = this.sound.add('sizeposter3');
	var sizePosterSound4 = this.sound.add('sizeposter4');
	var sizePosterSound5 = this.sound.add('sizeposter5');
	var sizePosterSound6 = this.sound.add('sizeposter6');
	var sizePosterSound7 = this.sound.add('sizeposter7');
	var sizePosterSound8 = this.sound.add('sizeposter8');
	var sizePosterSound9 = this.sound.add('sizeposter9');
	var sizePosterSound10 = this.sound.add('sizeposter10');
	var scratchSound = this.sound.add('scratch');
	var owwSound = this.sound.add('oww');
	// middle room
	var shootSong = this.sound.add('shootloop');
	shootSong.loop = true;
	var dieSound = this.sound.add('die');
	var sqSound = this.sound.add('sq');
	// right room
	var chime1 = this.sound.add('chime1');
	var chime2 = this.sound.add('chime2');
	var chime3 = this.sound.add('chime3');
	var chime4 = this.sound.add('chime4');
	var chime5 = this.sound.add('chime5');
	var chime6 = this.sound.add('chime6');
	var chime7 = this.sound.add('chime7');
	var chime8 = this.sound.add('chime8');
	var chime0 = this.sound.add('chime0');
	var chimes = [chime1, chime2, chime3, chime4, chime5, chime6, chime7, chime8, chime0];
	// !create animations
	// !universal
	var timedEvent = this.time.addEvent({
		delay: 40,
		callback: makeFloat,
		callbackScope: this,
		loop: true
	});
	var textBoxTweenUp = this.tweens.add({
		targets: [textBox, textBoxText, downPrompt],
		x: '+=0',
		y: '-=1360',
		duration: 750,
		repeat: 0,
		paused: true,
		onComplete: function() {
			textBoxTweenUp.pause();
			textBox.up = true;
			downPrompt.alpha = 1;
		}
	});
	var textBoxTweenDownPrep = this.tweens.add({
		targets: [textBox, textBoxText, downPrompt],
		x: '+=0',
		y: '-=100',
		duration: 150,
		repeat: 0,
		paused: true,
		onStart: function() {
			downPrompt.alpha = 0;
		},
		onComplete: function() {
			textBoxTweenDownPrep.pause();
			textBoxTweenDown.resume();
		}
	});
	var textBoxTweenDown = this.tweens.add({
		targets: [textBox, textBoxText, downPrompt],
		x: '+=0',
		y: '+=1460',
		duration: 600,
		repeat: 0,
		paused: true,
		onComplete: function() {
			textBoxTweenDown.pause();
			textBox.up = false;
		}
	});
	var downPromptAnim = this.tweens.add({
		targets: [downPrompt],
		y: '+=15',
		duration: 500,
		repeat: -1,
		paused: true,
		ease: 'Stepped',
		easeParams: [3],
	})
	// !left room
	var sizePosterAnim = this.anims.create({
		key: 'sizeposter',
		frames: sizePosterFrames,
		frameRate: 5,
		repeat: -1
	});
	var doVerts = function() {
			var verts = mesh.vertices;
			verts[0] = cropQuad.topLeftX;
			verts[1] = cropQuad.topLeftY;
			verts[6] = cropQuad.topLeftX;
			verts[7] = cropQuad.topLeftY;
			verts[10] = cropQuad.topRightX;
			verts[11] = cropQuad.topRightY;
			verts[2] = cropQuad.bottomLeftX;
			verts[3] = cropQuad.bottomLeftY;
			verts[4] = cropQuad.bottomRightX;
			verts[5] = cropQuad.bottomRightY;
			verts[8] = cropQuad.bottomRightX;
			verts[9] = cropQuad.bottomRightY;
		};
	var sizePosterSize1 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p5.x,
		topLeftY: cropGrid.p5.y,
		topRightX: cropGrid.p6.x,
		topRightY: cropGrid.p6.y,
		bottomLeftX: cropGrid.p8.x,
		bottomLeftY: cropGrid.p8.y,
		bottomRightX: cropGrid.p9.x,
		bottomRightY: cropGrid.p9.y,
		onStart: function() {
			sizePosterSound1.play();
		},
		onComplete: function() {
			sizePosterSize1.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize2 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		bottomLeftX: cropGrid.p2.x,
		bottomLeftY: cropGrid.p2.y,
		bottomRightX: cropGrid.p3.x,
		bottomRightY: cropGrid.p3.y,
		onStart: function() {
			sizePosterSound2.play();
		},
		onComplete: function() {
			sizePosterSize2.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize3 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topRightX: cropGrid.p4.x,
		topRightY: cropGrid.p4.y,
		bottomLeftX: cropGrid.p8.x,
		bottomLeftY: cropGrid.p8.y,
		bottomRightX: cropGrid.p7.x,
		bottomRightY: cropGrid.p7.y,
		onStart: function() {
			sizePosterSound3.play();
		},
		onComplete: function() {
			sizePosterSize3.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize4 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p6.x,
		topLeftY: cropGrid.p6.y,
		bottomLeftX: cropGrid.p9.x,
		bottomLeftY: cropGrid.p9.y,
		onStart: function() {
			sizePosterSound4.play();
		},
		onComplete: function() {
			sizePosterSize4.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize5 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p2.x,
		topLeftY: cropGrid.p2.y,
		topRightX: cropGrid.p8.x,
		topRightY: cropGrid.p8.y,
		bottomLeftX: cropGrid.p3.x,
		bottomLeftY: cropGrid.p3.y,
		bottomRightX: cropGrid.p9.x,
		bottomRightY: cropGrid.p9.y,
		onStart: function() {
			sizePosterSound5.play();
		},
		onComplete: function() {
			sizePosterSize5.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize6 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p4.x,
		topLeftY: cropGrid.p4.y,
		topRightX: cropGrid.p6.x,
		topRightY: cropGrid.p6.y,
		bottomLeftX: cropGrid.p1.x,
		bottomLeftY: cropGrid.p1.y,
		bottomRightX: cropGrid.p3.x,
		bottomRightY: cropGrid.p3.y,
		onStart: function() {
			sizePosterSound6.play();
		},
		onComplete: function() {
			sizePosterSize6.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize7 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p8.x,
		topLeftY: cropGrid.p8.y,
		topRightX: cropGrid.p2.x,
		topRightY: cropGrid.p2.y,
		bottomLeftX: cropGrid.p7.x,
		bottomLeftY: cropGrid.p7.y,
		bottomRightX: cropGrid.p1.x,
		bottomRightY: cropGrid.p1.y,
		onStart: function() {
			sizePosterSound7.play();
		},
		onComplete: function() {
			sizePosterSize7.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize8 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p9.x,
		topLeftY: cropGrid.p9.y,
		topRightX: cropGrid.p3.x,
		topRightY: cropGrid.p3.y,
		bottomLeftX: cropGrid.p7.x,
		bottomLeftY: cropGrid.p7.y,
		bottomRightX: cropGrid.p1.x,
		bottomRightY: cropGrid.p1.y,
		onStart: function() {
			sizePosterSound8.play();
		},
		onComplete: function() {
			sizePosterSize8.pause();
			if (sizePoster.anims.currentAnim === null) {
				sizePoster.anims.play('sizeposter');
			} else {
				sizePoster.anims.resume();
			}
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize9a = this.tweens.add({
		targets: cropQuad,
		duration: 1,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p1.x,
		topLeftY: cropGrid.p1.y,
		topRightX: cropGrid.p3.x,
		topRightY: cropGrid.p3.y,
		bottomLeftX: cropGrid.p7.x,
		bottomLeftY: cropGrid.p7.y,
		bottomRightX: cropGrid.p9.x,
		bottomRightY: cropGrid.p9.y,
		onStart: function() {
			sizePosterSound9.play();
		},
		onComplete: function() {
			sizePosterSize9a.pause();
			sizePosterSize9.resume();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizePosterSize9 = this.tweens.add({
		targets: cropQuad,
		duration: 500,
		repeat: 0,
		paused: true,
		ease: 'easeOut',
		topLeftX: cropGrid.p1.x,
		topLeftY: cropGrid.p1.y,
		topRightX: cropGrid.p2.x,
		topRightY: cropGrid.p2.y,
		bottomLeftX: cropGrid.p4.x,
		bottomLeftY: cropGrid.p4.y,
		bottomRightX: cropGrid.p5.x,
		bottomRightY: cropGrid.p5.y,
		onComplete: function() {
			sizePosterSize9.pause();
			sizePoster.anims.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
	var sizeTweens = [null, sizePosterSize1, sizePosterSize2, sizePosterSize3, sizePosterSize4, sizePosterSize5, sizePosterSize6, sizePosterSize7, sizePosterSize8, sizePosterSize9a];
	var doorOpen = this.anims.create({
		key: 'dooropen',
		frames: doorOpenFrames,
		frameRate: 15
	});
	var doorClose = this.anims.create({
		key: 'doorclose',
		frames: doorCloseFrames,
		frameRate: 15
	});
	for (i = 1; i < 7; i++) {
		this.anims.create({
			key: 'plantcycle' + i,
			frames: plantCycleArray[i],
			frameRate: 30
		});
	}
	var rugBumpUpTween = this.tweens.add({
		targets: [rugBump],
		height: 1,
		scaleY: 1,
		duration: 500,
		repeat: -1,
		paused: true,
		onRepeat: function() {
			rugBumpUpTween.pause();
			rugContain.isUp = true;
		}
	});
	var rugBumpDownTween = this.tweens.add({
		targets: [rugBump],
		height: 0,
		scaleY: 0,
		duration: 250,
		repeat: -1,
		paused: true,
		onRepeat: function() {
			rugBumpDownTween.pause();
			rugContain.isUp = false;
		}
	});
	var rugBumpJitterTween = this.tweens.add({
		targets: [rugBump],
		scaleX: 1.125,
		duration: 100,
		repeat: -1,
		paused: true,
		onRepeat: function() {
			rugBumpJitterTween.pause();
			scratchSound.play();
		}
	});
	// !middle room
	for (i = 1; i < 7; i++) {
		this.anims.create({
			key: 'flip' + i,
			frames: flipStartFrames,
			frameRate: 30
		}).addFrame(flipArray[i]);
	}
	var flip = this.anims.create({
		key: 'flipstart',
		frames: flipStartFrames,
		frameRate: 30
	});
	this.anims.create({
		key: 'flipback',
		frames: flipBackFrames,
		frameRate: 30
	});
	this.anims.create({
		key: 'fly',
		frames: flyFrames,
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacle0',
		frames: obstacle0Frames,
		frameRate: 0,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleA',
		frames: obstacleAframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleB',
		frames: obstacleBframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleC',
		frames: obstacleCframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleD',
		frames: obstacleDframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleE',
		frames: obstacleEframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'obstacleF',
		frames: obstacleFframes,
		frameRate: 15,
		repeat: -1
	});
	this.anims.create({
		key: 'keyget',
		frames: keyGetframes,
	});
	var obstacles = ['obstacle0', 'obstacleA', 'obstacleB', 'obstacleC', 'obstacleD', 'obstacleE', 'obstacleF'];
	this.anims.create({
		key: 'up1',
		frames: u1Frames,
		frameRate: 10,

	});
	this.anims.create({
		key: 'up2',
		frames: u2Frames,
		frameRate: 10,

	});
	this.anims.create({
		key: 'down1',
		frames: d1Frames,
		frameRate: 10,

	});
	this.anims.create({
		key: 'down2',
		frames: d2Frames,
		frameRate: 10,
	});
	this.anims.create({
		key: 'doubleup',
		frames: u1Frames,
		frameRate: 10,

	}).addFrame(u2Frames);
	this.anims.create({
		key: 'doubledown',
		frames: d1Frames,
		frameRate: 10,

	}).addFrame(d2Frames);
	this.anims.create({
		key: 'crash1',
		frames: crash1frames,
		framerate: 15,
		repeat: 8,
	});
	this.anims.create({
		key: 'crash2',
		frames: crash2frames,
		framerate: 15,
		repeat: 8,
	});
	this.anims.create({
		key: 'crash3',
		frames: crash3frames,
		framerate: 15,
		repeat: 8,
	});
	this.anims.create({
		key: 'respawn',
		frames: respawnFrames,
		framerate: 30,
		repeat: 0,
	});
	var sq1Tween = this.tweens.add({
		targets: [sq1],
		y: '-=300',
		duration: 500,
		ease: 'easeOut',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq1Tween.pause();
			sq1TweenFall.resume();
			sq1.input.enabled = false;
		}
	});
	var sq1TweenFall = this.tweens.add({
		targets: [sq1],
		y: '+=300',
		duration: 750,
		ease: 'Bounce',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq1TweenFall.pause();
			sq1.input.enabled = true;
		}
	});
	var sq2Tween = this.tweens.add({
		targets: [sq2],
		y: '-=300',
		duration: 500,
		ease: 'ease',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq2Tween.pause();
			sq2TweenFall.resume();
			sq2.input.enabled = false;
		}
	});
	var sq2TweenFall = this.tweens.add({
		targets: [sq2],
		y: '+=300',
		duration: 750,
		ease: 'Bounce',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq2TweenFall.pause();
			sq2.input.enabled = true;
		}
	});
	var sq3Tween = this.tweens.add({
		targets: [sq3],
		y: '-=300',
		duration: 500,
		ease: 'easeIn',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq3Tween.pause();
			sq3TweenFall.resume();
			sq3.input.enabled = false;
		}
	});
	var sq3TweenFall = this.tweens.add({
		targets: [sq3],
		y: '+=300',
		duration: 750,
		ease: 'Bounce',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			sq3TweenFall.pause();
			sq3.input.enabled = true;
		}
	});
	this.anims.create({
		key: 'couch',
		frames: couchFrames,
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bookcirc',
		frames: bookCircFrames,
		frameRate: 30,
		repeat: 0
	});
	// !right room
	this.anims.create({
		key: 'lampwobble',
		frames: lampFrames,
		frameRate: 30
	});
	var book1tween = this.tweens.add({
		targets: [book1],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book1tween.pause();
		}
	});
	var book2tween = this.tweens.add({
		targets: [book2],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book2tween.pause();
		}
	});
	var book3tween = this.tweens.add({
		targets: [book3],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book3tween.pause();
		}
	});
	var book4tween = this.tweens.add({
		targets: [book4],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book4tween.pause();
		}
	});
	var book5tween = this.tweens.add({
		targets: [book5],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book5tween.pause();
		}
	});
	var book6tween = this.tweens.add({
		targets: [book6],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book6tween.pause();
		}
	});
	var book7tween = this.tweens.add({
		targets: [book7],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book7tween.pause();
		}
	});
	var book8tween = this.tweens.add({
		targets: [book8],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book8tween.pause();
		}
	});
	var book9tween = this.tweens.add({
		targets: [book9],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book9tween.pause();
		}
	});
	var book10tween = this.tweens.add({
		targets: [book10],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book10tween.pause();
		}
	});
	var book11tween = this.tweens.add({
		targets: [book11],
		x: '-=206',
		y: '+=96',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book11tween.pause();
		}
	});
	this.anims.create({
		key: 'mousehole1',
		frames: holes1Frames,
		framerate: 30,
		repeat: 0,
	});
	this.anims.create({
		key: 'mousehole2',
		frames: holes2Frames,
		framerate: 30,
		repeat: 0,
	});
	this.anims.create({
		key: 'mousehole3',
		frames: holes3Frames,
		framerate: 30,
		repeat: 0,
	});

	_anims = this.anims;
	// !create interactions
	// !universal

	$('#barhelp').click(function() {
		if (textBox.ready == false && textBox.pos == 0) {
			textBox.ready = true;
			textBoxTweenUp.resume();
			downPromptAnim.resume();
			if (currentRoom == 0) {
				textBoxText.setText(helps.l[textBox.pos]);
				textBox.pos=2;
			} else if (currentRoom == 1) {
				textBoxText.setText(helps.m[textBox.pos]);
				textBox.pos=2;
			} else if (currentRoom == 2) {
				textBoxText.setText(helps.r[textBox.pos]);
				textBox.pos=2;
			}
		}
	});

	tween = this.tweens.add({
		targets: [fadeLogo, cameraFocus],
		y: 1246,
		alpha: 0,
		duration: 1750,
		repeat: 0,
		onComplete: function() {
			//textBoxTweenUp.resume();
			$('#barhelp').css({
				'opacity': '1'
			});
			textBox.up = true;
			downPrompt.alpha = 1;
			setTimeout(function() {
				textBox.ready = true;
				downPromptAnim.resume();
			}, 1250);
		}
	});
	tween = this.tweens.add({
		targets: [textBox, textBoxText, downPrompt],
		y: "+=1586",
		duration: 1750,
		repeat: 0,
	});
	leftButton.on('pointerdown', function() {
		if (currentRoom == 1) {
			currentRoom = 0;
			leftButton.alpha = 0;
			tween = this.tweens.add({
				targets: [uiContainer, textContainer],
				x: 0,
				y: 1020,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cameraFocus],
				x: 800,
				y: 1700,
				duration: 750,
				repeat: 0
			});
		}
		if (currentRoom == 2) {
			currentRoom = 1;
			rightButton.alpha = 1;
			tween = this.tweens.add({
				targets: [uiContainer, textContainer],
				x: 1600,
				y: 566,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cameraFocus],
				x: 2400,
				y: 1246,
				duration: 750,
				repeat: 0
			});
		}
	}, this);
	rightButton.on('pointerdown', function() {
		if (currentRoom == 1) {
			currentRoom = 2;
			rightButton.alpha = 0;
			tween = this.tweens.add({
				targets: [uiContainer, textContainer],
				x: 3200,
				y: 120,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cameraFocus],
				x: 4000,
				y: 800,
				duration: 750,
				repeat: 0
			});
		}
		if (currentRoom === 0) {
			currentRoom = 1;
			leftButton.alpha = 1;
			tween = this.tweens.add({
				targets: [uiContainer, textContainer],
				x: 1600,
				y: 566,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cameraFocus],
				x: 2400,
				y: 1246,
				duration: 750,
				repeat: 0
			});
		}
	}, this);
	textBox.on('pointerdown', function() {
		if (textBox.ready == true && textBox.pos == 1) {
			textBox.ready = false;
			downPromptAnim.pause();
			textBox.pos = 2;
			textBoxText.setText('Hello, my friend.');
			setTimeout(function() {
				textBox.ready = true;
				downPromptAnim.resume();
			}, 1250);
		} else if (textBox.ready == true && textBox.pos == 2) {
			downPromptAnim.pause();
			textBoxTweenDownPrep.resume();
			textBox.ready = false;
			textBox.pos = 0;
		}  else if (textBox.ready == true && textBox.pos == 3) {
			textBox.ready = false;
			setTimeout(function() {
				textBox.ready = true;
				textBox.pos = 2;
			}, 1250);
		}
	}, this);
	// !left room
	rugContain.on('pointerover', function() {
		if (!rugContain.isUp) {
			rugBumpUpTween.resume();
		}
	});
	rugContain.on('pointerout', function() {
		if (rugContain.isUp) {
			rugBumpDownTween.resume();
		}
	});
	rugContain.on('pointermove', function(pointer) {
		var pointY = (pointer.y + 900);
		rugBump.x = pointer.x;
		rugBump.y = pointY;
		if (rugContain.isUp) {
			rugBumpJitterTween.resume();
		}
	});
	rugContain.on('pointerdown', function() {
		if (rugContain.isUp) {
			rugBumpDownTween.resume();
			owwSound.play();
		}
	});
	sizePoster.on('pointerdown', function(pointer) {
		if (nextSize == 10) {
			nextSize = 1;
		}
		sizeTweens[nextSize].resume();
		nextSize++;
	});
	door.on('pointerdown', function(pointer) {
		if (textBox.ready == false && textBox.pos == 0) {
			textBox.ready = true;
			textBoxTweenUp.resume();
			downPromptAnim.resume();
			if (doorClicks <= 3) {
				textBoxText.setText(doorQuips[doorClicks]);
			} else {
				doorClicks = 0;
				textBoxText.setText(doorQuips[doorClicks]);
			}
			doorClicks++;
			setTimeout(function() {
				textBoxTweenDownPrep.resume();
				downPromptAnim.pause();
				textBox.ready = false;
			}, 4000);

		}
	}, this);
	frontPlant.on('pointerdown', function() {
		if (currentPlant === 0) {
			frontPlant.play('plantcycle1');
			currentPlant = 1;
		} else if (currentPlant == 1) {
			frontPlant.play('plantcycle2');
			currentPlant = 2;
		} else if (currentPlant == 2) {
			frontPlant.play('plantcycle3');
			currentPlant = 3;
		} else if (currentPlant == 3) {
			frontPlant.play('plantcycle4');
			currentPlant = 0;
		}
	}, this);
	var mug1tween = this.tweens.add({
		targets: [mug1],
		y: '+=40',
		duration: 200,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			mug1tween.pause();
		}
	});
	var mug2tween = this.tweens.add({
		targets: [mug2],
		y: '+=40',
		duration: 200,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			mug2tween.pause();
		}
	});
	var mug3tween = this.tweens.add({
		targets: [mug3],
		y: '+=40',
		duration: 200,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			mug3tween.pause();
		}
	});
	var mug4tween = this.tweens.add({
		targets: [mug4],
		y: '+=40',
		duration: 200,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			mug4tween.pause();
		}
	});
	mug1.on('pointerdown', function() {
		mug1.y -= 50;
		mug1tween.resume();
		mugSound.play();
		p = mug1.pos;
		if (p < 8) {
			p++;
		} else {
			p = 1;
		}
		mug1.pos = p;
		mug1.setFrame('mug' + p);
	});
	mug2.on('pointerdown', function() {
		if (widePlant.scaleX < 1.5) {
			widePlant.scaleX += 0.05;
			widePlant.scaleY += 0.05;
		}
		mug2.y -= 50;
		mug2tween.resume();
		mugSound.play();
		p = mug2.pos;
		p2 = mug3.pos;
		if (p < 8) {
			p++;
		} else {
			p = 1;
		}
		if (p2 < 8) {
			p2++;
		} else {
			p2 = 1;
		}
		mug2.pos = p;
		mug3.pos = p2;
		mug2.setFrame('mug' + p);
		mug3.setFrame('mug' + p2);
		mugSound.play();
	});
	mug3.on('pointerdown', function() {
		if (widePlant.scaleX > 0.75) {
			widePlant.scaleX -= 0.1;
			widePlant.scaleY -= 0.1;
		}
		mug3.y -= 50;
		mug3tween.resume();
		mugSound.play();
		p = mug2.pos;
		p2 = mug3.pos;
		if (p < 8) {
			p++;
		} else {
			p = 1;
		}
		if (p2 < 8) {
			p2++;
		} else {
			p2 = 1;
		}
		mug2.pos = p;
		mug3.pos = p2;
		mug2.setFrame('mug' + p);
		mug3.setFrame('mug' + p2);
	});
	mug4.on('pointerdown', function() {
		mug4.y -= 50;
		mug4tween.resume();
		mugSound.play();
		p = mug4.pos;
		if (p < 8) {
			p++;
		} else {
			p = 1;
		}
		mug4.pos = p;
		mug4.setFrame('mug' + p);
	});

	// !middle room
	sq1.on('pointerdown', function() {
		sqSound.play();
		if (sq1.frame.name === 'w') {
			sq1.setFrame('y');
		} else if (sq1.frame.name === 'y') {
			sq1.setFrame('b');
		} else if (sq1.frame.name === 'b') {
			sq1.setFrame('c');
		} else if (sq1.frame.name === 'c') {
			sq1.setFrame('w');
		}
	}, this);
	sq2.on('pointerdown', function() {
		sqSound.play();
		if (sq2.frame.name === 'w') {
			sq2.setFrame('y');
		} else if (sq2.frame.name === 'y') {
			sq2.setFrame('b');
		} else if (sq2.frame.name === 'b') {
			sq2.setFrame('c');
		} else if (sq2.frame.name === 'c') {
			sq2.setFrame('w');
		}
	}, this);
	sq3.on('pointerdown', function() {
		sqSound.play();
		if (sq3.frame.name === 'w') {
			sq3.setFrame('y');
		} else if (sq3.frame.name === 'y') {
			sq3.setFrame('b');
		} else if (sq3.frame.name === 'b') {
			sq3.setFrame('c');
		} else if (sq3.frame.name === 'c') {
			sq3.setFrame('w');
		}
	}, this);

	bookStack.on('pointerdown', function() {
		bookStack.anims.play('bookcirc');
	}, this);

	var shuffle = function(array) {
			var currentIndex = array.length,
				temporaryValue, randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;
		};
	var cardFlipSound = this.sound.add('cardflipsound');
	var flipBackSound = this.sound.add('flipbacksound');
	var cardWinSound = this.sound.add('cardwinsound');
	var cardFlip = function(x) {

			cardContainer.bringToTop(x);
			if (x.flipped !== true) {

				x.flipped = true;
				if (firstCard == null) {
					firstCard = x.face;
					firstFlip = x;
					x.anims.play('flip' + x.face);
					cardFlipSound.play();
				} else {
					cardContainer.list.forEach(function(e) {
						e.input.enabled = false;
					});
					secondCard = x.face;
					x.anims.play('flip' + x.face);
					cardFlipSound.play();
					if (firstCard == secondCard) {
						setTimeout(function() {
							cardWinSound.play();
						}, 1250);
						totalFlipped += 2;
						firstCard = null;
						secondCard = null;
						firstFlip = null;
						cardContainer.list.forEach(function(e) {
							e.input.enabled = true;
						});
						if (totalFlipped == 12) {
							firstCard = null;
							secondCard = null;
							firstFlip = null;
							setTimeout(function() {
								cardWinSound.play();
							}, 7000);
							setTimeout(function() {
								if (confirm("Song for you!")) {
									openExternalLink('https://www.youtube.com/watch?v=Y5KMl11I7Zs');
								}
							}, 8000);
							flipOrder.forEach(function(e) {
								totalFlipped -= 0.5;
								setTimeout(function() {
									cardContainer.bringToTop(e);
									e.anims.play('flipback');
									cardFlipSound.play();
									e.flipped = false;
								}, 2000 + (totalFlipped * 300));

							});

							shuffle(faces);
							for (var i = 0; i < faces.length; i++) {
								cardContainer.list[i].face = faces[i];
							}
						}
					} else {
						setTimeout(function() {
							x.anims.play('flipback');
							flipBackSound.play();
							x.flipped = false;
							firstFlip.anims.play('flipback');
							firstFlip.flipped = false;
							firstCard = null;
							secondCard = null;
							firstFlip = null;
							cardContainer.list.forEach(function(e) {
								e.input.enabled = true;
							});
						}, 1750);
					}
				}
			} else {}
		};
	card1a.on('pointerdown', function(card1a) {
		cardFlip(this);
	});
	card1b.on('pointerdown', function(card1b) {
		cardFlip(this);
	});
	card1c.on('pointerdown', function(card1c) {
		cardFlip(this);
	});
	card1d.on('pointerdown', function(card1d) {
		cardFlip(this);
	});
	card2a.on('pointerdown', function(card2a) {
		cardFlip(this);
	});
	card2b.on('pointerdown', function(card2b) {
		cardFlip(this);
	});
	card2c.on('pointerdown', function(card2c) {
		cardFlip(this);
	});
	card2d.on('pointerdown', function(card2d) {
		cardFlip(this);
	});
	card3a.on('pointerdown', function(card3a) {
		cardFlip(this);
	});
	card3b.on('pointerdown', function(card3b) {
		cardFlip(this);
	});
	card3c.on('pointerdown', function(card3c) {
		cardFlip(this);
	});
	card3d.on('pointerdown', function(card3d) {
		cardFlip(this);
	});
	// assign faces
	shuffle(faces);
	// !shooter
	this.input.on('pointerover', function(event, gameObjects) {

		if (gameObjects[0].name == "controlstriptop" || gameObjects[0].name == "controlstripmid" || gameObjects[0].name == "controlstripbot") {
			controlStrip.setFrame('cs02');
		}
	});
	this.input.on('pointerout', function(event, gameObjects) {
		if (gameObjects[0].name == "controlstriptop" || gameObjects[0].name == "controlstripmid" || gameObjects[0].name == "controlstripbot") {
			controlStrip.setFrame('cs00');
		}
	});
	this.input.on('pointerover', function(event, gameObjects) {
		if (event.isDown && shooterBg.anims.isPaused == false && shipRespawning === false && pane1.anims.currentAnim != null) {
			if (gameObjects[0].name == "controlstriptop") {
				if (shipPos == 1) {
					p1.anims.play('up2');
				} else if (shipPos == 2) {
					p1.anims.play('doubleup');
				}
				shipPos = 0;
			} else if (gameObjects[0].name == "controlstripmid") {
				if (shipPos == 0) {
					p1.anims.play('down1');
				} else {
					p1.anims.play('up1');
				}
				shipPos = 1;
			} else if (gameObjects[0].name == "controlstripbot") {
				if (shipPos == 1) {
					p1.anims.play('down2');
				} else if (shipPos == 0) {
					p1.anims.play('doubledown');
				}
				shipPos = 2;
			}
		}
	});
	var shooterLoop = function(pointer) {
			//if possible, resume
			if (shooterBg.anims.isPaused && shipRespawning === false) {
				shooterBg.anims.resume();
				pane1.anims.resume();
				pane2.anims.resume();
				pane3.anims.resume();
				shootSong.resume();
			} else {
				//initialize
				shooterBg.anims.play('fly');
				shootSong.play();
			}
			//set inital anims
			if (pane1.anims.currentAnim == null && pane2.anims.currentAnim == null && pane3.anims.currentAnim == null) {
				pane1.anims.play('obstacle0');
				pane2.anims.play('obstacle0');
				if (pane3.frame.name === '1' || pane3.frame.name === '2') {
					pane3.anims.play('obstacleA');
				} else if (pane3.frame.name === '3' || pane3.frame.name === '4') {
					pane3.anims.play('obstacleB');
				} else if (pane3.frame.name === '5' || pane3.frame.name === '6') {
					pane3.anims.play('obstacleC');
				} else if (pane3.frame.name === '7' || pane3.frame.name === '8') {
					pane3.anims.play('obstacleD');
				} else if (pane3.frame.name === '9' || pane3.frame.name === '10') {
					pane3.anims.play('obstacleE');
				} else if (pane3.frame.name === '11' || pane3.frame.name === '12') {
					pane3.anims.play('obstacleF');
				}
			}
			controlStrip.setFrame('cs01');
			//start interval
			var mouseCheck = setInterval(function() {
				if (shipRespawning === false) {
					shooterTick++;
				}
				if (pane3.anims.currentAnim.key === 'obstacle0' && shooterTick == 4) {
					pane1.anims.play(pane2.anims.currentAnim.key);
					pane2.anims.play(pane3.anims.currentAnim.key);
					if (dodgeCounter >= 21 && !keySpawned && !keyGot) {
						pane3.anims.play('keyget');
						keySpawned = true;
					} else if (dodgeCounter == 32) {
						//keyGetTween.resume();
					} else {
						pane3.anims.play(obstacles[Math.floor(Math.random() * 6) + 1]);
					}
					if (shipRespawning === false) {
						dodgeCounter++;
					}
					shooterTick = 0;
				} else if (pane3.anims.currentAnim != 'obstacle0' && pane3.anims.currentAnim != null && shooterTick == 4) {
					pane1.anims.play(pane2.anims.currentAnim.key);
					shooterTick = 0;
					if (shipRespawning === false) {
						dodgeCounter++;
					}
					pane2.anims.play(pane3.anims.currentAnim.key);
					if (dodgeCounter == 30 && !keySpawned && !keyGot) {
						pane3.anims.play('keyget');
						keySpawned = true;
					} else if (dodgeCounter == 32) {
						console.log('ece??');
						//keyGetTween.resume();
					} else {
						pane3.play('obstacle0');
					}
				}

				// mouse movement stuff
				if (pointer.isDown === false || pointer.rightButtonDown()) {
					shooterBg.anims.pause();
					pane1.anims.pause();
					pane2.anims.pause();
					pane3.anims.pause();
					clearInterval(mouseCheck);
					controlStrip.setFrame('cs00');
					shootSong.pause();
					startY = null;
					if (pointer.x >= controlStrip.x - 800 && pointer.x < (controlStrip.x - 800 + controlStrip.width) && pointer.y >= controlStrip.y - 223 && pointer.y < (controlStrip.y - 223 + controlStrip.height)) {
						controlStrip.setFrame('cs02');
					}
				}
				// collision zones
				if (pane1.anims.currentAnim.key === "obstacle0") {
					collisionZone.a = false;
					collisionZone.b = false;
					collisionZone.c = false;
				} else if (pane1.anims.currentAnim.key === "obstacleA") {
					collisionZone.a = false;
					collisionZone.b = false;
					collisionZone.c = true;
				} else if (pane1.anims.currentAnim.key === "obstacleB") {
					collisionZone.a = false;
					collisionZone.b = true;
					collisionZone.c = false;
				} else if (pane1.anims.currentAnim.key === "obstacleC") {
					collisionZone.a = true;
					collisionZone.b = false;
					collisionZone.c = false;
				} else if (pane1.anims.currentAnim.key === "obstacleD") {
					collisionZone.a = true;
					collisionZone.b = true;
					collisionZone.c = false;
				} else if (pane1.anims.currentAnim.key === "obstacleE") {
					collisionZone.a = true;
					collisionZone.b = false;
					collisionZone.c = true;
				} else if (pane1.anims.currentAnim.key === "obstacleF") {
					collisionZone.a = false;
					collisionZone.b = true;
					collisionZone.c = true;
				} else if (pane1.anims.currentAnim.key === "keyget") {
					collisionZone.a = false;
					collisionZone.b = false;
					collisionZone.c = false;
					collisionZone.key = true;
				}
				var killShip = function() {
						clearInterval(mouseCheck);
						shooterTick = 0;
						shooterBg.anims.pause();
						pane1.play('obstacle0');
						if (keySpawned) {
							pane2.anims.play('obstacle0');
							pane3.anims.play('obstacle0');
							keySpawned = false;
						}
						pane1.anims.pause();
						pane2.anims.pause();
						pane3.anims.pause();
						shootSong.pause();
						dodgeCounter = 0;
						startY = null;
					};
				if (shipPos === 0 && collisionZone.a === true && shipRespawning === false) {
					killShip();
					p1.anims.play('crash1');
					dieSound.play();
					shipPos = 1;
					shipRespawning = true;
				} else if (shipPos == 1 && collisionZone.b === true && shipRespawning === false) {
					killShip();
					p1.anims.play('crash2');
					dieSound.play();
					shipRespawning = true;
				} else if (shipPos == 2 && collisionZone.c === true && shipRespawning === false) {
					killShip();
					p1.anims.play('crash3');
					dieSound.play();
					shipPos = 1;
					shipRespawning = true;
				} else if (pane1.anims.currentAnim.key == 'keyget' && collisionZone.key === true && shipRespawning === false) {
					keyGot = true;
					keySpawned = false;
					$('#barkey').css({
							'opacity': '1'
						});
					pane1.play('obstacle0');
				}
			}, 250);
			p1.on('animationcomplete', function(anim, frame) {
				this.emit('animationcomplete_' + anim.key, anim, frame);
			}, p1);
			p1.on('animationcomplete_crash1', function() {
				p1.anims.play('respawn');
			});
			p1.on('animationcomplete_crash2', function() {
				p1.anims.play('respawn');
			});
			p1.on('animationcomplete_crash3', function() {
				p1.anims.play('respawn');
			});
			p1.on('animationcomplete_respawn', function() {

				if (shipRespawning === true) {
					shootSong.seek = 0;
					collisionZone = {
						a: false,
						b: false,
						c: false,
					};
					if (pointer.isDown === true && shipRespawning === true) {
						if (pointer.x >= controlStrip.x - 800 && pointer.x < (controlStrip.x - 800 + controlStrip.width) && pointer.y >= controlStrip.y - 223 && pointer.y < (controlStrip.y - 223 + controlStrip.height)) {
							controlStrip.setFrame('cs02');
						} else {
							controlStrip.setFrame('cs00');
						}
					}

				}
				shipRespawning = false;
			});


		};

	controlStripTop.on('pointerdown', function(pointer) {
		shooterLoop(pointer);
		if (shipPos == 1) {
			p1.anims.play('up2');
		} else if (shipPos == 2) {
			p1.anims.play('doubleup');
		}
		shipPos = 0;
	});
	controlStripMid.on('pointerdown', function(pointer) {
		shooterLoop(pointer);
		if (shipPos == 0) {
			p1.anims.play('down1');
		} else if (shipPos == 2) {
			p1.anims.play('up1');
		}
		shipPos = 1;
	});
	controlStripBot.on('pointerdown', function(pointer) {
		shooterLoop(pointer);
		if (shipPos == 0) {
			p1.anims.play('doubledown');
		} else if (shipPos == 1) {
			p1.anims.play('down2');
		}
		shipPos = 2;
	});
	couch.anims.play('couch');
	sq1.on('pointerdown', function() {
		sq1Tween.resume();
	});
	sq2.on('pointerdown', function() {
		sq2Tween.resume();
	});
	sq3.on('pointerdown', function() {
		sq3Tween.resume();
	});
	// !right room
	lamp.on('pointerdown', function() {
		this.anims.play('lampwobble');
		wobbleSound.play();
	});
	var sequence = function(x) {
			if (x == prevTone && prevTone != 8) {
				bookChimes[x].alpha = 0.75;
				prevTone++;
			} else if (x == prevTone && prevTone == 8) {
				//chime1.play();
				//chime3.play();
				//chime5.play();
				//chime8.play();
				prevTone++;
				bookChimes[x].alpha = 1;
				bookChimes.forEach(function(e) {
					e.alpha = 1;
					e.input.enabled = true;
					setTimeout(function() {
						if (bookChimes.indexOf(e) === 8) {
							book1tween.resume();
						} else if (bookChimes.indexOf(e) === 7) {
							game.sound.play('chime7');
							book2tween.resume();
						} else if (bookChimes.indexOf(e) === 6) {
							game.sound.play('chime5');
							book3tween.resume();
						} else if (bookChimes.indexOf(e) === 5) {
							game.sound.play('chime6');
							book5tween.resume();
						} else if (bookChimes.indexOf(e) === 4) {
							game.sound.play('chime4');
							book6tween.resume();
						} else if (bookChimes.indexOf(e) === 3) {
							game.sound.play('chime3');
							book8tween.resume();
						} else if (bookChimes.indexOf(e) === 2) {
							game.sound.play('chime2');
							book9tween.resume();
						} else if (bookChimes.indexOf(e) === 1) {
							game.sound.play('chime1');
							book10tween.resume();
						} else if (bookChimes.indexOf(e) === 0) {

						}
					}, (prevTone * 300));
					prevTone -= 1;
				});
				setTimeout(function(){
					book1tween.resume();
					book2tween.resume();
					book3tween.resume();
					book4tween.resume();
					book5tween.resume();
					book6tween.resume();
					book7tween.resume();
					book8tween.resume();
					book9tween.resume();
					book10tween.resume();
					book11tween.resume();
					game.sound.play('chime1');
					game.sound.play('chime3');
					game.sound.play('chime5');
					game.sound.play('chime8');
					prevTone = 1;
					/*if (confirm("Song for you!")) {
								openExternalLink('https://www.youtube.com/watch?v=Y5KMl11I7Zs');
							} else {}*/
				}, 4500)
			} else {
				bookChimes[x].alpha = 1;
				bookChimes.forEach(function(e) {
					e.alpha = 1;
					e.input.enabled = true;
				});
				prevTone = 1;
			}
		};
	/*this.input.on('pointerdown', function(event, gameObjects) {
		console.log(gameObjects[0]);
	});*/

	book1.on('pointerdown', function() {
		book1tween.resume();
		sequence(8);
		chime8.play();
	}, this);
	book2.on('pointerdown', function() {
		book2tween.resume();
		sequence(7);
		chime7.play();
	}, this);
	book3.on('pointerdown', function() {
		book3tween.resume();
		sequence(5);
		chime5.play();
	}, this);
	book5.on('pointerdown', function() {
		book5tween.resume();
		sequence(3);
		chime3.play();
	}, this);
	book6.on('pointerdown', function() {
		book6tween.resume();
		sequence(1);
		chime1.play();
	}, this);
	book7.on('pointerdown', function() {
		book7tween.resume();
		sequence(0);
		chime0.play();
	}, this);
	book8.on('pointerdown', function() {
		book8tween.resume();
		sequence(4);
		chime4.play();
	}, this);
	book9.on('pointerdown', function() {
		book9tween.resume();
		sequence(6);
		chime6.play();
	}, this);
	book10.on('pointerdown', function() {
		book10tween.resume();
		sequence(2);
		chime2.play();
	}, this);
	mouseHoles.on('pointerdown', function(pointer) {
		var whichHole = pointer.x;
		if (currentHoles === 0 && !mouseHoles.anims.isPlaying) {
			if (whichHole < 1000) {
				mouseHoles.anims.playReverse('mousehole1');
			} else {
				mouseHoles.anims.play('mousehole1');
			}
			currentHoles = 1;
		} else if (currentHoles == 1 && !mouseHoles.anims.isPlaying) {
			if (whichHole < 1000) {
				mouseHoles.anims.playReverse('mousehole2');
			} else {
				mouseHoles.anims.play('mousehole2');
			}
			currentHoles = 2;
		} else if (currentHoles == 2 && !mouseHoles.anims.isPlaying) {
			if (whichHole < 1000) {
				mouseHoles.anims.playReverse('mousehole3');
			} else {
				mouseHoles.anims.play('mousehole3');
			}
			currentHoles = 0;
		}
	}, this);
	openExternalLink = function(url) {
		window.open(url);
	};
	// !create containers
	// universal
	// !left room
	// !middle room
	var cardContainer = this.add.container(-30, -100, [card1a, card1b, card1c, card1d, card2a, card2b, card2c, card2d, card3a, card3b, card3c, card3d]);
	flipOrder = [card1a, card1b, card1c, card1d, card2a, card2b, card2c, card2d, card3a, card3b, card3c, card3d, card3d, card3c, card3b, card3a, card2d, card2c, card2b, card2a, card1d, card1c, card1b, card1a];
	for (i = 0; i < faces.length; i++) {
		cardContainer.list[i].face = faces[i];
	}
	// !right room
	var booksContainer = this.add.container(0, 0, [bottomShelf, book5, book6, book7, book8, book9, book10, book11, topShelf, book1, book2, book3, book4, shelfPlant]);
	bookChimes = [book4, book6, book10, book5, book8, book3, book9, book2, book1];
	var uiContainer = this.add.container(1600, 566, [leftButton, rightButton]);
	var textContainer = this.add.container(1600, 566, [textBox, textBoxText, downPrompt]);

	this.cameras.main.startFollow(cameraFocus);
}

function update() {};

var makeFloat = function() {
		floaters.forEach(function(f) {
			if (f.mult === undefined) {
				f.mult = (Math.random() * 3) + 0.25;
			}
			f.x += 2.25 * f.mult;
			f.y -= 1.05 * f.mult;
			if (f.x > 4200) {
				f.x = 900;
				f.y = (Math.floor(Math.random() * 956) + 1100);
				f.setFrame(floaterFrames[Math.floor(Math.random() * 4)]);
				f.mult = undefined;
			}
		});
	};
