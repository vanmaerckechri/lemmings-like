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

	static update(ctx, collisions, sX, sY, width, height)
	{
		let pixels = ctx ? ctx.getImageData(sX, sY, width, height).data : false;

		for (let h = height - 1; h >= 0; h--)
		{
			for (let w = width - 1; w >= 0; w--)
			{
				let constante = 4;
				let indexAlpha = 3;
				let size = 1;

				let index = ((h * (size * constante)) + (w * constante)) + indexAlpha;

				if(!pixels || pixels[index] == 255)
				{
					let pixCol = Math.round(sX + w);
					let pixRow = Math.round(sY + h);
					
					collisions[pixRow] = !collisions[pixRow] ? [] : collisions[pixRow];
					collisions[pixRow][pixCol] = true;
				}
			}
		}
		return collisions;
	}

	static init(maps, canvasName)
	{
		let map = maps['currentMap']['tiles'];
		let tileSize = maps['tileSizeOrigin'];

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

						collisions = this.update(ctx, collisions, sX, sY, width, height);
					}
				}
			}
		}
		/*
		// take only alpha
		for (let y = 0, yLength = h; y < yLength; y++)
		{
			for (let x = 0, xLength = w; x < xLength; x++)
			{
				collisions[y] = !collisions[y] ? [] : collisions[y];
				collisions[y][x] = !collisions[y][x] ? [] : collisions[y][x];

				let constante = 4;
				let indexAlpha = 3;
				x = Math.floor(x);
				y = Math.floor(y);

				let index = ((y * (w * constante)) + (x * constante)) + indexAlpha;

				if(pixels[index] == 255)
				{
					collisions[y][x] = true;
				}
				else
				{
					collisions[y][x] = false;
				}
			}
		}
		*/
		return collisions;
	}
}