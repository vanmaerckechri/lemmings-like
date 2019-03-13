"use strict";

class Canvas
{
	static resizeCanvas(canvas, img)
	{
		let imgWidth = img.width
		let imgHeight = img.height;
		let ratio = imgHeight / imgWidth;

		let standardWidth = 1920;
		let standardHeight = 1080;

		let canvasContainer = document.getElementById('canvas-container');

		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;

		let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;


		if (imgWidth < windowWidth || imgHeight < windowHeight)
		{
			if (fullscreenElement) 
			{
				// landscape
				if (windowWidth / windowHeight > 1)
				{	
					let heightRatio = imgHeight / windowHeight;
					imgHeight = windowHeight;
					imgWidth = imgHeight / ratio;
				}
				// portrait
				else
				{
					let widthRatio = imgWidth / windowWidth;
					imgWidth = windowWidth * widthRatio;
					imgHeight = imgWidth * ratio;
				}
			}
		}
		else
		{
			// check if screen is smaller than standards sizes
			if (windowWidth < standardWidth || windowHeight < standardHeight)
			{
				// landscape
				if (windowWidth / windowHeight > 1)
				{	
					let heightRatio = imgHeight / standardHeight;
					imgHeight = windowHeight * heightRatio;
					imgWidth = imgHeight / ratio;
				}
				// portrait
				else
				{
					let widthRatio = imgWidth / standardWidth;
					imgWidth = windowWidth * widthRatio;
					imgHeight = imgWidth * ratio;
				}
			}
		}		

		canvas.width = imgWidth;
		canvas.height = imgHeight;

		canvasContainer.style.width = canvas.width + "px";
		canvasContainer.style.height = canvas.height + "px";

		let sections = document.querySelectorAll('section')
		for (let s = sections.length - 1; s >= 0; s--)
		{
			let section = sections[s];
			if (canvas.width < windowWidth)
			{
				section.style.width = canvas.width + "px";
			}
			else
			{
				section.style.width = "";
			}
			if (canvas.height < windowHeight)
			{
				section.style.height = canvas.height + "px";
			}
			else
			{
				section.style.height = "";
			}
		}
	}

	static drawCanvasBg(imgBg)
	{
		let canvasBg = document.getElementById('canvas-bg');
		let ctx = canvasBg.getContext('2d');
		this.resizeCanvas(canvasBg, imgBg);

		ctx.drawImage(imgBg, 0, 0, imgBg.width, imgBg.height, 0, 0, canvasBg.width, canvasBg.height);
	}

	static initSize(imgBg)
	{
		this.drawCanvasBg(imgBg);
	}
}