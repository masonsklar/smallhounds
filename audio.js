var game;
	var resizeFrame = function()
{
	if(game == undefined){
	// Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
	
	// Make div full height of browser and keep the ratio of game resolution
	let div			= document.getElementById('gameframe');
	div.style.width		= window.innerHeight + 'px';
	div.style.height	= window.innerHeight + 'px';
	
	// Check if device DPI messes up the width-height-ratio
	//let canvas			= document.getElementsByTagName('canvas')[0];
	
	let dpi_w	= parseInt(div.style.width) / div.width;
	let dpi_h	= parseInt(div.style.height) / div.height;		
	
	if (window.innerHeight <= window.innerWidth){
	var height	= window.innerHeight * 0.8;
	var width	= window.innerHeight * 0.8;
	
	} else if (window.innerHeight > window.innerWidth){
	var width	= window.innerWidth * 0.8;
	var height	= window.innerWidth * 0.8;
	}
	// Scale canvas	
	div.style.width	= width + 'px';
	div.style.height	= height + 'px';
	}
}
window.onload = function() {
	window.addEventListener('resize', resizeFrame);
  context = new AudioContext();
  resizeFrame();
  $('#gameframe').click(function(){
	 if(game == undefined){
	 context.resume();
	 game = new Phaser.Game(config);
	 }
  });
  }

	  
 