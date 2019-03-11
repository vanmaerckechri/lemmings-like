"use strict";

class Tools
{
	constructor()
	{
		this.imgInfos =
		{
			objsName: ["background"],
			imagesSrc: ["background.png"]
		}
		this.imgs = {};
	}

	getImage(objName)
	{
		return this.imgs[objName];
	}

	preloadImgs(imgsLoaded)
	{
		let loaded = 0;
		let objsName = this.imgInfos["objsName"];
		let imagesSrc = this.imgInfos["imagesSrc"];

		for (let i = 0, length = objsName.length; i < length; i++)
		{
			this.imgs[objsName[i]] = new Image();
			this.imgs[objsName[i]].onload = () =>
			{
				loaded += 1;
				if (loaded == length)
				{
					imgsLoaded();
				}
			}
			this.imgs[objsName[i]].src = "./assets/img/" + imagesSrc[i];
		}
	}

	static countTime(timeStart, milliSec)
	{
		let currentTime = new Date().getTime();

		if ((currentTime - timeStart) >= milliSec || !timeStart)
		{
			return new Date().getTime();
		}
		else
		{
			return timeStart;
		}
	}

	static createQueue(objName, actionName, timeLength)
	{
		let queue = 
		{
			objName: objName,
			actionName: actionName,
			timeStart: new Date().getTime(),
			timeLength: timeLength
		}

		return queue;
	}
}