"use strict";

class Player
{
	constructor(maps)
	{
		this.spawn = 
		{
			x: 150,
			y: 300
		};
		this.w = 32;
		this.h = 32;

		this.players = [];
		this.maps = maps;

		this.init()
	}

	createPlayer()
	{
		let player =
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
		this.players.push(player);
	}

	draw(player, engineSpeed)
	{
		let canvas = document.getElementById('canvas-player');
		let ctx = canvas.getContext('2d');
		let tileRatio = this.maps.tileSizeCurrent / this.maps.tileSizeOrigin

		let speed = 200 / engineSpeed;
		let animationTempo = player.animationTempo;
		player.animationTempo = Tools.countTime(player.animationTempo, speed);

		if (animationTempo != player.animationTempo)
		{
			let dW = this.w * tileRatio;
			let dH = this.h * tileRatio;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			let currentAnim = player['animationType'];

			let img = this.maps['elemInfos']['player'][currentAnim]['img'];

			let sY = currentAnim == "walk" && player.direction < 0 ? this.maps.tileSizeOrigin : 0;

			ctx.drawImage(img, player.w * player.imgIndex, sY, player.w, player.h, player.x * tileRatio, player.y * tileRatio, dW, dH);

			player.imgIndex = player.imgIndex < img.width / player.w - 1? player.imgIndex + 1 : 0;
		}
	}

	pxToGrid(coord)
	{
		let gridValue = Math.floor(coord / this.maps.tileSizeOrigin);
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

	fall(player, engineSpeed)
	{
		let plRow = this.pxToGrid(player.y);
		let plCol = this.pxToGrid(player.x);

		let speed = this.maps.gravity * engineSpeed;

		let isCollision = this.checkCollisions(plRow + 1, plCol);
		if (!isCollision)
		{
			player.y += speed;
			// if player begin to fall
			if (player.animationType != "fall")
			{
				player.imgIndex = 0;
				player.lastAnimationType = player.animationType;
				player.animationType = "fall";
				player.fallStartY = player.y;
			}
		}
		else
		{
			// player is landing
			if (player.animationType == "fall")
			{
				player.animationType = player.lastAnimationType;
				console.log(this.pxToGrid(player.fallStartY) - this.pxToGrid(player.y));
			}
		}
	}

	walk(player, engineSpeed)
	{
		let plRow = this.pxToGrid(player.y);
		let plCol = this.pxToGrid(player.x);

		let direction = player.direction > 0 ? 1 : 0;
		let speed = player.direction * engineSpeed;

		let isCollisionWithGround = this.checkCollisions(plRow + 1, plCol);
		let isCollisionWithFront = this.checkCollisions(plRow, plCol + direction);

		if (isCollisionWithGround)
		{
			if (!isCollisionWithFront)
			{
				player.x += speed;
			}
			else
			{
				player.direction *= -1;
			}
		}
	}

	manageStatut(player, engineSpeed)
	{
		if (player.animationType == "spawn")
		{
			let img = this.maps['elemInfos']['player']['spawn']['img'];
			// if last spawn img is played => walk
			if (player.imgIndex >= img.width / player.w - 1)
			{
				player.animationType = "walk";
				player.imgIndex = 0;
			}
		}
		else if (player.animationType == "walk")
		{
			this.walk(player, engineSpeed);
		}
	}

	mainLoop(engineSpeed)
	{
		for (let i = this.players.length - 1; i >= 0; i--)
		{
			let player = this.players[i];

			this.fall(player, engineSpeed);
			this.manageStatut(player, engineSpeed);
			this.draw(player, engineSpeed);
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
		this.createPlayer();
	}
}