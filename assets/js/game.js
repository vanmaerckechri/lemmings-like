"use strict";

class Game
{
	constructor(maps, tileSizeOr)
	{
		this.maps = maps;
		this.screen = 
		{
			translateX: 0,
			translateY: 0,
			scale: 1
		}
		this.timeTempo = null;
		this.minutes = 0;
		this.secondes = 0;
	}

	// UI

	updateTimer(engineSpeed)
	{
		let speed = 1000 / engineSpeed;
		let timeTempo = this.timeTempo;
		this.timeTempo = Tools.countTime(this.timeTempo, speed);

		if (timeTempo != this.timeTempo)
		{
			this.secondes += 1;
			if (this.secondes >= 60)
			{
				this.secondes = 0;
				this.minutes += 1;
			}
			let sec = this.secondes < 10 ? "0" + this.secondes : this.secondes;
			let min = this.minutes < 10 ? "0" + this.minutes : this.minutes;

			let timerContent = document.getElementById('timer-content');
			timerContent.innerText = min + ":" + sec;
		}
	}

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

		let delta = event.deltaY || -event.wheelDelta || event.detail;

		if (delta > 0)
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

	drawMap()
	{
		let canvas = document.getElementById('canvas-bg');
		let ctx = canvas.getContext('2d');

		let tileSizeOr = this.maps.tileSizeOrigin;
		let tileRatio = this.maps.tileSizeCurrent / tileSizeOr;

		let map = this.maps['currentMap']['tiles'];

		for (let r = map.length - 1; r >= 0; r--)
		{
			if (map[r])
			{
				for (let c = map[r].length - 1; c >= 0; c--)
				{
					if (map[r][c] && map[r][c].objName)
					{
						let imgRow = map[r][c].imgRow;
						let imgCol = map[r][c].imgCol;

						let el = this.maps['elemInfos'][map[r][c].catName][map[r][c].objName];
						let img = el.img;

						let sX = imgCol * tileSizeOr;
						let sY = imgRow * tileSizeOr;
						let sW = tileSizeOr * el.colWidth;
						let sH = tileSizeOr * el.rowHeight;
						let dX = Math.ceil(c * tileSizeOr * tileRatio);
						let dY = Math.ceil(r * tileSizeOr * tileRatio);

 						ctx.drawImage(img, sX, sY, sW, sH, dX, dY, Math.ceil(sW * tileRatio), Math.ceil(sH * tileRatio));
					}
				}
			}
		}		
	}

	mainLoop(engineSpeed)
	{
		this.updateTimer(engineSpeed);
	}

	launchGame()
	{
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('hidden');

		this.maps['currentMap'] = JSON.parse(JSON.stringify(this.maps[this.maps.currentMapName]));
		this.drawMap();
	}
}