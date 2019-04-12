"use strict";

class Particles
{
	constructor(maps)
	{
		this.list = [];
		this.deadList = [];
		this.maps = maps;
	}

	drawParticle(canvas, x, y, size, color)
	{
		let ctx = canvas.getContext('2d');
		let ratio = this.maps.tileSizeOrigin / this.maps.tileSizeCurrent;

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(Math.round(x / ratio), Math.round(y / ratio), size, size);
		ctx.fill();
	}

	drawDeads(singleParticle = false)
	{
		let canvas = document.getElementById('canvas-particlesDeads');

		if (singleParticle)
		{
			this.drawParticle(canvas, singleParticle.x, singleParticle.y, singleParticle.size, singleParticle.color)
		}
		else
		{
			canvas.width = canvas.width;

			for (let p = this.deadList.length - 1; p >= 0; p--)
			{
				let particle = this.deadList[p];

				this.drawParticle(canvas, particle.x, particle.y, particle.size, particle.color)
			}	
		}	
	}

	drawAnimation()
	{
		let canvas = document.getElementById('canvas-particles');
		canvas.width = canvas.width;

		for (let p = this.list.length - 1; p >= 0; p--)
		{
			let particle = this.list[p];
			
			particle.age += 1;
			particle.x = (particle.initialSpeedX * particle.age) + particle.xOrigin;
			particle.y = (this.maps.gravity / 10) * Math.pow(particle.age, 2) + (particle.initialSpeedY * particle.age + particle.yOrigin);

			this.drawParticle(canvas, particle.x, particle.y, particle.size, particle.color);

			let isCollision = Collisions.check(this.maps, particle.y, particle.x, 1, 1);
			if (isCollision)
			{
				this.deadList.push(particle);
				this.list.splice(p, 1);
				this.drawDeads(particle);
			}
		}
	}

	create(x, y, size, number, color)
	{
		for (let p = number - 1; p >= 0; p--)
		{
			let initialSpeed = Math.random() * (7 - 3) + 3;
			let angle = Math.random() * (359 - 0) + 0;

			let particle = 
			{
				age: 0,
				xOrigin: x,
				yOrigin: y,
				initialSpeedX: initialSpeed * Math.cos(angle * Math.PI / 180),
				initialSpeedY: initialSpeed * Math.sin(angle * Math.PI / 180),
				x: x,
				y: y,
				size: size,
				color: color
			}

			this.list.push(particle);
		}
	}

	mainLoop()
	{
		if (this.list.length > 0)
		{
			this.drawAnimation();
		}
	}
}