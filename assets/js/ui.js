"use strict";

class Ui
{
	constructor(fpsVisibility)
	{
		this.fpsVisibility;

		this.frameBySecTimeStart;
		this.frameCount = 60;
		this.frameBySec = 0;

		this.updateFpsVisibility(fpsVisibility);
	}

	countTime(timeStart, milliSec)
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

	updateFpsVisibility(isVisible)
	{
		let fpsContainer = document.getElementById('fps-container');
		if (isVisible)
		{
			this.fpsVisibility = true;
			fpsContainer.classList.remove('hidden')
		}
		else
		{
			if (!fpsContainer.classList.contains('hidden'))
			{
				this.fpsVisibility = false;
				fpsContainer.classList.add('hidden')
			}			
		}
	}

	displayFps()
	{
		let fpsContent = document.getElementById('fps-content');
		fpsContent.innerText = this.frameBySec;
	}

	calculFrameBySec()
	{
		if (this.fpsVisibility)
		{
			let frameBySecTimeStart = this.frameBySecTimeStart;

			this.frameBySecTimeStart = this.countTime(this.frameBySecTimeStart, 1000);

			if (frameBySecTimeStart != this.frameBySecTimeStart)
			{
				this.frameBySec = this.frameCount;
				this.frameCount = 0;
				this.displayFps();
			}

			this.frameCount += 1;
		}
	}

	openFullscreen()
	{
		if (document.exitFullscreen)
		{
			let elem = document.documentElement;

			if (elem.requestFullscreen)
			{
				elem.requestFullscreen();
			}
			else if (elem.mozRequestFullScreen)
			{
				/* Firefox */
				elem.mozRequestFullScreen();
			} 
			else if (elem.webkitRequestFullscreen)
			{
				/* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			}
			else if (elem.msRequestFullscreen)
			{
				/* IE/Edge */
				elem.msRequestFullscreen();
			}
		}
	}
}