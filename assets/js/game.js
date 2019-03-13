"use strict";

class Game
{
	constructor()
	{
		this.screen = 
		{
			translateX: 0,
			translateY: 0,
			scale: 1
		}
	}

	// UI

	updateScreen()
	{
		this.moveScreen("moveDown");
		this.moveScreen("moveRight");
		this.moveScreen("moveUp");
		this.moveScreen("moveLeft");
	}

	updateZoom(event)
	{
		let canvasContainer = document.getElementById('canvas-container');
		let transform = this.screen;

		if (event.detail == 3)
		{
			if (transform.scale > 1)
			{
				transform.scale -= 0.1;
			}
		}
		else
		{
			if (transform.scale < 3)
			{
				transform.scale += 0.1;
			}
		}
		canvasContainer.style.transform = "translate3d(" + transform.translateX + "px, " + transform.translateY + "px, 0) scale(" + transform.scale + ")";

		this.updateScreen();
	}

	moveScreen(direction)
	{
		let canvasContainer = document.getElementById('canvas-container');
		let canContWidth = canvasContainer.offsetWidth;
		let canContHeight = canvasContainer.offsetHeight;

		let gameSection = document.getElementById('game');
		//let gameSectionInfos = gameSection.getBoundingClientRect();

		let transform = this.screen;

/*
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;
*/		
		let speed = 100;

		if (direction == "moveUp")
		{
			let limit = ((canContHeight * transform.scale) - (canContHeight )) / 2;

			transform.translateY = transform.translateY + speed > limit ? limit : transform.translateY += speed;
		}
		else if (direction == "moveDown")
		{
			let limit = gameSection.offsetHeight - canContHeight - ((transform.scale - 1) * ( canContHeight / 2));

			transform.translateY = transform.translateY - speed < limit ? limit : transform.translateY -= speed;
		}


		if (direction == "moveLeft")
		{
			let limit = ((canContWidth * transform.scale) - (canContWidth )) / 2;

			transform.translateX = transform.translateX + speed > limit ? limit : transform.translateX += speed;
		}
		else if (direction == "moveRight")
		{
			let limit = gameSection.offsetWidth - canContWidth - ((transform.scale - 1) * ( canContWidth / 2));

			transform.translateX = transform.translateX - speed < limit ? limit : transform.translateX -= speed;
		}


		canvasContainer.style.transform = "translate3d(" + transform.translateX + "px, " + transform.translateY + "px, 0) scale(" + transform.scale + ")";
	}

	launchGame()
	{
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('softHidden');
	}
}