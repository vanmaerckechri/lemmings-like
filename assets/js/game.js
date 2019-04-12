"use strict";

class Game
{
	constructor(maps, tileSizeOr)
	{
		this.maps = maps;
		this.ants;
		this.screen = 
		{
			translateX: 0,
			translateY: 0,
			scale: 1
		}
		this.gameSpeed = 1;
		this.lastGameSpeed = 1;
		this.timeTempo = null;
		this.minutes = 0;
		this.secondes = 0;

		this.pauseTime = 0;
	}

	// UI

	updateTimer()
	{
		let speed = 1000 / this.gameSpeed;
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

	updateSpeedGame(direction)
	{
		let timePlay = document.getElementById('timePlay');
		let timePause = document.getElementById('timePause');

		let unPause = function(self)
		{
			if (timePause.classList.contains('hidden'))
			{
				timePlay.classList.add('hidden');
				timePause.classList.remove('hidden');

				self.ants['spawnTempo'] -= (self['pauseTime'] - new Date().getTime());
			}
		}

		let pause = function(self)
		{
			if (timePlay.classList.contains('hidden'))
			{
				timePlay.classList.remove('hidden');
				timePause.classList.add('hidden');

				self['pauseTime'] = new Date().getTime();
			}
		}

		if (direction == 1)
		{
			unPause();
			this.gameSpeed = this.gameSpeed < 3 ? this.gameSpeed += 0.5 : this.gameSpeed;
			this.lastGameSpeed = this.gameSpeed;
		}
		else if (direction == -1)
		{
			if (this.gameSpeed > 0)
			{
				this.gameSpeed -= 0.5;
				this.lastGameSpeed = this.gameSpeed;			
			}
		}
		else
		{
			let self = this;
			if (this.gameSpeed != 0)
			{
				pause(self);
				this.gameSpeed = 0;
			}
			else
			{
				unPause(self);
				this.gameSpeed = this.lastGameSpeed;
			}
		}

		let speed = this.gameSpeed.toFixed(1);
		let speedContent = document.getElementById('speed-content');
		speedContent.innerText = speed;
	}

	updateSpeedGameByButton(buttonClicked)
	{
		if (buttonClicked == "timeUp")
		{
			this.updateSpeedGame(1);
		}
		else if (buttonClicked == "timeDown")
		{
			this.updateSpeedGame(-1);
		}
		else if (buttonClicked == "timePause" || buttonClicked == "timePlay")
		{
			this.updateSpeedGame(0);
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

		let zoomContent = document.getElementById('zoom-content');
		zoomContent.innerText = Math.round(transform.scale * 100);
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
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let tileSizeOr = this.maps.tileSizeOrigin;
		let tileSizeCur = this.maps.tileSizeCurrent;

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


						let dX = c * tileSizeCur;
						let dY = r * tileSizeCur;
						let dW = tileSizeCur * el.colWidth;
						let dH = tileSizeCur * el.rowHeight;

						ctx.imageSmoothingEnabled  = false;
 						ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
					}
				}
			}
		}
	}

	mainLoop()
	{
		this.updateTimer(this.gameSpeed);
		this.ants.mainLoop(this.gameSpeed);
	}

	loadTimeSpeedIcons()
	{
		let gameSpeed = document.getElementById('gameSpeedIcons');
		let icons = this.maps['commonElem']['elemsList']['gameSpeedIcons'];
		for (let i = 0, iLength = icons.length; i < iLength; i++)
		{
			let imgContainer = document.createElement('div');
			imgContainer.setAttribute('id', icons[i]);
			imgContainer.setAttribute('class', "img-container");

			imgContainer.addEventListener('click', ()=>
			{
				this.updateSpeedGameByButton(icons[i]);
			})

			if (icons[i] == "timePlay")
			{
				imgContainer.classList.add('hidden');
			}

			let img = this.maps['elemInfos']['gameSpeedIcons'][icons[i]].img;

			imgContainer.appendChild(img);
			gameSpeed.appendChild(imgContainer);
		}
	}

	launchGame()
	{
		// move fps display
		let topContainer = document.getElementById('top-container');
		let fpsContainer = document.getElementById('fps-container');
		topContainer.insertBefore(fpsContainer, topContainer.firstChild)

		this.maps['currentMap']['collisions'] = Collisions.init(this.maps, "canvas-bg");

		this.loadTimeSpeedIcons();

		this.ants = new Ants(this.maps);
	}

	loadMap()
	{
		// unhide game section
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('hidden');
		// importMap
		this.maps['currentMap'] = JSON.parse(JSON.stringify(this.maps[this.maps.currentMapName]));
	}
}