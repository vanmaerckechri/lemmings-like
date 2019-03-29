"use strict";

class Imgs
{
	constructor()
	{
		this.list = {};
	}

/*
	calculImagesLength(imgInfos)
	{
		let length = 0;

		for (let i = imgInfos.length - 1; i >= 0; i--)
		{
			let elements = imgInfos[i]["elements"];

			for (let elemName in elements)
			{
				let elem = elements[elemName];
				let actionsName = elem["actionsName"];

				for (let j = actionsName.length - 1; j >= 0; j--)
				{
					length += 1;
				}
			}
		}

		return length;
	}

	preloadImgs(imgInfos, imgsLoaded)
	{
		let loaded = 0;
		let imgsLength = this.calculImagesLength(imgInfos);

		for (let i = imgInfos.length - 1; i >= 0; i--)
		{
			let elements = imgInfos[i]["elements"];

			for (let elemName in elements)
			{
				let elem = elements[elemName];
				let actionsName = elem["actionsName"];
				let imagesSrc = elem["imagesSrc"];

				for (let j = actionsName.length - 1; j >= 0; j--)
				{
					this.list[elemName] = !this.list[elemName] ? {} : this.list[elemName];

					// if img already loaded
					if (this.list[elemName][actionsName[j]])
					{
						loaded += 1;
						if (loaded == imgsLength)
						{
							imgsLoaded();
						}
					}
					else
					{
						this.list[elemName][actionsName[j]] = new Image();

						this.list[elemName][actionsName[j]].onload = () =>
						{
							loaded += 1;
							if (loaded == imgsLength)
							{
								imgsLoaded();
							}
						}
						this.list[elemName][actionsName[j]].src = "./assets/img/" + imagesSrc[j];
					}
				}
			}
		}
	}
*/
	calculImagesLength(mapsObj, multiElemsList)
	{
		let length = 0;

		for (let i = multiElemsList.length - 1; i >= 0; i--)
		{
			let elemsList = multiElemsList[i];

			for (let catName in elemsList)
			{
				let cat = elemsList[catName];

				for (let j = cat.length - 1; j >= 0; j--)
				{
					let elem = mapsObj["elemInfos"][catName][cat[j]];

					if (elem['img'] == null)
					{
						length += 1;
					}
				}
			}
		}

		return length;	
	}

	preloadImgs(mapsObj, multiElemsList, imgsLoaded)
	{
		let loaded = 0;
		let imgsLength = this.calculImagesLength(mapsObj, multiElemsList);

		if (imgsLength > 0)
		{
			for (let i = multiElemsList.length - 1; i >= 0; i--)
			{
				let elemsList = multiElemsList[i];

				for (let catName in elemsList)
				{
					let cat = elemsList[catName];

					for (let j = cat.length - 1; j >= 0; j--)
					{
						let elem = mapsObj["elemInfos"][catName][cat[j]];

						if (elem['img'] == null)
						{
							elem['img'] = new Image();

							elem['img'].onload = () =>
							{
								loaded += 1;
								if (loaded == imgsLength)
								{
									imgsLoaded();
								}
								
							}
							elem['img'].src = "./assets/img/" + elem['imgSrc'];
						}
					}
				}
			}
		}
		else
		{
			imgsLoaded();
		}
	}
}