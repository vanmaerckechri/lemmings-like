"use strict";

class Tools
{
	static countTime(timeStart, milliSec, pauseLength = 0)
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