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

	updateAliveSaved()
	{
		let saved = document.getElementById('saved');
		let alive = document.getElementById('alive');

		saved.innerText = this.maps['currentMap'].savedLength;
		alive.innerText = this.maps['currentMap'].antsLength - this.maps['currentMap'].deletedAntsLength;
	}

	resetTimer()
	{
		this.gameSpeed = 1;
		this.lastGameSpeed = 1;
		this.timeTempo = null;
		this.minutes = 0;
		this.secondes = 0;
		this.pauseTime = 0;

		let timerContent = document.getElementById('timer-content');
		timerContent.innerText = 0 + ":" + 0;

		let speedContent = document.getElementById('speed-content');
		speedContent.innerText = "1.0";
	}

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
			let self = this;
			unPause(self);
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
					if (map[r][c] && map[r][c].catName && map[r][c].catName != "interactive")
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

	loadNextMap(mapIndex)
	{
		let mapName = mapIndex >= 10 ? "map" + mapIndex : "map0" + mapIndex;
		if (this.maps[mapName])
		{
			this.maps['currentMapName'] = mapName;
			this.maps['currentMap'] = JSON.parse(JSON.stringify(this.maps[mapName]));

			let imgMapInfos = this.maps["currentMap"]['elemsList'];

			Imgs.preloadImgs(this.maps, [imgMapInfos], () =>
			{
				this.drawMap();
				this.launchGame();
			});
		}
		else
		{
			alert("Game is in dev! No more maps for moment. TY to have play.");
		}
	}

	checkEndGame()
	{
		if (this.maps && this.maps['currentMap'])
		{
			let map = this.maps['currentMap'];

			if (map.antsLength == map.deletedAntsLength)
			{

				this.stopGame();

				let outroCont = document.getElementById('outro-container');
				let result = document.getElementById('outro-result');
				let details = document.getElementById('outro-details');

				let leaveBtn = document.getElementById('outro-leave');
				let restartBtn = document.getElementById('outro-restart');
				let nextMapBtn = document.getElementById('outro-nextMap');

				let closeOutro = function()
				{
					leaveBtn.onclick = null;
					restartBtn.onclick = null;
					nextMapBtn.onclick = null;

					outroCont.classList.add('hidden');
				}

				leaveBtn.onclick = () =>
				{
					location.reload();
				}

				restartBtn.onclick = () =>
				{
					closeOutro();
					this.loadNextMap(map.index);
				}

				outroCont.classList.remove('hidden');

				if (map.savedLength >= map.intro.rules)
				{
					//win
					result.innerText = "Congratulations!";
					let detailsText = map.savedLength > 1 ? map.savedLength + " bots." : map.savedLength + " bot.";
					details.innerText = detailsText;

					nextMapBtn.classList.remove('hidden');

					nextMapBtn.onclick = () =>
					{
						closeOutro();
						this.loadNextMap(map.index + 1);
					}
				}
				else
				{
					//defeat

					result.innerText = "Defeat!";
					let detailsText = map.savedLength > 1 ? map.savedLength + " bots." : map.savedLength + " bot.";
					details.innerText = detailsText;
				}
			}
		}
	}

	mainLoop()
	{
		this.updateTimer(this.gameSpeed);
		if (this.ants)
		{
			this.ants.mainLoop(this.gameSpeed);
			this.updateAliveSaved();
			this.checkEndGame();
		}
	}

	loadTimeSpeedIcons()
	{
		let gameSpeed = document.getElementById('gameSpeedIcons');
		let icons = this.maps['commonElem']['elemsList']['gameSpeedIcons'];
		for (let i = 0, iLength = icons.length; i < iLength; i++)
		{
			if (!document.getElementById(icons[i]))
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
	}

	loadMapIntro(launch)
	{
		if (this.maps['currentMap']['intro'])
		{
			let map = this.maps['currentMap'];
			let introNfo = map['intro'];
			let introCont = document.getElementById('intro-container');
			let mapName = document.getElementById('mapName');
			let mapRulesAntsToSave = document.getElementById('mapRules-antsToSave');
			let mapRulesAntsLength = document.getElementById('mapRules-antsLength');
			let mapTips = document.getElementById('mapTips');
			let launchGameBtn = document.getElementById('launchGame');

			mapName.innerText = introNfo.map;
			mapRulesAntsToSave.innerText = introNfo.rules;
			mapRulesAntsLength.innerText = map.antsLength;
			mapTips.innerText = introNfo.tips;
			introCont.classList.remove('hidden');
			launchGameBtn.onclick = () => 
			{
				introCont.classList.add('hidden');
				launchGameBtn.onclick = null;
				launch();
			}
		}
		else
		{
			launch();
		}
	}

	launchGame()
	{
		this.loadMapIntro(() => 
		{
			// move fps display
			let topContainer = document.getElementById('top-container');
			let fpsContainer = document.getElementById('fps-container');
			topContainer.insertBefore(fpsContainer, topContainer.firstChild)

			this.loadTimeSpeedIcons();
			this.ants = new Ants(this.maps);
			this.maps['currentMap']['collisions'] = Collisions.init(this.maps, "canvas-bg");
			this.resetTimer();
			this.updateAliveSaved();
		})
	}

	loadMap()
	{
		// unhide game section
		let gameSection = document.getElementById('game');
		gameSection.classList.remove('hidden');
		// importMap
		this.maps['currentMap'] = JSON.parse(JSON.stringify(this.maps[this.maps.currentMapName]));
	}

	stopGame()
	{
		let gameUi = document.getElementById('game-ui');
		let canvas = document.querySelectorAll('canvas');

		gameUi.classList.add('hidden');

		for (let c = canvas.length - 1; c >= 0; c--)
		{
			let ctx = canvas[c].getContext('2d');
			canvas[c].width = canvas[c].width;
		}

		this.ants.deleteGameIcons();
		this.ants = null;
	}
}