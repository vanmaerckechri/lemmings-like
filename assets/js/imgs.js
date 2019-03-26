"use strict";

class Imgs
{
	constructor()
	{
		this.list = {};
	}

	preloadImgs(imgInfos, imgsLoaded)
	{
		let loaded = 0;
		let length = imgInfos.length

		for (let i = 0; i < length; i++)
		{
			let entityName = imgInfos[i]["entityName"];
			let actionsName = imgInfos[i]["actionsName"];
			let imagesSrc = imgInfos[i]["imagesSrc"];

			this.list[entityName] = !this.list[entityName] ? {} : this.list[entityName];
			this.list[entityName][actionsName] = new Image();

			this.list[entityName][actionsName].onload = () =>
			{
				loaded += 1;
				if (loaded == length)
				{
					imgsLoaded();
				}
			}
			this.list[entityName][actionsName].src = "./assets/img/" + imagesSrc;
		}
	}
}