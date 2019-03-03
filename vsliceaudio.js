var game;
var idleData;
var loadAnim;

function generateRandomNumber(x, y) {
	return Math.random() * (y - x) + x;
};

window.onload = function() {

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
			game = new Phaser.Game(config);
		}	
		}, 1500)
		
	});


}