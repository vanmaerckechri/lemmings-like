"use strict";

class Imgs
{
	constructor()
	{
		this.list = {};
	}

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
}