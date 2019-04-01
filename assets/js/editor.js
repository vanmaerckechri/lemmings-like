"use strict";

class Editor
{
	constructor(maps, mapWidth, mapHeight, tileSizeOr)
	{
		// all maps infos
		this.maps = maps;

		this.selectedElem = null;
		this.mouseX = 0;
		this.mouseY = 0;

		this.action = false;

		this.tileSizeOr = tileSizeOr;
		this.tileRatio = 1;

		// current map created in editor
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

			if (elem && elem.objName)
			{
				let elRef = this.maps['elemInfos'][elem.catName][elem.objName];

				for (let r = elRef.rowHeight - 1; r >= 0; r--)
				{
					this.map[dependToRow + r] = !this.map[dependToRow + r] ? [] : this.map[dependToRow + r];

					for (let c = elRef.colWidth - 1; c >= 0; c--)
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
			let elRef = this.maps['elemInfos'][this.selectedElem.catName][this.selectedElem.objName];

			let x = this.mouseX / this.tileRatio;
			let y = this.mouseY / this.tileRatio;

			let col = Math.floor(x / this.tileSizeOr);
			let row = Math.floor(y / this.tileSizeOr);

			for (let r = elRef.rowHeight - 1; r >= 0; r--)
			{
				this.map[row + r] = !this.map[row + r] ? [] : this.map[row + r];

				for (let c = elRef.colWidth - 1; c >= 0; c--)
				{
					if (this.map[row + r][col + c] && this.map[row + r][col + c].dependToRow)
					{
						this.cleanElement(row + r, col + c);
					}
					this.map[row + r][col + c] = { dependToRow: row, dependToCol: col };
				}
			}

			let newObj = JSON.parse(JSON.stringify(this.selectedElem));

			this.map[row][col] = newObj;

			// change shade for next
			let shade = 0;
			if (elRef.shadeLength > 1)
			{
				shade = Math.floor(Math.random() * (elRef.shadeLength - 0) + 0);
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
			let imgRow = this.selectedElem.imgRow;
			let imgCol = this.selectedElem.imgCol;

			let elem = this.maps['elemInfos'][this.selectedElem.catName][this.selectedElem.objName];
			let img = elem.img

			let canvas = document.getElementById('canvas-editorUi');
			let ctx = canvas.getContext('2d');

			let sX = imgCol * this.tileSizeOr;
			let sY = imgRow * this.tileSizeOr;
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
					if (this.map[r][c] && this.map[r][c].objName)
					{
						let imgRow = this.map[r][c].imgRow;
						let imgCol = this.map[r][c].imgCol;

						let el = this.maps['elemInfos'][this.map[r][c].catName][this.map[r][c].objName];
						let img = el.img;

						let sX = imgCol * this.tileSizeOr;
						let sY = imgRow * this.tileSizeOr;
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

	selectElem(catName, objName, imgRow)
	{
		let elem = {};
		elem['catName'] = catName;
		elem['objName'] = objName;
		elem['imgRow'] = imgRow;
		elem['imgCol'] = 0;
		this.selectedElem = elem;
	}

	loadMapFromFile(idInputFile)
	{
	    let inputFile, file, fr;

	    if (typeof window.FileReader !== "function")
	    {
	        alert("Browser need to be updated to work with this function.");
	        return;
	    }

	    inputFile = document.getElementById(idInputFile);
	    if (inputFile.files[0])
	    {
	        file = inputFile.files[0];
	        fr = new FileReader();
	        fr.onload = () =>
	        {
	        	this.map = JSON.parse(fr.result);
	        };
	        fr.readAsText(file);
	    }
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

		// save
		let link = document.createElement("a");
		link.setAttribute("id", "linkToSaveMap");
		link.setAttribute("download", "map.json");
		link.innerText = "save map";
		editorUi.appendChild(link);

		this.updateLinkToExportMap();

		link.addEventListener('click', () =>
		{
			if (this.map.length == 0)
			{
				event.preventDefault();
			}
		})

		//load
		let div = document.createElement("div");
		div.setAttribute("class", "loadFileContainer");

		link = document.createElement("a");
		link.setAttribute("class", "loadFileFakeLink");
		link.innerText = "load map";

		let input = document.createElement("input");
		input.setAttribute("id", "loadFile");
		input.setAttribute("class", "loadFile");
		input.setAttribute("type", "file");

		div.appendChild(link);
		div.appendChild(input);
		editorUi.appendChild(div);

		input.addEventListener('change', () =>
		{
			this.loadMapFromFile("loadFile");
		})
	}

	openUi()
	{
		let editorUI = document.getElementById('editor-ui');
		if (!editorUI.classList.contains('editor-openUi'))
		{
			editorUI.classList.add('editor-openUi');
		}
	}

	launchEditor()
	{
		let section = document.getElementById('game');
		let mapsInfos = this.maps

		section.classList.remove('hidden')

		let editorElemsCont = document.getElementById('editorElems-container');

		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		let elemsList = mapsInfos['editor']['elemsList'];

		// create icons to build map
		for (let catName in elemsList)
		{
			let catContainer = document.createElement('div');
			catContainer.setAttribute('id', 'editorCat_' + catName);
			catContainer.setAttribute('class', 'editorCat');

			let cat = elemsList[catName];

			for (let i = 0, length = cat.length; i < length; i++)
			{
				let elem = mapsInfos['elemInfos'][catName][cat[i]];

				let sW = mapsInfos.standardTileWidth * elem.colWidth;
				let sH = mapsInfos.standardTileHeight * elem.rowHeight;
				canvas.width = sW;
				canvas.height = sH;

				for (let t = 0, tLength = elem.typeLength; t < tLength; t++)
				{
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(elem.img, 0, t * sH, sW, sH, 0, 0, sW, sH);

					let img = new Image();
					img.src = canvas.toDataURL("image/png");

					img.setAttribute('id', cat[i] + '_' + t);
					catContainer.appendChild(img);

					img.addEventListener('click', this.selectElem.bind(this, catName, cat[i], t), false);
				}
				let br = document.createElement('br');
				catContainer.appendChild(br);

			}
			editorElemsCont.appendChild(catContainer)
		}
		this.createLinkToExportMap();
		this.openUi();
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