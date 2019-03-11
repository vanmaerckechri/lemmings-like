"use strict";

class Game
{
	constructor()
	{
		this.x = 0;
		this.y = 0;
	}

	moveScreen(direction)
	{
		let canvasContainer = document.getElementById('canvas-container');
		let canvasContainerInfos = canvasContainer.getBoundingClientRect();

		let canvasBg = document.getElementById('canvas-bg');
		let canvasBgInfos = canvasBg.getBoundingClientRect();

		let gameSection = document.getElementById('game');
		let gameSectionInfos = gameSection.getBoundingClientRect();
/*
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;
*/		

		let speed = 100;

		if (direction == "moveUp")
		{
			this.y += speed;
			if (canvasContainerInfos.top + speed > 0)
			{
				this.y = 0;
			}
		}
		if (direction == "moveDown")
		{
			this.y -= speed;
			if (canvasContainerInfos.top - speed < gameSectionInfos.height - canvasBgInfos.height)
			{
				this.y = (gameSectionInfos.height - canvasBgInfos.height);
			}
		}
		else if (direction == "moveLeft")
		{
			this.x += speed;
			if (canvasContainerInfos.left + speed > 0)
			{
				this.x = 0;
			}
		}
		else if (direction == "moveRight")
		{
			this.x -= speed;
			if (canvasContainerInfos.left - speed < gameSectionInfos.width - canvasBgInfos.width)
			{
				this.x = (gameSectionInfos.width - canvasBgInfos.width);
			}
		}

		canvasContainer.style.transform = "translate(" + this.x + "px, " + this.y + "px)"
	}

	launchGame()
	{
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('softHidden');
	}
}