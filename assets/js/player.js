"use strict";

class Player
{
	constructor(imgsByType)
	{
		this.spawn = 
		{
			x: 150,
			y: 300
		};
		this.w = 32;
		this.h = 32;

		this.players = [];
		this.animationTempo = null;
		this.imgsByType = imgsByType;

		this.init()
	}

	createPlayer()
	{
		let player =
		{
			x: this.spawn.x,
			y: this.spawn.y,
			w: 32,
			h: 32,
			imgIndex: 0,
			animationType: 'walk', 
			status: 'spawn'
		}
		this.players.push(player);
	}

	draw(engineSpeed, tileRatio)
	{
		let canvas = document.getElementById('canvas-player');
		let ctx = canvas.getContext('2d');

		let speed = 200 / engineSpeed;
		let animationTempo = this.animationTempo;
		this.animationTempo = Tools.countTime(this.animationTempo, speed);

		if (animationTempo != this.animationTempo)
		{
			let dW = this.w * tileRatio;
			let dH = this.h * tileRatio;
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = this.players.length - 1; i >= 0; i--)
			{
				let player = this.players[i];
				let currentAnim = player['animationType'];

				let img = this.imgsByType[currentAnim]['img'];

				ctx.drawImage(img, player.w * player.imgIndex, 0, player.w, player.h, player.x * tileRatio, player.y * tileRatio, dW, dH);

				player.imgIndex = player.imgIndex < img.width / player.w - 1? player.imgIndex + 1 : 0;
			}
		}
	}

	init()
	{
		this.createPlayer();
	}
}