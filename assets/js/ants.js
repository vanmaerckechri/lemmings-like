"use strict";

class Ants
{
	constructor(maps)
	{
		this.spawn = 
		{
			x: 150,
			y: 300
		};
		this.antsSpawned = 0;
		this.spawnTempo = null;

		this.ants = [];
		this.maps = maps;

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
			lastAnimationType: 'walk',
			animationType: 'spawn', 
			status: 'spawn'
		}
		this.ants.push(ant);
	}

	draw(ant, engineSpeed)
	{
		let canvas = document.getElementById('canvas-ant');
		let ctx = canvas.getContext('2d');
		let tileSizeOrigin = this.maps.tileSizeOrigin;
		let tileRatio = this.maps.tileSizeCurrent / tileSizeOrigin

		let currentAnim = ant['animationType'];

		let sY = currentAnim == "walk" && ant.direction < 0 ? tileSizeOrigin : 0;
		let dW = this.maps.tileSizeCurrent * this.maps['elemInfos']['ants'][currentAnim]['colWidth'];
		let dH = this.maps.tileSizeCurrent * this.maps['elemInfos']['ants'][currentAnim]['rowHeight'];

		let img = this.maps['elemInfos']['ants'][currentAnim]['img'];
		ctx.drawImage(img, ant.w * ant.imgIndex, sY, ant.w, ant.h, ant.x * tileRatio, ant.y * tileRatio, dW, dH);

		let speed = 100 / engineSpeed;
		let animationTempo = ant.animationTempo;
		ant.animationTempo = Tools.countTime(ant.animationTempo, speed);
		if (animationTempo != ant.animationTempo)
		{
			ant.imgIndex = ant.imgIndex < img.width / ant.w - 1 ? ant.imgIndex + 1 : 0;
		}
	}

	pxToGrid(px)
	{
		let gridValue = Math.ceil(px / this.maps.tileSizeOrigin);
		return gridValue;
	}

	checkCollisions(row, col)
	{
		let map = this.maps[this.maps['currentMap']]['tiles'];

		if (map[row] && map[row][col] && map[row][col]['catName'])
		{
			let catName = map[row][col]['catName'];
			let objName = map[row][col]['objName'];
			let tile = this.maps['elemInfos'][catName][objName];

			if (tile['collision'])
			{
				return true;
			}
		}

		return false;
	}

	fall(ant, engineSpeed)
	{
		let plRow = this.pxToGrid(ant.y);
		let plCol = this.pxToGrid(ant.x);

		let speed = this.maps.gravity * engineSpeed;

		plCol = ant.direction > 0 ? plCol - 1 : plCol;

		let isCollision = this.checkCollisions(plRow, plCol);

		if (!isCollision)
		{
			ant.y += speed;
			// if ant begin to fall
			if (ant.animationType != "fall")
			{
				ant.imgIndex = 0;
				ant.lastAnimationType = ant.animationType;
				ant.animationType = "fall";
				ant.fallStartY = ant.y;
			}
		}
		else
		{
			// ant is landing
			if (ant.animationType == "fall")
			{
				ant.animationType = ant.lastAnimationType;
			}
		}
	}

	walk(ant, engineSpeed)
	{
		let plRow = this.pxToGrid(ant.y);
		let plCol = this.pxToGrid(ant.x);

		plCol = ant.direction > 0 ? plCol : plCol - 1;

		let speed = ant.direction * engineSpeed;

		let isCollision = this.checkCollisions(plRow - 1, plCol);

		if (!isCollision)
		{
			ant.x += speed;
		}
		else
		{
			ant.direction *= -1;
		}
	}

	manageStatut(ant, engineSpeed)
	{
		if (ant.animationType == "spawn")
		{
			let img = this.maps['elemInfos']['ants']['spawn']['img'];
			// if last spawn img is played => walk
			if (ant.imgIndex >= img.width / ant.w - 1)
			{
				ant.animationType = "walk";
				ant.imgIndex = 0;
			}
		}
		else if (ant.animationType == "walk")
		{
			this.walk(ant, engineSpeed);
		}
	}

	mainLoop(engineSpeed)
	{
		// create ants
		if (this.antsSpawned < this.maps[this.maps['currentMap']]['antsLength'])
		{
			let speed = 2000 / engineSpeed;
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

		for (let i = this.ants.length - 1; i >= 0; i--)
		{
			let ant = this.ants[i];

			this.fall(ant, engineSpeed);
			this.manageStatut(ant, engineSpeed);
			this.draw(ant, engineSpeed);
		}
	}

	detectSpawn()
	{
		let map = this.maps[this.maps['currentMap']];

		for (let r = map['tiles'].length - 1; r >= 0; r--)
		{
			if (map['tiles'][r])
			{
				for (let c = map['tiles'][r].length - 1; c >= 0; c--)
				{
					if (map['tiles'][r][c])
					{
						let mapTiles = map['tiles'][r][c];
						if (mapTiles['catName'] == "doors" && mapTiles['objName'] == "spawn")
						{
							this.spawn.x = (c + 0.5) * this.maps.tileSizeOrigin;
							this.spawn.y = (r + 1) * this.maps.tileSizeOrigin;
						}
					}
				}
			}
		}
	}

	init()
	{
		this.detectSpawn();
	}
}