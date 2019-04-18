"use strict";

class Imgs
{
	constructor()
	{
	}
	
	static calculImagesLength(mapsObj, multiElemsList)
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

	static preloadImgs(mapsObj, multiElemsList, imgsLoaded)
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