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

		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;

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

		canvas.width = imgWidth;
		canvas.height = imgHeight;
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