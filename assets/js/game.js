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

	moveScreen(direction)
	{
		let canvasContainer = document.getElementById('canvas-container');
		let canvasContainerInfos = canvasContainer.getBoundingClientRect();

		let canvasBg = document.getElementById('canvas-bg');
		let canvasBgInfos = canvasBg.getBoundingClientRect();

		let gameSection = document.getElementById('game');
		let gameSectionInfos = gameSection.getBoundingClientRect();

		let transform = this.screen;
/*
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;
*/		
		let speed = 100;

		// user can vertical move if image bg is smaller than game screen
		if (canvasBgInfos.height > canvasContainerInfos.height)
		{
			if (direction == "moveUp")
			{
				transform.translateY += speed;

				if (canvasContainerInfos.top + speed > 0)
				{
					transform.translateY = 0;
				}
			}
			else if (direction == "moveDown")
			{
				transform.translateY -= speed;

				if (canvasContainerInfos.top - speed < gameSectionInfos.height - canvasBgInfos.height)
				{
					transform.translateY = (gameSectionInfos.height - canvasBgInfos.height);
				}
			}
			canvasContainer.style.top = "";
		}
		// if not then vertical center on canvas-container;
		else
		{
			transform.translateY = -1 * canvasBgInfos.height / 2;
			canvasContainer.style.top = "50%";
		}

		// user can horizontal move if image bg is smaller than game screen
		if (canvasBgInfos.width > canvasContainerInfos.width)
		{
			if (direction == "moveLeft")
			{
				transform.translateX += speed;

				if (canvasContainerInfos.left + speed > 0)
				{
					transform.translateX = 0;
				}
			}
			else if (direction == "moveRight")
			{
				transform.translateX -= speed;

				if (canvasContainerInfos.left - speed < gameSectionInfos.width - canvasBgInfos.width)
				{
					transform.translateX = (gameSectionInfos.width - canvasBgInfos.width);
				}
			}
			canvasContainer.style.left = "";
		}
		// if not then horizontal center on canvas-container;
		else
		{
			transform.translateX = -1 * canvasBgInfos.width / 2;
			canvasContainer.style.left = "50%";
		}

		canvasContainer.style.transform = "translate(" + transform.translateX + "px, " + transform.translateY + "px) scale(" + transform.scale + ")"
	}

	launchGame()
	{
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('softHidden');
	}
}