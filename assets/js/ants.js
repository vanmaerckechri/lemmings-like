"use strict";

class Ants
{
	constructor(maps)
	{
		this.mouseX;
		this.mouseY;

		this.spawn = 
		{
			x: 0,
			y: 0
		};
		this.exit = 
		{
			x: 0,
			y: 0
		};

		this.antsSpawned = 0;
		this.spawnTempo = null;

		this.selectedAction = null;
		this.selectedAnt = null;

		this.ants = [];
		this.maps = maps;

		this.particles = new Particles(maps);

		this.init()
	}

	createAnt()
	{
		let ant =
		{
			animationTempo: null,
			direction: 1,
			speed: 1,
			x: this.spawn.x,
			y: this.spawn.y,
			w: 32,
			h: 32,
			fallStartY: 0,
			imgIndex: 0,
			role: null, 
			status: 'spawn'
		}
		this.ants.push(ant);
	}

	getAnimationType(ant)
	{
		let status = ant.status
		if (status == "spawn")
		{
			return "spawn";
		}
		else if (status == "walk" || status == "fall")
		{
			if (!ant.role)
			{
				return ant.status
			}
			else if (ant.role == "suicide")
			{
				return ant.role;
			}
			else
			{
				let animation = ant.role + status.charAt(0).toUpperCase() + status.substring(1).toLowerCase();
				return animation;
			}
		}
		else
		{
			return ant.role;
		}
	}

	draw(ant, engineSpeed, pauseLength)
	{
		let canvas = document.getElementById('canvas-ant');
		let ctx = canvas.getContext('2d');
		let tileSizeOrigin = this.maps.tileSizeOrigin;
		let tileRatio = this.maps.tileSizeCurrent / tileSizeOrigin

		let currentAnim = this.getAnimationType(ant);

		let sX = ant.w * ant.imgIndex;
		let sY = ant.status == "walk" && ant.direction < 0 ? tileSizeOrigin : 0;
		let dX = ant.x * tileRatio;
		let dY = ant.y * tileRatio;
		let dW = this.maps.tileSizeCurrent * this.maps['elemInfos']['ants'][currentAnim]['colWidth'];
		let dH = this.maps.tileSizeCurrent * this.maps['elemInfos']['ants'][currentAnim]['rowHeight'];

		let img = this.maps['elemInfos']['ants'][currentAnim]['img'];
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(img, sX, sY, ant.w, ant.h, dX, dY, dW, dH);

		let speed = 100 / engineSpeed;
		ant.animationTempo -= pauseLength;
		let animationTempo = ant.animationTempo;
		ant.animationTempo = Tools.countTime(ant.animationTempo, speed);
		if (animationTempo != ant.animationTempo)
		{
			ant.imgIndex = ant.imgIndex < img.width / ant.w - 1 ? ant.imgIndex + 1 : 0;
		}

		if (currentAnim == "suicide" && ant.imgIndex == img.width / ant.w - 1)
		{
			this.suicide(ant);
		}

		// for selected ant
		if (this.selectedAnt && this.selectedAnt == ant)
		{
			ctx.beginPath();
			ctx.fillStyle = "orange";
			ctx.arc(dX + (this.maps.tileSizeCurrent / 2), dY, this.maps.tileSizeCurrent / 8, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

	pxToGrid(px)
	{
		let gridValue = Math.ceil(px / this.maps.tileSizeOrigin);
		return gridValue;
	}

	checkIfAntAtMouse()
	{
		if (this.mouseX && this.mouseY)
		{
			let mouseX = this.mouseX
			let mouseY = this.mouseY

			let tileSize = this.maps.tileSizeCurrent;
			let tileRatio = this.maps.tileSizeCurrent / this.maps.tileSizeOrigin;

			for (let a = this.ants.length - 1; a >= 0; a--)
			{
				let ant = this.ants[a];

				if (mouseX >= ant.x * tileRatio && mouseX < (ant.x * tileRatio) + tileSize && mouseY >= ant.y * tileRatio && mouseY < (ant.y * tileRatio) + tileSize)
				{
					this.selectedAnt = ant;
					return;
				}
			}
			this.selectedAnt = null;
		}
	}

	unSelectAction(all = false)
	{
		if (all)
		{
			let icons = document.querySelectorAll(".bottom-container .img-container");
			for (let i = icons.length - 1; i >= 0; i--)
			{
				if (icons[i].classList.contains("selected"))
				{
					icons[i].classList.remove('selected');
				}
			}
		}
		else
		{
			let icon = document.getElementById(this.selectedAction);
			if (icon.classList.contains('selected'))
			{
				icon.classList.remove('selected');
			}
			this.selectedAction = null;
		}
	}

	manageActionLength()
	{
		let actions = this.maps['currentMap']['actions'];
		if (actions[this.selectedAction] > 0)
		{
			actions[this.selectedAction] -= 1;

			let uiIcon = document.getElementById(this.selectedAction);
			let uiNumber = uiIcon.querySelector('.actionLength');
			uiNumber.innerText = actions[this.selectedAction];

			if (actions[this.selectedAction] === 0)
			{
				uiIcon.classList.add('off');
			}

			return true;
		}
	}

	unblock(ant)
	{
		let currentMap = this.maps['currentMap'];
		let tileRatio = this.maps['tileSizeCurrent'] / this.maps['tileSizeOrigin'];
		let ctx = false;
		let collision = false
		currentMap['collisions'] = Collisions.update(this.maps['tileSizeCurrent'], ctx, currentMap['collisions'], ant.x * tileRatio, ant.y * tileRatio, ant.w * tileRatio, ant.h * tileRatio, tileRatio, collision);
	}

	giveActionToAnt(event)
	{

		if (this.selectedAction)
		{
			let ant = this.selectedAnt;
			if (ant)
			{
				if (this.selectedAction == "block" && ant.role != "block")
				{
					let y = ant.y + ant.h;
					let x = ant.direction < 0 ? ant.x + ant.w : ant.x;

					// if ground exist and action have length
					if (Collisions.check(this.maps, y, x, ant.w - 2, 1) && this.manageActionLength())
					{
						this.unSelectAction();

						ant.status = "stop";
						ant.role = "block";
						ant.imgIndex = 0;

						let currentMap = this.maps['currentMap'];
						let tileRatio = this.maps['tileSizeCurrent'] / this.maps['tileSizeOrigin'];

						let ctx = false;
						currentMap['collisions'] = Collisions.update(this.maps['tileSizeCurrent'], ctx, currentMap['collisions'], ant.x * tileRatio, ant.y * tileRatio, ant.w * tileRatio, ant.h * tileRatio, tileRatio);
					}
				}
				else if (this.selectedAction == "cancel")
				{
					this.unSelectAction();

					if (ant.role == "block")
					{
						this.unblock(ant);
					}

					ant.status = "walk";
					ant.role = null;
					ant.imgIndex = 0;
				}
				else if (this.selectedAction == "suicide")
				{
					this.unSelectAction();

					if (ant.role == "block")
					{
						this.unblock(ant);
					}

					ant.status = "stop";
					ant.role = "suicide";
					ant.imgIndex = 0;
				}
				else if (this.selectedAction == "ball" && ant.role != "ball")
				{
					if (this.manageActionLength())
					{
						this.unSelectAction();
						if (ant.role == "block")
						{
							this.unblock(ant);
						}

						ant.status = "walk";
						ant.role = "ball";
						ant.imgIndex = 0;
					}
				}
			}
		}
	}

	detectExit(ant)
	{
		let exitX = this.exit.x;
		let exitY = this.exit.y;
		if (exitX - (ant.w / 4) < ant.x && exitX + (ant.w / 4) > ant.x && exitY - (ant.h / 4) < ant.y && exitY + (ant.h / 4) > ant.y)
		{
			this.ants.splice(ant.index, 1);
			this.maps['currentMap'].savedLength += 1;
			this.maps['currentMap'].deletedAntsLength += 1;
		}
	}

	suicide(ant)
	{
		this.ants.splice(ant.index, 1);
		this.maps['currentMap'].deletedAntsLength += 1;
	}

	crashAnt(ant)
	{
		let size = 4;
		let number = 12;
		let ratio = this.maps.tileSizeCurrent / this.maps.tileSizeOrigin;

		this.particles.create(Math.round(ant.x), Math.round(ant.y), size, number, 'red')
		this.ants.splice(ant.index, 1);
		this.maps['currentMap'].deletedAntsLength += 1;
	}

	checkOuterScreen(ant)
	{
		let canvas = document.getElementById('canvas-ant');
		if (ant.x > canvas.width || ant.x < 0 || ant.y > canvas.height || ant.y < 0)
		{
			this.ants.splice(ant.index, 1);
			this.maps['currentMap'].deletedAntsLength += 1;		
		}
	}

	fall(ant, engineSpeed)
	{
		let y = ant.y + ant.h;
		let x = ant.x + (ant.w / 4);
		let w = ant.w / 2;

		let speed = ant.role != "ball" ? this.maps.gravity * engineSpeed : (this.maps.gravity - 0.5) * engineSpeed;

		let isCollision = Collisions.check(this.maps, y, x, w, 1);

		if (!isCollision)
		{
			ant.y += speed;
			// if ant begin to fall
			if (ant.status != "fall")
			{
				ant.status = "fall";
				ant.imgIndex = 0;
				ant.fallStartY = y;
			}
		}
		else
		{
			// ant is landing
			if (ant.status == "fall")
			{
				ant.status = "walk";
				// check death
				if (ant.role != "ball" && (ant.y - ant.fallStartY) / this.maps.tileSizeOrigin >= 4)
				{
					this.crashAnt(ant);
				}
			}
		}
	}

	walk(ant, engineSpeed)
	{
		let speed = engineSpeed * this.maps.ratio;
		
		let halfH = ant.h / 2;
		let halfW = ant.w / 2;
		let floorDy = ant.y - halfH;
		let floorDx = ant.direction > 0 ? ant.x + (ant.w / 2) : ant.x + (ant.w / 2) - speed;
		let count = 0;

		let test = 0;

		// check floor
		for (let h = 2 * ant.h; h >= 0; h--)
		{
			if (!Collisions.check(this.maps, floorDy + h, floorDx, speed, 1))
			{
				let y = ant.y + h;
				count += 1;
				if (count >= ant.h - 1)
				{
					ant.y = floorDy + h;
					ant.x += speed * ant.direction;
					return;
				}
			}
			else
			{
				count = 0;
			}
		}
		ant.direction *= -1;
	}

	manageStatut(ant, engineSpeed)
	{
		if (ant.status == "spawn")
		{
			let img = this.maps['elemInfos']['ants']['spawn']['img'];
			// if last spawn img is played => walk
			if (ant.imgIndex >= img.width / ant.w - 1)
			{
				ant.status = "walk";
				ant.role = null;
				ant.imgIndex = 0;
			}
		}
		else
		{
			this.fall(ant, engineSpeed);
		}
		
		if (ant.status == "walk")
		{
			this.walk(ant, engineSpeed);
		}
	}

	mainLoop(engineSpeed, pauseLength)
	{
		// create ants
		if (this.antsSpawned < this.maps['currentMap']['antsLength'])
		{
			let speed = 2000 / engineSpeed;
			this.spawnTempo -= pauseLength;
			let spawnTempo = this.spawnTempo;
			this.spawnTempo = Tools.countTime(this.spawnTempo, speed);

			if (spawnTempo != this.spawnTempo)
			{
				this.antsSpawned += 1;
				this.createAnt();
			}
		}

		// manage ants
		let canvas = document.getElementById('canvas-ant');
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.checkIfAntAtMouse();

		for (let i = this.ants.length - 1; i >= 0; i--)
		{
			let ant = this.ants[i];
			ant.index = i;

			InteractiveEntities.manageInteractiveEntities(this.maps, ant);
			this.manageStatut(ant, engineSpeed);
			this.detectExit(ant);
			this.checkOuterScreen(ant);
			this.draw(ant, engineSpeed, pauseLength);
		}
		
		this.particles.mainLoop();
		InteractiveEntities.mainLoop(this.maps);
	}

	initSpawnAndExit()
	{
		let map = this.maps[this.maps['currentMapName']];

		for (let r = map['tiles'].length - 1; r >= 0; r--)
		{
			if (map['tiles'][r])
			{
				for (let c = map['tiles'][r].length - 1; c >= 0; c--)
				{
					if (map['tiles'][r][c])
					{
						let mapTiles = map['tiles'][r][c];
						if (mapTiles['objName'] == "spawn")
						{
							this.spawn.x = (c + 1.5) * this.maps.tileSizeOrigin;
							this.spawn.y = (r + 2) * this.maps.tileSizeOrigin;
						}
						else if (mapTiles['objName'] == "exit")
						{
							this.exit.x = (c + 1.5) * this.maps.tileSizeOrigin;
							this.exit.y = (r + 2) * this.maps.tileSizeOrigin;
						}
					}
				}
			}
		}
	}

	createGameIcons()
	{
		let gameUiContainer = document.getElementById('game-ui');
		gameUiContainer.classList.remove('hidden');

		let gameUiBotCont = document.getElementById('game-uiBotCont');

		let icons = this.maps['commonElem']['elemsList']['antsIcons'];
		for (let i = 0, iLength = icons.length; i < iLength; i++)
		{
			let imgContainer = document.createElement('div');
			imgContainer.setAttribute('id', icons[i]);
			imgContainer.setAttribute('class', 'img-container');

			let actionLengthTag = document.createElement('p');
			actionLengthTag.setAttribute('class', 'actionLength');
			actionLengthTag.innerText = this.maps['currentMap']['actions'][icons[i]];

			let img = this.maps['elemInfos']['antsIcons'][icons[i]]['img'];
			imgContainer.addEventListener('click', () =>
			{
				this.selectedAction = icons[i];
				let icon = document.getElementById(icons[i]);
				if (!icon.classList.contains('selected') && !icon.classList.contains('off'))
				{
					let all = true;
					this.unSelectAction(all);
					icon.classList.add('selected');
				}
			})

			imgContainer.appendChild(img);
			imgContainer.appendChild(actionLengthTag);
			gameUiBotCont.appendChild(imgContainer);

			if (this.maps['currentMap']['actions'][icons[i]] === 0)
			{
				imgContainer.classList.add('off')
			}
		}
	}

	deleteGameIcons()
	{
		let gameUiBotCont = document.getElementById('game-uiBotCont');
		gameUiBotCont.innerText = "";
	}

	init()
	{
		let canvasCon = document.getElementById('canvas-container');

		canvasCon.addEventListener('click', ()=>
		{
			this.giveActionToAnt(event);
		})

		canvasCon.addEventListener('mousemove', ()=>
		{
			this.mouseX = event.layerX;
			this.mouseY = event.layerY;
		})
		this.createGameIcons();

		this.initSpawnAndExit();

		// draw interactive obj
		let forceDraw = true;
		InteractiveEntities.mainLoop(this.maps, forceDraw);
	}
}