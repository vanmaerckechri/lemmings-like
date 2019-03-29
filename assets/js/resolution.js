"use strict";

class Resolution
{
	static getStandardRes()
	{
		return {w: 1920, h: 1024};
	}
	
	static update(tileSizeOrigin, canWidth = null, canHeight = null)
	{
		// sections
		let sections = document.querySelectorAll('section');
		let standRes = this.getStandardRes();
		let standardWidth = standRes["w"];
		let standardHeight = standRes["h"];

		canWidth = !canWidth ? standardWidth : canWidth;
		canHeight = !canHeight ? standardHeight : canHeight;

		let standardRatio = standardWidth / standardHeight;

		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
		let windowRatio = windowWidth / windowHeight;

		let newWidth = 0;
		let newHeight = 0;

		let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

		if (windowHeight >= standardHeight && windowWidth >= standardWidth && !fullscreenElement)
		{
			newWidth = standardWidth;
			newHeight = standardHeight;
		}
		else
		{
			if (standardRatio < windowRatio)
			{
				newHeight = windowHeight;
				newWidth = newHeight * standardRatio;
			}
			else
			{
				newWidth = windowWidth;
				newHeight = windowWidth / standardRatio;
			}
		}
		
		for (let s = sections.length - 1; s >= 0; s--)
		{
			let section = sections[s];

			section.style.width = newWidth + "px";
			section.style.height = newHeight + "px";
		}

		// canvas
		let ratio = standardWidth / newWidth;
		let canvasContainer = document.getElementById('canvas-container');
		let canvas = document.querySelectorAll('canvas');

		canWidth = canWidth / ratio;
		canHeight = canHeight / ratio;

		canvasContainer.style.width = canWidth + "px";
		canvasContainer.style.height = canHeight + "px";

		for (let c = canvas.length - 1; c >= 0; c--)
		{
			canvas[c].width = canWidth;
			canvas[c].height = canHeight;
		}

		return newWidth / standardWidth * tileSizeOrigin;
	}

	static drawCanvasBg(imgBg)
	{
		let canvasBg = document.getElementById('canvas-bg');
		let ctx = canvasBg.getContext('2d');
		let img = imgBg['gabarit']['img'];
		console.log(img)

		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasBg.width, canvasBg.height);
	}
}