"use strict";

class Editor
{
	constructor(mapWidth, mapHeight, tileSizeOr)
	{
		this.selectedElem = null;
		this.mouseX = 0;
		this.mouseY = 0;

		this.tileSizeOr = tileSizeOr;
		this.tileRatio = 1;
		this.map = [];
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.col = 0;
		this.row = 0;

		this.init();
	}

	cleanElement(row, col)
	{
		if (this.map[row][col].dependToRow)
		{
			let dependToRow = this.map[row][col].dependToRow;
			let dependToCol = this.map[row][col].dependToCol;
			let elem = this.map[dependToRow][dependToCol];

			for (let r = elem.rowHeight - 1; r >= 0; r--)
			{
				this.map[dependToRow + r] = !this.map[dependToRow + r] ? [] : this.map[dependToRow + r];

				for (let c = elem.colWidth - 1; c >= 0; c--)
				{
					this.map[dependToRow + r][dependToCol + c] = null;
				}
			}
		}
	}

	putElement()
	{
		if (this.selectedElem != null)
		{
			let elem = this.selectedElem;

			let x = this.mouseX / this.tileRatio;
			let y = this.mouseY / this.tileRatio;

			let col = Math.floor(x / this.tileSizeOr);
			let row = Math.floor(y / this.tileSizeOr);

			for (let r = elem.rowHeight - 1; r >= 0; r--)
			{
				this.map[row + r] = !this.map[row + r] ? [] : this.map[row + r];

				for (let c = elem.colWidth - 1; c >= 0; c--)
				{
					if (this.map[row + r][col + c])
					{
						this.cleanElement(row + r, col + c);
					}
					this.map[row + r][col + c] = { dependToRow: row, dependToCol: col };
				}
			}
			this.map[row][col] = elem;
		}
	}

	draw(tileRatio, tileWidthOrigin, tileHeightOrigin)
	{
		this.tileRatio = tileRatio;

		if (this.selectedElem != null)
		{
			let elem = this.selectedElem;
			let img = elem.img;

			let canvas = document.getElementById('canvas-editorUi');
			let ctx = canvas.getContext('2d');

			let sW = tileWidthOrigin * elem.colWidth;
			let sH = tileHeightOrigin * elem.rowHeight;

			let x = Math.floor(this.mouseX / (this.tileSizeOr * this.tileRatio)) * (this.tileSizeOr * this.tileRatio);
			let y = Math.floor(this.mouseY / (this.tileSizeOr * this.tileRatio)) * (this.tileSizeOr * this.tileRatio);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, sW, sH, x, y, sW * tileRatio, sH * tileRatio);
		}

		let canvasEd = document.getElementById('canvas-editor');
		let ctxEd = canvasEd.getContext('2d');

		ctxEd.clearRect(0, 0, canvasEd.width, canvasEd.height);

		for (let r = this.map.length - 1; r >= 0; r--)
		{
			if (this.map[r])
			{
				for (let c = this.map[r].length - 1; c >= 0; c--)
				{
					if (this.map[r][c] && this.map[r][c].img)
					{
						let el = this.map[r][c];
						let img = el.img;

						let sW = tileWidthOrigin * el.colWidth;
						let sH = tileHeightOrigin * el.rowHeight;
						let dX = c * this.tileSizeOr * tileRatio;
						let dY = r * this.tileSizeOr * tileRatio;

						ctxEd.drawImage(img, 0, 0, sW, sH, dX, dY, sW * tileRatio, sH * tileRatio);
					}
				}
			}
		}
	}

	selectElem(elem)
	{
		this.selectedElem = elem;
	}

	launchEditor(mapsInfos)
	{
		let section = document.getElementById('game');
		section.classList.remove('hidden')

		let editorElemsCont = document.getElementById('editorElems-container');

		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		let elemsList = mapsInfos['editor']['elemsList'];

		for (let catName in elemsList)
		{
			let catContainer = document.createElement('div');
			catContainer.setAttribute('id', 'editorCat_' + catName);
			catContainer.setAttribute('class', 'editorCat');

			let cat = elemsList[catName];

			for (let i = 0, length = cat.length; i < length; i++)
			{
				let elem = mapsInfos['elemInfos'][catName][cat[i]];
				let imgComplete = elem.img;
				let sW = mapsInfos.standardTileWidth * elem.colWidth;
				let sH = mapsInfos.standardTileHeight * elem.rowHeight;

				canvas.width = sW;
				canvas.height = sH;

				for (let t = 0, tLength = elem.typeLength; t < tLength; t++)
				{
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(imgComplete, 0, t * sH, sW, sH, 0, 0, sW, sH);

					let img = new Image();
					img.src = canvas.toDataURL("image/png");

					img.setAttribute('id', cat[i] + '_' + t);
					catContainer.appendChild(img);
					
					let br = document.createElement('br');
					catContainer.appendChild(br);

					let newObj = JSON.parse(JSON.stringify(elem));
					newObj.img = img;

					img.addEventListener('click', this.selectElem.bind(this, newObj), false);
				}

			}
			editorElemsCont.appendChild(catContainer)
		}
	}
	init()
	{
		let canvas = document.getElementById('canvas-editorUi');
		canvas.addEventListener('mousemove',  () =>
		{ 
			this.mouseX = event.layerX;
			this.mouseY = event.layerY;
		});

		canvas.addEventListener('mousedown',  () =>
		{
			this.putElement();
		})

	}
}