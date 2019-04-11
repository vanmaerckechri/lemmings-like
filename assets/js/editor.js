"use strict";

class Editor
{
	constructor(maps, mapWidth, mapHeight)
	{
		// all maps infos
		this.maps = maps;

		this.selectedElem = null;
		this.mouseX = 0;
		this.mouseY = 0;

		this.action = false;

		this.tileRatio = 1;

		// current map created in editor
		this.map = { tiles: [] };
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.col = 0;
		this.row = 0;

		this.init();
	}

	cleanElement(row, col)
	{
		let map = this.map['tiles'];

		if (map[row] && map[row][col] && map[row][col].dependToRow)
		{
			let dependToRow = map[row][col].dependToRow;
			let dependToCol = map[row][col].dependToCol;

			let elem = map[dependToRow][dependToCol];

			if (elem && elem.objName)
			{
				let elRef = this.maps['elemInfos'][elem.catName][elem.objName];

				for (let r = elRef.rowHeight - 1; r >= 0; r--)
				{
					map[dependToRow + r] = !map[dependToRow + r] ? [] : map[dependToRow + r];

					for (let c = elRef.colWidth - 1; c >= 0; c--)
					{
						map[dependToRow + r][dependToCol + c] = null;
					}
				}
			}
		}
	}

	putElement()
	{
		if (this.selectedElem != null)
		{
			let map = this.map['tiles'];

			let tileSizeOr = this.maps.tileSizeOrigin;
			let tileRatio = this.maps.tileSizeCurrent / tileSizeOr;

			let x = this.mouseX / tileRatio;
			let y = this.mouseY / tileRatio;

			let col = Math.floor(x / tileSizeOr);
			let row = Math.floor(y / tileSizeOr);

			if (this.selectedElem == "removeTile")
			{
				this.cleanElement(row, col);
				if (map[row] && map[row][col])
				{
					map[row][col] = null;
				}
			}
			else
			{
				let elRef = this.maps['elemInfos'][this.selectedElem.catName][this.selectedElem.objName];

				for (let r = elRef.rowHeight - 1; r >= 0; r--)
				{
					map[row + r] = !map[row + r] ? [] : map[row + r];

					for (let c = elRef.colWidth - 1; c >= 0; c--)
					{
						if (map[row + r][col + c] && map[row + r][col + c].dependToRow)
						{
							this.cleanElement(row + r, col + c);
						}
						map[row + r][col + c] = { dependToRow: row, dependToCol: col };
					}
				}

				let newObj = JSON.parse(JSON.stringify(this.selectedElem));

				map[row][col] = newObj;

				// change shade for next
				let shade = 0;
				if (elRef.shadeLength > 1)
				{
					shade = Math.floor(Math.random() * (elRef.shadeLength - 0) + 0);
				}
				this.selectedElem.imgCol = shade
			}
			this.updateLinkToExportMap();
		}
	}

	draw()
	{
		let map = this.map['tiles'];

		let tileSizeOr = this.maps.tileSizeOrigin;
		let tileRatio = this.maps.tileSizeCurrent / tileSizeOr;

		if (this.action == "putElem")
		{
			this.putElement();
		}

		this.tileRatio = tileRatio;

		// draw selected tool
		if (this.selectedElem != null)
		{
			let canvas = document.getElementById('canvas-editorUi');
			let ctx = canvas.getContext('2d');

			let x = Math.floor(this.mouseX / (tileSizeOr * tileRatio)) * (tileSizeOr * tileRatio);
			let y = Math.floor(this.mouseY / (tileSizeOr * tileRatio)) * (tileSizeOr * tileRatio);

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (this.selectedElem == "removeTile")
			{
				ctx.beginPath();
				ctx.rect(x, y, tileSizeOr * tileRatio, tileSizeOr * tileRatio);
				ctx.fillStyle = "rgba(255, 122, 122, .5)";
				ctx.strokeStyle = "rgba(255, 75, 75, 1)";
				ctx.fill();
				ctx.stroke();
			}
			else
			{
				let imgRow = this.selectedElem.imgRow;
				let imgCol = this.selectedElem.imgCol;

				let elem = this.maps['elemInfos'][this.selectedElem.catName][this.selectedElem.objName];
				let img = elem.img

				let sX = imgCol * tileSizeOr;
				let sY = imgRow * tileSizeOr;
				let sW = tileSizeOr * elem.colWidth;
				let sH = tileSizeOr * elem.rowHeight;

				ctx.drawImage(img, sX, sY, sW, sH, x, y, sW * tileRatio, sH * tileRatio);
			}
		}

		// draw tiles
		let canvasEd = document.getElementById('canvas-editor');
		let ctxEd = canvasEd.getContext('2d');

		ctxEd.clearRect(0, 0, canvasEd.width, canvasEd.height);

		for (let r = map.length - 1; r >= 0; r--)
		{
			if (map[r])
			{
				for (let c = map[r].length - 1; c >= 0; c--)
				{
					if (map[r][c] && map[r][c].objName)
					{
						let imgRow = map[r][c].imgRow;
						let imgCol = map[r][c].imgCol;

						let el = this.maps['elemInfos'][map[r][c].catName][map[r][c].objName];
						let img = el.img;

						let sX = imgCol * tileSizeOr;
						let sY = imgRow * tileSizeOr;
						let sW = tileSizeOr * el.colWidth;
						let sH = tileSizeOr * el.rowHeight;
						let dX = c * this.maps.tileSizeCurrent;
						let dY = r * this.maps.tileSizeCurrent;

						ctxEd.imageSmoothingEnabled  = false;
 						ctxEd.drawImage(img, sX, sY, sW, sH, dX, dY, Math.ceil(sW * tileRatio), Math.ceil(sH * tileRatio));
					}
				}
			}
		}
	}

	selectElem(catName, objName, imgRow, collision)
	{
		let elem = {};
		elem['catName'] = catName;
		elem['objName'] = objName;
		elem['imgRow'] = imgRow;
		elem['imgCol'] = 0;
		elem['collision'] = collision;
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
	        	this.updateLinkToExportMap();
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
		link.setAttribute("class", "linkToSaveMap");
		link.setAttribute("download", "map.json");
		link.innerText = "save map";
		editorUi.appendChild(link);

		this.updateLinkToExportMap();

		link.addEventListener('click', () =>
		{
			if (this.map['tiles'].length == 0)
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

	toggleMenuAutoClose()
	{
		let editorUi = document.getElementById('editor-ui');
		let autoCloseMenuIcon = document.getElementById('autoCloseMenu');

		if (editorUi.classList.contains('editor-autoClose'))
		{
			editorUi.classList.remove('editor-autoClose');
			autoCloseMenuIcon.classList.remove('iconSelected');
		}
		else
		{
			editorUi.classList.add('editor-autoClose');
			autoCloseMenuIcon.classList.add('iconSelected');
		}
	}

	toggleMenuSide()
	{
		let editorUi = document.getElementById('editor-ui');

		if (editorUi.classList.contains('editor-rightSide'))
		{
			editorUi.classList.remove('editor-rightSide');
		}
		else
		{
			editorUi.classList.add('editor-rightSide');
		}
	}

	loadOptionsIcons(icons, catName)
	{
		let editorMenuOptions = document.getElementById('editor-menuOptions');

		for (let i = 0, length = icons.length; i < length; i++)
		{
			let icon = this.maps['elemInfos'][catName][icons[i]].img;

			let iconContainer = document.createElement('div');
			iconContainer.setAttribute('id', icons[i]);
			iconContainer.setAttribute('class', 'icon-Container ' + icons[i]);

			iconContainer.appendChild(icon);
			editorMenuOptions.appendChild(iconContainer);

			// events
			if (icons[i] == "autoCloseMenu")
			{
				iconContainer.addEventListener('click', this.toggleMenuAutoClose);
			}
			else if (icons[i] == "toggleSideMenu")
			{
				iconContainer.addEventListener('click', this.toggleMenuSide);
			}
		}
	}

	moveDisplayFps()
	{
		let editorUi = document.getElementById('editor-ui');
		let fpsContainer = document.getElementById('fps-container');

		editorUi.insertBefore(fpsContainer, editorUi.firstChild);
	}

	launchEditor()
	{
		this.moveDisplayFps();

		let section = document.getElementById('game');
		section.classList.remove('hidden')

		let editorElemsCont = document.getElementById('editorElems-container');

		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		let elemsList = this.maps['editor']['elemsList'];

		// create icons
		let catContainer = document.createElement('div');
		for (let catName in elemsList)
		{
			// icons for menu editor options
			if (catName == "editorOptionsIcons")
			{
				this.loadOptionsIcons(elemsList[catName], catName);
			}
			// icons to build map
			else
			{
				catContainer.setAttribute('id', 'editorCat_' + catName);
				catContainer.setAttribute('class', 'editorCat');

				let cat = elemsList[catName];

				for (let i = 0, length = cat.length; i < length; i++)
				{
					let elem = this.maps['elemInfos'][catName][cat[i]];
					let collision = elem['collision'] ? elem['collision'] : false;

					let sW = this.maps.tileSizeOrigin * elem.colWidth;
					let sH = this.maps.tileSizeOrigin * elem.rowHeight;
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

						if (cat[i] == "removeTile")
						{
							img.addEventListener('click', () =>
							{
								this.selectedElem = "removeTile";
							});
						}
						else
						{
							img.addEventListener('click', this.selectElem.bind(this, catName, cat[i], t, collision), false);
						}
					}
					if (catName != "doors")
					{
						let br = document.createElement('br');
						catContainer.appendChild(br);
					}
				}
				editorElemsCont.appendChild(catContainer)
			}
		}

		this.createLinkToExportMap();
		this.openUi();
	}
	init()
	{
		let canvasCont = document.getElementById('canvas-container');
		canvasCont.addEventListener('mousemove',  () =>
		{ 
			this.mouseX = event.layerX;
			this.mouseY = event.layerY;
		});

		canvasCont.addEventListener('mousedown',  () =>
		{
			this.action = "putElem";
		})

		canvasCont.addEventListener('mouseup',  () =>
		{
			this.action = "";
		})

	}
}