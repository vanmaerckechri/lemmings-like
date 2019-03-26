"use strict";

class Editor
{
	constructor()
	{
	}

	buildImgsList(mapsInfos)
	{
		let list = 
		{
			elements: {}
		};

		for (let infoName in mapsInfos)
		{
			if (typeof mapsInfos[infoName] == "object" && mapsInfos[infoName]["imgInfos"])
			{
				let elements = mapsInfos[infoName]["imgInfos"]["elements"];
				for (let elemName in elements)
				{
					list["elements"][elemName] = elements[elemName];
				}
			}
		}
		return list;
	}
}