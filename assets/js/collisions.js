"use strict";

class Collisions
{
	static check(maps, y, x)
	{
		let map = maps['currentMap']['tiles'];
		let collisions = maps['currentMap']['collisions'];

		x = Math.round(x);
		y = Math.round(y);

		if (collisions[y] && collisions[y][x])
		{
			return true;
		}
		return false;
	}

	static draw(maps)
	{
		let map = maps.currentMap.collisions
								let canvas = document.getElementById('canvas-x');
						let ctx = canvas.getContext('2d');
								ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let r = map.length - 1; r >= 0; r--)
		{
			if (map[r])
			{
				for (let c = map[r].length - 1; c >= 0; c--)
				{
					if (map[r][c])
					{
						let tileRatio = maps['tileSizeCurrent'] / maps['tileSizeOrigin'];

						ctx.beginPath();
						ctx.fillStyle = 'red';
						ctx.rect(c * tileRatio, r * tileRatio, 1, 1);
						ctx.fill();
					}
				}
			}
		}
	}

	static update(tileSize, ctx, collisions, sX, sY, width, height, tileRatio)
	{
		let pixels = ctx ? ctx.getImageData(sX, sY, width, height).data : false;

		for (let h = height - 1; h >= 0; h--)
		{

			for (let w = width - 1; w >= 0; w--)
			{
				let constante = 4;
				let indexAlpha = 3;
				let size = tileSize;

				let index = (h * (size * constante)) + (w * constante) + indexAlpha;

				let pixRow = Math.round((sY + h) / tileRatio);
				let pixCol = Math.round((sX + w) / tileRatio);
				collisions[pixRow] = !collisions[pixRow] ? [] : collisions[pixRow];

				if(!pixels || pixels[index] == 255)
				{
					collisions[pixRow][pixCol] = true;
				}
				else
				{
					collisions[pixRow][pixCol] = false;
				}
			}
		}
		return collisions;
	}

	static init(maps, canvasName)
	{
		let map = maps['currentMap']['tiles'];
		let canvasW = maps['currentMap'].w;

		let tileRatio = maps['tileSizeCurrent'] / maps['tileSizeOrigin'];
		let tileSize = maps['tileSizeCurrent'];

		let canvas = document.getElementById(canvasName);
		let ctx = canvas.getContext('2d');

		let collisions = [];

		for (let r = map.length - 1; r >= 0; r--)
		{
			if (map[r])
			{
				for (let c = map[r].length - 1; c >= 0; c--)
				{
					if (map[r][c] && map[r][c].collision)
					{
						let catName = map[r][c]['catName'];
						let objName = map[r][c]['objName'];
						let rowHeight = maps['elemInfos'][catName][objName].rowHeight;
						let colWidth = maps['elemInfos'][catName][objName].colWidth;

						let sX = c * tileSize;
						let sY = r * tileSize;
						let width = colWidth * tileSize;
						let height = rowHeight * tileSize;

						collisions = this.update(tileSize, ctx, collisions, sX, sY, width, height, tileRatio);
					}
				}
			}
		}

		return collisions;
	}
}