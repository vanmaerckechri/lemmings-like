"use strict";

class InteractiveEntities
{
	constructor()
	{
	}

	static draw(maps, obj, metaNfo, img, r, c, tileSizeOr)
	{
		let tileSizeCur = maps.tileSizeCurrent;

		let canvas = document.getElementById('canvas-bg');
		let ctx = canvas.getContext('2d');

		let currentMap = maps['currentMap'];
		let tileRatio = maps.ratio;

		let imgRow = obj.imgRow;
		let imgCol = obj.imgCol;
	
		let sX = tileSizeOr * obj.imgIndex;
		let sY = imgRow * tileSizeOr;
		let sW = tileSizeOr * metaNfo.colWidth;
		let sH = tileSizeOr * metaNfo.rowHeight;


		let dX = c * tileSizeCur;
		let dY = r * tileSizeCur;
		let dW = tileSizeCur * metaNfo.colWidth;
		let dH = tileSizeCur * metaNfo.rowHeight;

		ctx.imageSmoothingEnabled  = false;
		ctx.clearRect(dX, dY, dW, dH);
		ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

		currentMap['collisions'] = Collisions.update(maps['tileSizeCurrent'], ctx, currentMap['collisions'], dX, dY, dW, dH, tileRatio);
	}

	static mainLoop(maps, draw = false)
	{
		let map = maps['currentMap']['tiles'];

		let canvas = document.getElementById('canvas-bg');
		let ctx = canvas.getContext('2d');

		let tileSizeOr = maps.tileSizeOrigin;

		for (let r = map.length - 1; r >= 0; r--)
		{
			if (map[r])
			{
				for (let c = map[r].length - 1; c >= 0; c--)
				{
					if (map[r][c] && map[r][c].catName && map[r][c].catName == "interactive")
					{
						let obj = map[r][c];

						// animation
						let lastImgIndex = obj.imgIndex;

						let metaNfo = maps['elemInfos'][obj.catName][obj.objName];
						let img = metaNfo.img;

						if (obj.active)
						{
							obj.imgIndex = (obj.imgIndex + 1) * tileSizeOr < img.width - 1 ? obj.imgIndex + 1 : obj.imgIndex;
						}
						else
						{
							obj.imgIndex = obj.imgIndex * tileSizeOr > 0 ? obj.imgIndex - 1 : 0;
						}

						// active other objs from current obj?
						if (obj.active && obj.focus && obj.focus.length > 0)
						{
							for (let i = obj.focus.length - 1; i >= 0; i--)
							{
								let focusRow = obj.focus[i].row;
								let focusCol = obj.focus[i].col;

								if (map[focusRow] && map[focusRow][focusCol])
								{
									// for another door type ((- + -) = +) ...
									//map[focusRow][focusCol].active = map[focusRow][focusCol].active ? false : true;

									map[focusRow][focusCol].active = true;
								}
							}
						}

						// if animation is not finish refresh canvas
						if (lastImgIndex != obj.imgIndex || draw === true)
						{
							this.draw(maps, obj, metaNfo, img, r, c, tileSizeOr);
						}
 						obj.active = false;
					}
				}
			}
		}
	}

	static manageInteractiveEntities(maps, ant)
	{
		let map = maps['currentMap']['tiles'];

		let ratio = maps.ratio;

		let w = Math.round(ant.w * ratio);
		let h = Math.round(ant.h * ratio);

		let r = Math.round(ant.y / maps.tileSizeOrigin);
		let c = Math.round(ant.x / maps.tileSizeOrigin);

		if (map[r] && map[r][c] && map[r][c].catName == "interactive")
		{
			if (map[r][c].objName == "btn")
			{
				let isCollision = Collisions.check(maps, ant.y + ant.h + 2, ant.x + (ant.w / 2), 1, 1);
				if (isCollision)
				{
					map[r][c].active = true;
				}
			}
		}

/*
		let x = c * this.maps.tileSizeCurrent;
		let y = r * this.maps.tileSizeCurrent;
		let canvas = document.getElementById('canvas-y');
		let ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.rect(x, y , w, h);
		ctx.fill();
*/
	}
}