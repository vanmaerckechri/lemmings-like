"use strict";

class Editor
{
	constructor(mapWidth, mapHeight, tileSizeOr)
	{
		this.selectedElem = null;
		this.mouseX = 0;
		this.mouseY = 0;

		this.action = false;

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

			if (elem)
			{
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
					if (this.map[row + r][col + c] && this.map[row + r][col + c].dependToRow)
					{
						this.cleanElement(row + r, col + c);
					}
					this.map[row + r][col + c] = { dependToRow: row, dependToCol: col };
				}
			}

			// save element in map
			let imgRef = elem.img;
			let newObj = JSON.parse(JSON.stringify(elem));
			newObj.img = imgRef

			this.map[row][col] = newObj;

			// change shade for next
			let shade = 0;
			if (elem.shadeLength > 1)
			{
				shade = Math.floor(Math.random() * (elem.shadeLength - 0) + 0);
			}
			this.selectedElem.imgCol = shade

			this.updateLinkToExportMap();
		}
	}

	draw(tileRatio)
	{
		if (this.action == "putElem")
		{
			this.putElement();
		}

		this.tileRatio = tileRatio;

		if (this.selectedElem != null)
		{
			let elem = this.selectedElem;
			let img = elem.img;

			let canvas = document.getElementById('canvas-editorUi');
			let ctx = canvas.getContext('2d');

			let sX = elem.imgCol * this.tileSizeOr;
			let sY = elem.imgRow * this.tileSizeOr;
			let sW = this.tileSizeOr * elem.colWidth;
			let sH = this.tileSizeOr * elem.rowHeight;
			let x = Math.floor(this.mouseX / (this.tileSizeOr * this.tileRatio)) * (this.tileSizeOr * this.tileRatio);
			let y = Math.floor(this.mouseY / (this.tileSizeOr * this.tileRatio)) * (this.tileSizeOr * this.tileRatio);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, sX, sY, sW, sH, x, y, sW * tileRatio, sH * tileRatio);
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

						let sX = el.imgCol * this.tileSizeOr;
						let sY = el.imgRow * this.tileSizeOr;
						let sW = this.tileSizeOr * el.colWidth;
						let sH = this.tileSizeOr * el.rowHeight;
						let dX = Math.ceil(c * this.tileSizeOr * tileRatio);
						let dY = Math.ceil(r * this.tileSizeOr * tileRatio);

 						ctxEd.drawImage(img, sX, sY, sW, sH, dX, dY, Math.ceil(sW * tileRatio), Math.ceil(sH * tileRatio));
					}
				}
			}
		}
	}

	selectElem(elem, t)
	{
		elem.imgRow = t;
		elem.imgCol = 0;
		this.selectedElem = elem;
	}

	updateLinkToExportMap()
	{
		let link = document.getElementById('linkToSaveMap');
		//let map = JSON.stringify(this.map, null, '\t');
		let map = JSON.stringify(this.map);
		let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(map);
		link.setAttribute("href", dataUri);
	}

	createLinkToExportMap()
	{
		let editorUi = document.getElementById('editor-ui');
		let link = document.createElement("a");

		link.setAttribute("id", "linkToSaveMap");
		link.setAttribute("download", "map.json");
		link.innerText = "download your map";
		editorUi.appendChild(link);

		this.updateLinkToExportMap();

		link.addEventListener('click', () =>
		{
			if (this.map.length == 0)
			{
				event.preventDefault();
			}
		})
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

					img.addEventListener('click', this.selectElem.bind(this, elem, t), false);
				}

			}
			editorElemsCont.appendChild(catContainer)
		}
		this.createLinkToExportMap();
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
			this.action = "putElem";
		})

		canvas.addEventListener('mouseup',  () =>
		{
			this.action = "";
		})

	}
}