"use strict";

class Player
{
	constructor(imgs)
	{
		this.spawn = 
		{
			x: 150,
			y: 300
		};

		this.imgs = imgs;
		this.players = [];
		this.animationTempo = null;

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

	draw(engineSpeed)
	{
		let canvas = document.getElementById('canvas-player');
		let ctx = canvas.getContext('2d');

		let speed = 200 / engineSpeed;

		let animationTempo = this.animationTempo;
		this.animationTempo = Tools.countTime(this.animationTempo, speed);

		if (animationTempo != this.animationTempo)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = this.players.length - 1; i >= 0; i--)
			{
				let player = this.players[i];
				let currentAnim = player['animationType'];

				let img = this.imgs[currentAnim];

				ctx.drawImage(img, player.w * player.imgIndex, 0, player.w, player.h, player.x, player.y, player.w, player.h);

				player.imgIndex = player.imgIndex < img.width / player.w - 1? player.imgIndex + 1 : 0;
			}
		}
	}

	init()
	{
		this.createPlayer();
	}
}