var game;
var idleData;
var loadAnim;
var resizeFrame = function() {
		if (game == undefined) {
			// Width-height-ratio of game resolution
			// Replace 360 with your game width, and replace 640 with your game height
			// Make div full height of browser and keep the ratio of game resolution
			let div = document.getElementById('gameframe');
			div.style.width = window.innerHeight + 'px';
			div.style.height = window.innerHeight + 'px';

			// Check if device DPI messes up the width-height-ratio
			//let canvas			= document.getElementsByTagName('canvas')[0];
			let dpi_w = parseInt(div.style.width) / div.width;
			let dpi_h = parseInt(div.style.height) / div.height;

			if (window.innerHeight <= window.innerWidth) {
				var height = window.innerHeight;
				var width = window.innerHeight;

			} else if (window.innerHeight > window.innerWidth) {
				var width = window.innerWidth;
				var height = window.innerWidth;
			}
			// Scale canvas	
			div.style.width = width + 'px';
			div.style.height = height + 'px';
		}
	}

function generateRandomNumber(x, y) {
	return Math.random() * (y - x) + x;
};

window.onload = function() {
	window.addEventListener('resize', resizeFrame);
	context = new AudioContext();
	resizeFrame();

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
		clearInterval(floatInterval);
		movers.forEach(function(e) {
			newX = generateRandomNumber(-800, 800);
			newY = generateRandomNumber(-800, 800);
			$(e).css({
				'transition':'all 0.5s',
				'transform': 'translate(' + newX + 'px,' + newY + 'px)',
				'opacity':'0'
			})
		});
		setTimeout(function(){
			movers.forEach(function(e) {
			$(e).css({
				'transform': 'translate(0px,0px)',
				'opacity':'1'
			})
		});
		}, 500)
		setTimeout(function(){
			if (game == undefined) {
			loadAnim.destroy();
			$('#gameframe').html('');
			context.resume();
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