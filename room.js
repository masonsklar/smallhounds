var context;

var _anims;
var booksContainer;
var chooseContainer;
var book1tween;
var sequence;
var chooserTween;
var prevTone = 1;
var cardContainer;
var firstCard;
var secondCard;
var firstFlip;
var totalFlipped = 0;
var flipOrder;
var currentRoom = 1;
var currentPlant = 0;
var p1Frames;
var obstacles;
var frontPlant;
var plantCycle1Frames;
var keyGetframes;
var holesFrames;
var controlStrip;
var shootSong;
var shipActive;
var shooterTick = 0;
var dodgeCounter = 0;
var keyGetTween;
var p1;
var pane1;
var pane2;
var pane3;
var openExternalLink;
var chooserTweenUp;
var chooserTweenDownPrep;
var greenText;
var chooserBg;
var nextSize = 1;
var cropGrid = {
	p1: {
		x: 378,
		y: 505.5
	},
	p2: {
		x: 446,
		y: 473.7
	},
	p3: {
		x: 514,
		y: 442
	},
	p4: {
		x: 378,
		y: 623.7
	},
	p5: {
		x: 446,
		y: 592
	},
	p6: {
		x: 514,
		y: 560.3
	},
	p7: {
		x: 378,
		y: 742
	},
	p8: {
		x: 446,
		y: 710.3
	},
	p9: {
		x: 514,
		y: 678.5
	},
}
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

var door;
var doorClicks = 0;
var doorText;
var chooserStats = {
	up: false,
	currentPage: 0,
	page: [{
		index: '0',
		optA: 'the park',
		optB: 'assets',
		linkA: 1,
		linkB: 2,
		caption: ['Wow, its beautiful outside!', 'Where are we going?']
	}, {
		index: '1',
		optA: 'home',
		optB: 'assets',
		linkA: 0,
		linkB: 2,
		caption: ['We are at the park!', 'Check out the swing!']
	}, {
		index: '2',
		optA: 'hmm?',
		optB: 'dark',
		linkA: 3,
		linkB: 4,
		caption: ['Looks like some assets.', 'Probably for cards or a', 'water wheel. Hmm.', 'It is getting dark.']
	}, {
		index: '3',
		optA: 'assets',
		optB: 'dark',
		linkA: 2,
		linkB: 4,
		caption: ['It looks like a hole.', 'Just a dark hole.', 'A hole in the ground,', 'where we put our sound.']
	}, {
		index: '4',
		optA: 'hole',
		optB: 'home',
		linkA: 3,
		linkB: 0,
		caption: ['You have been outside a', 'while now!', 'It might be bedtime.', 'have a lullaby. Goodnight.']
	}, ]
};
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
var flyFrames;
var couchFrames;
var lamp;
var faces = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
var centers = {
	l: [400, 850],
	m: [1200, 623],
	r: [2000, 400],
};
var scene = {
	key: 'room',
	preload: preload,
	create: create,
	update: update
};

var config = {
	type: Phaser.AUTO,
	parent: 'gameframe',
	width: 800,
	height: 800,
	backgroundColor: '#ffca4d',
	scene: [scene],
	audio: {
        context: context
    }
};
//var game = new Phaser.Game(config);

function preload() {
	var width = this.cameras.main.width;
	var height = this.cameras.main.height;
	var loadingText = this.make.text({
		x: width / 2,
		y: height / 2 - 50,
		text: 'loading...',
		style: {
			font: '36pt magistral',
			fill: '#ffffff'
		}
	});
	loadingText.setOrigin(0.5, 0.5);
	var percentText = this.make.text({
		x: width / 2,
		y: height / 2 ,
		text: '0%',
		style: {
			font: '36pt magistral',
			fill: '#ffffff'
		}
	});
	var progressBar = this.add.graphics();
	var progressBox = this.add.graphics();
	progressBox.fillStyle(0xffca4d, 0);
	progressBox.fillRect(240, 270, 320, 50);
	percentText.setOrigin(0.5, 0.5);
	this.load.on('progress', function(value) {
		progressBar.clear();
		progressBar.fillStyle(0x225a89, 1);
		progressBar.fillRect(250, 280, 300 * value, 30);
		percentText.setText(parseInt(value * 100) + '%');
	});

	this.load.on('fileprogress', function(file) {});

	this.load.on('complete', function() {
		progressBar.destroy();
		progressBox.destroy();
		loadingText.destroy();
		percentText.destroy();
	});
	// !load images
	// universal 
	//this.load.image('room', 'assets/bg/room.png');
	this.load.image('roomL', 'assets/bg/roomL.png');
	this.load.image('roomM', 'assets/bg/roomM.png');
	this.load.image('roomR', 'assets/bg/roomR.png');
	this.load.image('logo', 'assets/ui/logo.png');
	this.load.image('left', 'assets/ui/left.png');
	this.load.image('right', 'assets/ui/right.png');
	// left room
	this.load.image('chooser', 'assets/chooser/chooser.png');
	this.load.image('redbutton', 'assets/chooser/rbut.png');
	this.load.image('greenbutton', 'assets/chooser/gbut.png');
	// middle room 
	this.load.image('card', 'assets/objects/card/cardback.png');
	this.load.image('bgcouch', 'assets/objects/couch/sq/bgcouch.png');
	this.load.image('arm', 'assets/objects/couch/sq/arm.png');
	this.load.image('side', 'assets/objects/couch/sq/side.png');

	// right room
	this.load.image('shelfimg', 'assets/objects/books/shelf.png');
	this.load.image('shelfplantimg', 'assets/objects/books/shelfplant.png');
	this.load.image('tablelegs', 'assets/objects/table/legs.png');
	this.load.image('topleg', 'assets/objects/table/topleg.png');
	this.load.image('tabletop', 'assets/objects/table/top.png');
	// !load atlasses
	// left room
	this.load.atlas('sizeposteratlas', 'assets/objects/sizeposter/sizeposter.png', 'assets/objects/sizeposter/sizeposter.json');
	this.load.atlas('dooratlas', 'assets/objects/door/door.png', 'assets/objects/door/door.json');
	this.load.multiatlas('plantcycleatlas', 'assets/objects/plantcycle/plantcycle.json');
	this.load.multiatlas('pages', 'assets/chooser/pages/pages.json');
	this.load.atlas('mugatlas', 'assets/objects/mug/mug.png', 'assets/objects/mug/mug.json');
	//this.load.atlas('pages', 'assets/chooser/pages.png', 'assets/chooser/pages.json');
	// middle room
	this.load.atlas('cardatlas', 'assets/objects/card/card.png', 'assets/objects/card/card.json');
	this.load.multiatlas('flyatlas', 'assets/objects/shooter/fly/fly.json');
	this.load.multiatlas('couchatlas', 'assets/objects/couch/couch.json');
	this.load.atlas('sqatlas', 'assets/objects/couch/sq/sq.png', 'assets/objects/couch/sq/sq.json');
	this.load.atlas('obstacleatlas', 'assets/objects/shooter/obstacle/obstacle.png', 'assets/objects/shooter/obstacle/obstacle.json');
	this.load.atlas('shooteratlas', 'assets/objects/shooter/p1.png', 'assets/objects/shooter/p1.json');
	this.load.atlas('shooterrespawn', 'assets/objects/shooter/respawn.png', 'assets/objects/shooter/respawn.json');
	// right room
	this.load.atlas('wobble', 'assets/objects/lamp/anim/wobble.png', 'assets/objects/lamp/anim/wobble.json');
	this.load.atlas('bookatlas', 'assets/objects/books/books.png', 'assets/objects/books/books.json');
	this.load.multiatlas('holesatlas', 'assets/objects/holes/holes.json');
	// !load audio
	this.load.audio('wobblesound', 'assets/objects/lamp/audio/i.mp3');
	//universal
	//left room
	this.load.audio('shootloop', 'assets/objects/shooter/shootloop.wav');
	//middle room
	//right room
	this.load.audio('chime1', 'assets/objects/books/audio/1.mp3');
	this.load.audio('chime2', 'assets/objects/books/audio/2.mp3');
	this.load.audio('chime3', 'assets/objects/books/audio/3.mp3');
	this.load.audio('chime4', 'assets/objects/books/audio/4.mp3');
	this.load.audio('chime5', 'assets/objects/books/audio/5.mp3');
	this.load.audio('chime6', 'assets/objects/books/audio/6.mp3');
	this.load.audio('chime7', 'assets/objects/books/audio/7.mp3');
	this.load.audio('chime8', 'assets/objects/books/audio/8.mp3');
	this.load.audio('chime0', 'assets/objects/books/audio/no.mp3');
}

function create() {
	
	function resizeApp ()
{
	// Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
	let game_ratio		= 800 / 800;
	
	// Make div full height of browser and keep the ratio of game resolution
	let div			= document.getElementById('gameframe');
	div.style.width		= (window.innerHeight * game_ratio) + 'px';
	div.style.height	= window.innerHeight + 'px';
	
	// Check if device DPI messes up the width-height-ratio
	let canvas			= document.getElementsByTagName('canvas')[0];
	
	let dpi_w	= parseInt(div.style.width) / canvas.width;
	let dpi_h	= parseInt(div.style.height) / canvas.height;		
	
	let height	= window.innerHeight * (dpi_w / dpi_h);
	let width	= height * game_ratio;
	
	// Scale canvas	
	canvas.style.width	= width + 'px';
	canvas.style.height	= height + 'px';
}

window.addEventListener('resize', resizeApp);
	
	// !create frames
	// !left room
	sizePosterPolygon = new Phaser.Geom.Polygon([273, 472, 0, 600, 0, 126, 273, 0]);
	doorKnobPolygon = new Phaser.Geom.Polygon([255, 429, 327, 395, 330, 518, 254, 560]);
	frontPlantPolygon = new Phaser.Geom.Polygon([222, 74, 292, 68, 331, 292, 274, 443, 194, 469, 128, 441, 70, 271]);
	var sizePosterFrames = this.anims.generateFrameNames('sizeposteratlas', {
		prefix: 'sizeposter',
		start: 0,
		end: 3
	});
	doorOpenFrames = this.anims.generateFrameNames('dooratlas', {
		start: 0,
		end: 2
	});
	var doorCloseFrames = this.anims.generateFrameNames('dooratlas', {
		start: 2,
		end: 4
	});
	plantCycle1Frames = this.anims.generateFrameNames('plantcycleatlas', {
		start: 0,
		end: 30,
	});
	plantCycle2Frames = this.anims.generateFrameNames('plantcycleatlas', {
		start: 30,
		end: 60,
	});
	plantCycle3Frames = this.anims.generateFrameNames('plantcycleatlas', {
		start: 60,
		end: 89,
	});
	plantCycle4Frames = this.anims.generateFrameNames('plantcycleatlas', {
		start: 90,
		end: 119,
	});
	var plantCycleArray = [0, plantCycle1Frames, plantCycle2Frames, plantCycle3Frames, plantCycle4Frames];
	var pageFrames = this.anims.generateFrameNames('pages', {
		prefix: 'page',
		start: 0,
		end: 4
	})
	// !middle room
	csFrames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'cs',
		start: 0,
		end: 1,
		zeropad: 2
	});
	flyFrames = this.anims.generateFrameNames('flyatlas', {
		start: 0,
		end: 118,
	});
	p1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 0,
		end: 4,
		zeroPad: 2
	});
	d1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 0,
		end: 2,
		zeroPad: 2
	});
	d2Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 2,
		end: 4,
		zeroPad: 2
	});
	u1Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 4,
		end: 6,
		zeroPad: 2
	});
	u2Frames = this.anims.generateFrameNames('shooteratlas', {
		start: 6,
		end: 8,
		zeroPad: 2
	});
	obstacleFrames = this.anims.generateFrameNames('obstacleatlas', {
		start: 0,
		end: 12,
	});
	obstacle0Frames = this.anims.generateFrameNames('obstacleatlas', {
		start: 0,
		end: 12,
	});
	obstacleAframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 1,
		end: 2,
	});
	obstacleBframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 3,
		end: 4,
	});
	obstacleCframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 5,
		end: 6,
	});
	obstacleDframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 7,
		end: 8,
	});
	obstacleEframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 9,
		end: 10,
	});
	obstacleFframes = this.anims.generateFrameNames('obstacleatlas', {
		start: 11,
		end: 12,
	});
	keyGetframes = this.anims.generateFrameNames('obstacleatlas', {
		prefix: 'key',
		start: 1,
		end: 1
	});
	respawnFrames = this.anims.generateFrameNames('shooterrespawn', {
		prefix: 'rsp',
		start: 0,
		end: 29
	});
	crash1frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'a',
		start: 0,
		end: 1
	});
	crash2frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'b',
		start: 0,
		end: 1
	});
	crash3frames = this.anims.generateFrameNames('shooteratlas', {
		prefix: 'c',
		start: 0,
		end: 1
	});
	csPolygon = new Phaser.Geom.Polygon([3, 375, 53, 351, 28, 397, 35.78947448730469, 31, 28, 2, 53, 23, 35.78947448730469, 31, 3, 47, 28, 2, 36, 359, 20, 366, 19.157894134521484, 39.210540771484375, 35.78947448730469, 31, 36, 359, 3, 375, 20, 366]);
	var sqPolygon = new Phaser.Geom.Polygon([242, 1, 448, 98, 207, 211, 3, 114]);

	couchFrames = this.anims.generateFrameNames('couchatlas', {
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


	var cardPolygon = new Phaser.Geom.Polygon([46, 95, 120, 130, 73, 150, 1, 117]);
	var flipArray = [0, flip1, flip2, flip3, flip4, flip5, flip6];
	// !right room
	lampFrames = this.anims.generateFrameNames('wobble', {
		start: 0,
		end: 59,
		zeroPad: 2
	});
	lampPolygon = new Phaser.Geom.Polygon([68, 126, 49, 105, 69, 19, 109, 0, 150, 19, 170, 106, 150, 127, 143, 207, 109, 220, 79, 207, 68, 126]);
	holesPolygon = new Phaser.Geom.Polygon([814, 174, 812, 112, 845, 72, 875, 80, 877, 143, 1210, 78, 1210, 16, 1231, 3, 1272, 40, 1273, 108, 1210, 78, 877, 143, 814, 174]);
	holesFrames = this.anims.generateFrameNames('holesatlas', {
		prefix: 'holes',
		start: 0,
		end: 89,

	});
	// !create sprites
	// !universal
	//var bg = this.add.sprite(0, 0, 'room').setOrigin(0).setScale(0.5);
	var bgL = this.add.sprite(0, 0, 'roomL').setOrigin(0).setScale(0.5).setInteractive();
	var bgM = this.add.sprite(800, 0, 'roomM').setOrigin(0).setScale(0.5).setAlpha(0);
	var bgR = this.add.sprite(1600, 0, 'roomR').setOrigin(0).setScale(0.5);
	//var logo = this.add.sprite(860, -130, 'logo').setOrigin(0).setScale(0.5);
	var cursor = this.add.sprite(1200, -170, 'logo').setScale(0.5).setInteractive();
	var leftButton = this.add.sprite(10, 382, 'left').setOrigin(0).setInteractive();
	var rightButton = this.add.sprite(754, 382, 'right').setOrigin(0).setInteractive();
	var invKey = this.add.sprite(10, -80, 'obstacleatlas', 'key1').setOrigin(0).setScale(0.5).setInteractive();
	invKey.alpha = 0;
	// !left room
	var sizePoster = this.add.sprite(378, 442, 'sizeposteratlas', 'sizeposter0').setOrigin(0).setScale(0.5).setInteractive(sizePosterPolygon, Phaser.Geom.Polygon.Contains);
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
	door = this.add.sprite(164, 493, 'dooratlas', '0').setOrigin(0).setScale(0.5).setInteractive(doorKnobPolygon, Phaser.Geom.Polygon.Contains);
	var doorQuips = [
		['I think I left my key', 'in deep space.'],
		['I said, I think I left my key', 'in deep space.'],
		['The door is locked.', 'Find the key.'],
		['How did I lock', 'myself inside?']
	];
	doorText = this.add.text(0, 0, doorQuips[0], {
		fontFamily: 'Arial',
		fontSize: 18,
		color: '#225a89',
	}).setOrigin(0);
	frontPlant = this.add.sprite(0, 1020, 'plantcycleatlas', '0').setOrigin(0).setInteractive(frontPlantPolygon, Phaser.Geom.Polygon.Contains).setScale(0.5);
	var chooser = this.add.sprite(0, 0, 'chooser').setOrigin(0).setScale(0.5).setInteractive();
	chooserBg = this.add.sprite(10, 10, 'pages', 'page' + chooserStats.page[chooserStats.currentPage].index).setOrigin(0).setScale(0.5);
	var caption = this.add.text(20, 320, ['Wow, its beautiful outside!', 'Where are we going?'], {
		fontFamily: 'Arial',
		fontSize: 36,
		color: '#225a89'
	}).setOrigin(0);
	var redButton = this.add.sprite(460, 338, 'redbutton').setOrigin(0).setScale(0.5).setInteractive();
	var greenButton = this.add.sprite(460, 413, 'greenbutton').setOrigin(0).setScale(0.5).setInteractive();
	var redText = this.add.text(520.5, 362, 'never', {
		fontFamily: 'Arial',
		fontSize: 30,
		color: '#ffffff'
	}).setOrigin(0.5).setText(chooserStats.page[chooserStats.currentPage].optA);
	greenText = this.add.text(520.5, 438, 'never', {
		fontFamily: 'Arial',
		fontSize: 30,
		color: '#ffffff'
	}).setOrigin(0.5).setText(chooserStats.page[chooserStats.currentPage].optB);
	var mug1 = this.add.sprite(616, 1150, 'mugatlas', 'mug1').setOrigin(0).setScale(0.5).setInteractive();
	mug1.pos = 1;
	// !middle room
	var mug2 = this.add.sprite(1278, 797, 'mugatlas', 'mug3').setOrigin(0).setScale(0.5).setInteractive();
	mug2.pos = 3;
	var mug3 = this.add.sprite(1461, 826, 'mugatlas', 'mug7').setOrigin(0).setScale(0.5).setInteractive();
	mug3.pos = 7;
	card1a = this.add.sprite(1125, 934, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1).setScale(0.5);
	card1b = this.add.sprite(1160, 916, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1).setScale(0.5);
	card1c = this.add.sprite(1196, 898, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1).setScale(0.5);
	card1d = this.add.sprite(1232, 880, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(1).setScale(0.5);
	card2a = this.add.sprite(1170, 955, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2).setScale(0.5);
	card2b = this.add.sprite(1206, 937, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2).setScale(0.5);
	card2c = this.add.sprite(1242, 919, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2).setScale(0.5);
	card2d = this.add.sprite(1278, 901, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(2).setScale(0.5);
	card3a = this.add.sprite(1216, 976, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3).setScale(0.5);
	card3b = this.add.sprite(1252, 958, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3).setScale(0.5);
	card3c = this.add.sprite(1288, 940, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3).setScale(0.5);
	card3d = this.add.sprite(1324, 922, 'cardatlas', 'flipstart00').setOrigin(0).setInteractive(cardPolygon, Phaser.Geom.Polygon.Contains).setDepth(3).setScale(0.5);
	//shooter 
	var score = this.add.text(1600, 220, '0', {
		fontFamily: 'magistral',
		fontSize: 64,
		color: '#ffffff'
	}).setOrigin(1, 0);
	controlStrip = this.add.sprite(1292, 260, 'shooteratlas', 'cs00').setOrigin(0).setScale(0.5).setInteractive();
	var shooterBg = this.add.sprite(1388, 323, 'flyatlas', '0').setOrigin(0).setScale(0.5);
	pane1 = this.add.sprite(1388, 323, 'obstacleatlas', '0').setOrigin(0).setScale(0.5);
	pane2 = this.add.sprite(1456, 355, 'obstacleatlas', '0').setOrigin(0).setScale(0.5);
	pane3 = this.add.sprite(1525, 387, 'obstacleatlas', Math.floor(Math.random() * 12) + 1).setOrigin(0).setScale(0.5);

	p1 = this.add.sprite(1388, 323, 'shooteratlas', '02').setOrigin(0).setScale(0.5);

	var bgCouch = this.add.sprite(834, 621, 'bgcouch').setOrigin(0).setScale(0.5);
	var couch = this.add.sprite(863, 696, 'couchatlas', 'couch000').setOrigin(0).setScale(0.5);
	var sq3 = this.add.sprite(1081, 662.5, 'sqatlas', 'w').setOrigin(0).setScale(0.5).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var sq2 = this.add.sprite(960, 718.5, 'sqatlas', 'w').setOrigin(0).setScale(0.5).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var sq1 = this.add.sprite(839, 775, 'sqatlas', 'w').setOrigin(0).setScale(0.5).setInteractive(sqPolygon, Phaser.Geom.Polygon.Contains);
	var arm = this.add.sprite(1303.7, 671, 'arm').setOrigin(0).setScale(0.5);
	var side = this.add.sprite(833.5, 805.5, 'side').setOrigin(0).setScale(0.5);
	// !right room
	// create books
	spines = {

		"book1": [{
			"shape": [22, 43, 22, 164, 3, 154, 2, 33]
		}],
		"book2": [{
			"shape": [22, 50, 22, 144, 2, 135, 2, 40]
		}],
		"book3": [{
			"shape": [1, 146, 1, 36, 22, 45, 23, 155]
		}],
		"book4": [{
			"shape": [22, 42, 22, 164, 1, 153, 1, 32]
		}],
		"book5": [{
			"shape": [22, 43, 22, 163, 3, 154, 2, 32]
		}],
		"book6": [{
			"shape": [3, 135, 3, 41, 22, 50, 22, 145]
		}],
		"book7": [{
			"shape": [22, 45, 22, 157, 2, 148, 2, 35]
		}],
		"book8": [{
			"shape": [22, 43, 21, 163, 1, 154, 1, 33]
		}],
		"book9": [{
			"shape": [21, 50, 22, 144, 2, 136, 1, 42]
		}],
		"book10": [{
			"shape": [16, 43, 16, 172, 1, 167, 1, 36]
		}],
		"book11": [{
			"shape": [22, 42, 22, 156, 1, 147, 1, 33]
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

	bottomShelf = this.add.sprite(2082, 332, 'bookatlas', 'shelf').setOrigin(0);
	book5 = this.add.sprite(2123, 217, 'bookatlas', 'book5').setOrigin(0).setInteractive(book5polygon, Phaser.Geom.Polygon.Contains);
	book6 = this.add.sprite(2132, 255, 'bookatlas', 'book6').setOrigin(0).setInteractive(book6polygon, Phaser.Geom.Polygon.Contains);
	book7 = this.add.sprite(2169, 251, 'bookatlas', 'book7').setOrigin(0).setInteractive(book7polygon, Phaser.Geom.Polygon.Contains);
	book8 = this.add.sprite(2208, 267, 'bookatlas', 'book8').setOrigin(0).setInteractive(book8polygon, Phaser.Geom.Polygon.Contains);
	book9 = this.add.sprite(2218, 295, 'bookatlas', 'book9').setOrigin(0).setInteractive(book9polygon, Phaser.Geom.Polygon.Contains);
	book10 = this.add.sprite(2254, 273, 'bookatlas', 'book10').setOrigin(0).setInteractive(book10polygon, Phaser.Geom.Polygon.Contains);
	book11 = this.add.sprite(2282, 300, 'bookatlas', 'book11').setOrigin(0).setInteractive();
	topShelf = this.add.sprite(2082, 162, 'bookatlas', 'shelf').setOrigin(0);
	book1 = this.add.sprite(2134, 53, 'bookatlas', 'book1').setOrigin(0).setInteractive(book1polygon, Phaser.Geom.Polygon.Contains);
	book2 = this.add.sprite(2143, 91, 'bookatlas', 'book2').setOrigin(0).setInteractive(book2polygon, Phaser.Geom.Polygon.Contains);
	book3 = this.add.sprite(2180, 86, 'bookatlas', 'book3').setOrigin(0).setInteractive(book3polygon, Phaser.Geom.Polygon.Contains);
	book4 = this.add.sprite(2210, 90, 'bookatlas', 'book4').setOrigin(0).setInteractive();
	shelfPlant = this.add.sprite(2220, 67, 'shelfplantimg').setOrigin(0).setInteractive();
	var tableLegs = this.add.sprite(1637, 656, 'tablelegs').setOrigin(0).setScale(0.5);
	var mouseHoles = this.add.sprite(1626, 502, 'holesatlas', 'holes0').setOrigin(0).setScale(0.5).setInteractive(holesPolygon, Phaser.Geom.Polygon.Contains);
	var topLeg = this.add.sprite(1860, 667, 'topleg').setOrigin(0).setScale(0.5);
	var tableTop = this.add.sprite(1626, 537, 'tabletop').setOrigin(0).setScale(0.5);
	lamp = this.add.sprite(1600, 385, 'wobble', '00').setOrigin(0).setInteractive(lampPolygon, Phaser.Geom.Polygon.Contains);
	var mug4 = this.add.sprite(1835, 578, 'mugatlas', 'mug6').setOrigin(0).setScale(0.5).setInteractive();
	mug4.pos = 6;
	// !create sounds
	var wobbleSound = this.sound.add('wobblesound');
	// left room
	shootSong = this.sound.add('shootloop');
	shootSong.loop = true;
	shootSong.volume = 0.2;
	// middle room
	// right room
	chime1 = this.sound.add('chime1');
	var chime2 = this.sound.add('chime2');
	var chime3 = this.sound.add('chime3');
	var chime4 = this.sound.add('chime4');
	var chime5 = this.sound.add('chime5');
	var chime6 = this.sound.add('chime6');
	var chime7 = this.sound.add('chime7');
	var chime8 = this.sound.add('chime8');
	var chime0 = this.sound.add('chime0');
	chime1.volume = 0.2;
	chime2.volume = 0.2;
	chime3.volume = 0.2;
	chime4.volume = 0.2;
	chime5.volume = 0.2;
	chime6.volume = 0.2;
	chime7.volume = 0.2;
	chime8.volume = 0.2;
	chime0.volume = 0.2;
	var chimes = [chime1, chime2, chime3, chime4, chime5, chime6, chime7, chime8, chime0];
	// !create animations
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
		topLeftX: cropGrid.p9.x,
		topLeftY: cropGrid.p9.y,
		topRightY: cropGrid.p8.y,
		bottomLeftX: cropGrid.p6.x,
		bottomLeftY: cropGrid.p6.y,

		onComplete: function() {
			sizePosterSize1.pause();
		},
		onUpdate: function() {
			doVerts();
		}
	});
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
	var doorOpen = this.anims.create({
		key: 'doorclose',
		frames: doorCloseFrames,
		frameRate: 15
	});
	for (var i = 1; i < 7; i++) {
		this.anims.create({
			key: 'plantcycle' + i,
			frames: plantCycleArray[i],
			frameRate: 30
		});
	}
	chooserTweenUp = this.tweens.add({
		targets: [chooser, chooserBg, caption, redButton, greenButton, redText, greenText],
		x: '+=0',
		y: '-=680',
		duration: 750,
		repeat: 0,
		paused: true,
		onComplete: function() {
			chooserTweenUp.pause();
			chooserStats.up = true;
		}
	});
	chooserTweenDownPrep = this.tweens.add({
		targets: [chooser, chooserBg, caption, redButton, greenButton, redText, greenText],
		x: '+=0',
		y: '-=50',
		duration: 150,
		repeat: 0,
		paused: true,
		onComplete: function() {
			chooserTweenDownPrep.pause();
			chooserTweenDown.resume();
		}
	});
	var chooserTweenDown = this.tweens.add({
		targets: [chooser, chooserBg, caption, redButton, greenButton, redText, greenText],
		x: '+=0',
		y: '+=730',
		duration: 600,
		repeat: 0,
		paused: true,
		onComplete: function() {
			chooserTweenDown.pause();
			chooserStats.up = false;
			door.anims.play('doorclose');
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
	obstacles = ['obstacle0', 'obstacleA', 'obstacleB', 'obstacleC', 'obstacleD', 'obstacleE', 'obstacleF'];
	this.anims.create({
		key: 'up1',
		frames: u1Frames,
		frameRate: 10
	});
	this.anims.create({
		key: 'up2',
		frames: u2Frames,
		frameRate: 10
	});
	this.anims.create({
		key: 'down1',
		frames: d1Frames,
		frameRate: 10
	});
	this.anims.create({
		key: 'down2',
		frames: d2Frames,
		frameRate: 10
	});
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
	keyGetTween = this.tweens.add({
		targets: [invKey],
		alpha: 1,
		duration: 1000,
		ease: 'Power2',
		repeat: 0,
		paused: true
	});



	var sq1Tween = this.tweens.add({
		targets: [sq1],
		y: '-=150',
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
		y: '+=150',
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
		y: '-=150',
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
		y: '+=150',
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
		y: '-=150',
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
		y: '+=150',
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
	// !right room
	this.anims.create({
		key: 'lampwobble',
		frames: lampFrames,
		frameRate: 30
	});
	var book1tween = this.tweens.add({
		targets: [book1],
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book3tween.pause();
		}
	});

	var book5tween = this.tweens.add({
		targets: [book5],
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
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
		x: '-=103',
		y: '+=48',
		duration: 1000,
		yoyo: true,
		ease: 'Power2',
		repeat: -1,
		paused: true,
		onRepeat: function() {
			book10tween.pause();
		}
	});
	this.anims.create({
		key: 'mousehole',
		frames: holesFrames,
		framerate: 30,
		repeat: 0,
	});

	_anims = this.anims;

/*for (i = 0; i < 15; i++) {
		console.log(i);
		_anims.anims.entries.crash1.addFrame(crash1frames);
		_anims.anims.entries.crash2.addFrame(crash2frames);
		_anims.anims.entries.crash3.addFrame(crash3frames);
	}
	_anims.anims.entries.crash1.addFrame(respawnFrames);
	_anims.anims.entries.crash2.addFrame(respawnFrames);
	_anims.anims.entries.crash3.addFrame(respawnFrames);*/
	// !create interactions
/*this.input.on('pointerdown', function (pointer) {

        var child = this.children.getAt(0);


        this.children.bringToTop(child);

    }, this);*/
	// !universal
	cursor.on('pointerdown', function() {
		//context = new AudioContext();
		context.resume();
		console.log(context);
		game.sound.play('chime8');
		tween = this.tweens.add({
			targets: [cursor],
			y: 623,
			alpha: 0,
			duration: 1750,
			repeat: 0
		});
		bgShow = this.tweens.add({
			targets: [bgM],
			alpha: 1,
			duration: 1000,
			repeat: 0
		});
		
		
		
	}, this);
	leftButton.on('pointerdown', function() {
		//this.input.stopPropagation();
		if (currentRoom == 1) {
			currentRoom = 0;
			leftButton.alpha = 0;
			tween = this.tweens.add({
				targets: [uiContainer],
				x: 0,
				y: 510,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cursor],
				x: 400,
				y: 850,
				duration: 750,
				repeat: 0
			});
		}
		if (currentRoom == 2) {
			currentRoom = 1;
			rightButton.alpha = 1;
			tween = this.tweens.add({
				targets: [uiContainer],
				x: 800,
				y: 283,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cursor],
				x: 1200,
				y: 623,
				duration: 750,
				repeat: 0
			});
		}
	}, this);
	rightButton.on('pointerdown', function() {
		//this.input.stopPropagation();
		if (currentRoom == 1) {
			currentRoom = 2;
			rightButton.alpha = 0;
			tween = this.tweens.add({
				targets: [uiContainer],
				x: 1600,
				y: 60,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cursor],
				x: 2000,
				y: 400,
				duration: 750,
				repeat: 0
			});
		}
		if (currentRoom === 0) {
			currentRoom = 1;
			leftButton.alpha = 1;
			tween = this.tweens.add({
				targets: [uiContainer],
				x: 800,
				y: 283,
				duration: 750,
				repeat: 0
			});
			tween2 = this.tweens.add({
				targets: [cursor],
				x: 1200,
				y: 623,
				duration: 750,
				repeat: 0
			});
			if (chooserStats.up) {
				chooserTweenDownPrep.resume();
			}
		}
	}, this);

	// !left room
/*sizePoster.on('pointerover', function(pointer) {

		if (sizePoster.anims.isPlaying === false) {
			sizePoster.anims.play('sizeposter');
		} else {
			sizePoster.anims.resume();
		}

	});
	sizePoster.on('pointerout', function(pointer) {

		sizePoster.anims.pause();

	});*/
	sizePoster.on('pointerdown', function(pointer) {
		if (nextSize == 10) {
			nextSize = 1;
		}
		sizeTweens[nextSize].resume();
		nextSize++;
	});
	door.on('pointerdown', function(pointer) {

		if (chooserStats.up === false && keyGot === true) {
			chooserTweenUp.resume();
			door.anims.play('dooropen');
			invKey.alpha = 0;
		} else {
			doorText.x = 335;
			doorText.y = 715;
			setTimeout(function() {
				doorText.x = 0;
				doorText.y = 0;
				doorClicks++;
				if (doorClicks <= 3) {
					doorText.setText(doorQuips[doorClicks]);
				} else {
					doorClicks = 0;
					doorText.setText(doorQuips[doorClicks]);
				}
			}, 3000)

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
		
	mug1.on('pointerdown', function(){
		p=mug1.pos;
		if(p<8){
			p++;
		} else {
			p=1;
		}
		mug1.pos=p;
		mug1.setFrame('mug'+p);
	});
	mug2.on('pointerdown', function(){
		p=mug2.pos;
		if(p<8){
			p++;
		} else {
			p=1;
		}
		mug2.pos=p;
		mug2.setFrame('mug'+p);
	});
	mug3.on('pointerdown', function(){
		p=mug3.pos;
		if(p<8){
			p++;
		} else {
			p=1;
		}
		mug3.pos=p;
		mug3.setFrame('mug'+p);
	});
	mug4.on('pointerdown', function(){
		p=mug4.pos;
		if(p<8){
			p++;
		} else {
			p=1;
		}
		mug4.pos=p;
		mug4.setFrame('mug'+p);
	});
	
	// !chooser
	this.input.setTopOnly(true);
	redButton.on('pointerdown', function() {
		chooserStats.currentPage = chooserStats.page[chooserStats.currentPage].linkA;
		chooserBg.setFrame('page' + chooserStats.page[chooserStats.currentPage].index);
		caption.setText(chooserStats.page[chooserStats.currentPage].caption);
		redText.setText(chooserStats.page[chooserStats.currentPage].optA);
		greenText.setText(chooserStats.page[chooserStats.currentPage].optB);
	}, this);
	greenButton.on('pointerdown', function() {
		chooserStats.currentPage = chooserStats.page[chooserStats.currentPage].linkB;
		chooserBg.setFrame('page' + chooserStats.page[chooserStats.currentPage].index);
		caption.setText(chooserStats.page[chooserStats.currentPage].caption);
		redText.setText(chooserStats.page[chooserStats.currentPage].optA);
		greenText.setText(chooserStats.page[chooserStats.currentPage].optB);
	}, this);
	bgL.on('pointerdown', function(pointer) {
		if (chooserStats.up) {
			console.log('dddd');
			chooserTweenDownPrep.resume();
		}
	}, this);
	// !middle room

	sq1.on('pointerdown', function() {

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
	var cardFlip = function(x) {
			cardContainer.bringToTop(x);
			//x.anims.play('flip'+(Math.floor(Math.random() * (1)) + 1).toString());
			//wobbleSound.play();
			if (x.flipped !== true) {

				x.flipped = true;
				if (firstCard == null) {
					firstCard = x.face;
					firstFlip = x;
					x.anims.play('flip' + x.face);
				} else {
					cardContainer.list.forEach(function(e) {
						e.input.enabled = false;
					});
					secondCard = x.face;
					x.anims.play('flip' + x.face);
					if (firstCard == secondCard) {
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
								if (confirm("Song for you!")) {
									openExternalLink('https://www.youtube.com/watch?v=Y5KMl11I7Zs');
								}
							}, 8000);
							flipOrder.forEach(function(e) {
								totalFlipped -= 0.5;
								setTimeout(function() {
									cardContainer.bringToTop(e);
									e.anims.play('flipback');
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
			} else {
				//x.flipped=false;
				//x.anims.play('flipback');
			}
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
	controlStrip.on('pointerover', function(pointer) {

		if (shooterBg.anims.isPlaying === false) {
			controlStrip.setFrame('cs02');
		}

	});
	controlStrip.on('pointerout', function(pointer) {
		if (shooterBg.anims.isPlaying === false) {
			controlStrip.setFrame('cs00');
		}
	});
	controlStrip.on('pointerdown', function(pointer) {
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
			if (startY == null) {
				startY = pointer.position.y;
			}
			if (shipRespawning === false) {
				shooterTick++;
			}
			if (pane3.anims.currentAnim.key === 'obstacle0' && shooterTick == 4) {
				pane1.anims.play(pane2.anims.currentAnim.key);
				pane2.anims.play(pane3.anims.currentAnim.key);
				if (dodgeCounter >= 29 && !keySpawned && !keyGot) {
					console.log('I am make key get');
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
				score.setText(dodgeCounter);
				shooterTick = 0;
			} else if (pane3.anims.currentAnim != 'obstacle0' && pane3.anims.currentAnim != null && shooterTick == 4) {
				pane1.anims.play(pane2.anims.currentAnim.key);
				shooterTick = 0;
				if (shipRespawning === false) {
					dodgeCounter++;
				}
				score.setText(dodgeCounter);
				score.setText(dodgeCounter);

				pane2.anims.play(pane3.anims.currentAnim.key);
				if (dodgeCounter == 30 && !keySpawned && !keyGot) {
					console.log('no I am make key get');
					pane3.anims.play('keyget');
					keySpawned = true;
				} else if (dodgeCounter == 32) {
					keyGetTween.resume();
				} else {
					pane3.play('obstacle0');
				}

			}

			// mouse movement stuff
			if (pointer.position.y - startY <= -50 && shipRespawning === false) {
				if (shipPos == 1) {
					p1.anims.play('up2');
					shipPos = 0;
				} else if (shipPos == 2) {
					p1.anims.play('up1');
					shipPos = 1;
				}
			} else if (pointer.position.y - startY >= 50 && shipRespawning === false) {
				if (shipPos === 0) {
					p1.anims.play('down1');
					shipPos = 1;
				} else if (shipPos == 1) {
					p1.anims.play('down2');
					shipPos = 2;
				}
			}

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

			if (startY != null) {
				startY = pointer.position.y;
			}
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
					if (keySpawned) {
						pane1.anims.play('obstacle0');
						pane2.anims.play('obstacle0');
						pane3.anims.play('obstacle0');
						keySpawned = false;
					}
					pane1.anims.pause();
					pane2.anims.pause();
					pane3.anims.pause();
					shootSong.pause();
					dodgeCounter = 0;
					score.setText(dodgeCounter);

					startY = null;
				};
			if (shipPos === 0 && collisionZone.a === true && shipRespawning === false) {
				killShip();
				p1.anims.play('crash1');
				shipPos = 1;
				shipRespawning = true;
			} else if (shipPos == 1 && collisionZone.b === true && shipRespawning === false) {
				killShip();
				p1.anims.play('crash2');
				shipRespawning = true;
			} else if (shipPos == 2 && collisionZone.c === true && shipRespawning === false) {
				killShip();
				p1.anims.play('crash3');
				shipPos = 1;
				shipRespawning = true;
			} else if (pane1.anims.currentAnim.key == 'keyget' && collisionZone.key === true && shipRespawning === false) {
				keyGot = true;
				keySpawned = false;
				keyGetTween.resume();
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
				if (pane2.anims.currentAnim == "keyget") {
					pane1.play('obstacle0');
				} else {
					pane1.play(pane2.anims.currentAnim.key);
				}
				pane2.anims.play(pane3.anims.currentAnim.key);
				pane2.anims.isPlaying = false;
				pane3.play('obstacle0');
				collisionZone = {
					a: false,
					b: false,
					c: false
				};
				if (pointer.isDown === true && shipRespawning === true) {
					if (pointer.x >= controlStrip.x - 800 && pointer.x < (controlStrip.x - 800 + controlStrip.width) && pointer.y >= controlStrip.y - 223 && pointer.y < (controlStrip.y - 223 + controlStrip.height)) {
						controlStrip.setFrame('cs02');
					} else {
						controlStrip.setFrame('cs00');
					}
					//console.log('I think mosue is down');
					//mouseCheck();
/*pane1.anims.resume();
					pane2.anims.resume();
					pane3.anims.resume();
					shooterBg.anims.resume();
					shootSong.play();*/
				}

			}
			shipRespawning = false;
		});

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

/*shelfPlant.on('pointerdown', function() {
		chime1.play();
		console.log(chime1.volume);
	}, this);*/

	sequence = function(x) {
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
						game.sound.play('chime8');
						book1tween.resume();
					} else if (bookChimes.indexOf(e) === 7) {
						book2tween.resume();
					} else if (bookChimes.indexOf(e) === 6) {
						book3tween.resume();
					} else if (bookChimes.indexOf(e) === 5) {
						game.sound.play('chime5');
						book5tween.resume();
					} else if (bookChimes.indexOf(e) === 4) {
						book6tween.resume();
					} else if (bookChimes.indexOf(e) === 3) {
						book7tween.resume();
					} else if (bookChimes.indexOf(e) === 2) {
						game.sound.play('chime3');
						book9tween.resume();
					} else if (bookChimes.indexOf(e) === 1) {
						book10tween.resume();
					} else if (bookChimes.indexOf(e) === 0) {
						book1tween.resume();
						book2tween.resume();
						book3tween.resume();
						book5tween.resume();
						book6tween.resume();
						book8tween.resume();
						book9tween.resume();
						book10tween.resume();
						game.sound.play('chime1');
						if (confirm("Song for you!")) {
							openExternalLink('https://www.youtube.com/watch?v=Y5KMl11I7Zs');
						} else {

						}

					}

/*tween = book1.tweens.add({
						targets: bookChimes[prevTone],
						x: '-=103',
						y: '+=48',
						duration: 1000,
						yoyo: true,
						ease: 'Power2',
					});*/
				}, (prevTone * 400));
				prevTone -= 1;
				console.log(prevTone);
			});
		} else {
			bookChimes[x].alpha = 1;
			bookChimes.forEach(function(e) {
				e.alpha = 1;
				e.input.enabled = true;
			});
			prevTone = 1;
			//console.log(prevTone + ' is one');
		}
	};

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
	mouseHoles.on('pointerdown', function() {
		this.anims.play('mousehole');
	});
	openExternalLink = function(url) {


		window.open(url);

	};
	// !create containers
	// universal
	var uiContainer = this.add.container(800, 283, [leftButton, rightButton, invKey]);
	// left room
	var chooseContainer = this.add.container(100, 1280, [chooser, chooserBg, caption, redButton, greenButton, redText, greenText]);
	var mugs = this.add.container(0, 0, [mug1, mug2, mug3]);
	
		/*for (i = 0; i < 3; i++) {
		mugs.list[i].on('pointerdown', function(x){
			console.log(mugs.list[i]);
			mugClick(mugs.list[i]);
		}, this);
	}*/
	// middle room
	var cardContainer = this.add.container(-15, -50, [card1a, card1b, card1c, card1d, card2a, card2b, card2c, card2d, card3a, card3b, card3c, card3d]);
	flipOrder = [card1a, card1b, card1c, card1d, card2a, card2b, card2c, card2d, card3a, card3b, card3c, card3d, card3d, card3c, card3b, card3a, card2d, card2c, card2b, card2a, card1d, card1c, card1b, card1a];
	for (i = 0; i < faces.length; i++) {
		cardContainer.list[i].face = faces[i];
	}
	// right room
	var booksContainer = this.add.container(0, 0, [bottomShelf, book5, book6, book7, book8, book9, book10, book11, topShelf, book1, book2, book3, book4, shelfPlant]);
	bookChimes = [book4, book6, book10, book5, book8, book3, book9, book2, book1];

	this.cameras.main.startFollow(cursor);


}

function update() {}