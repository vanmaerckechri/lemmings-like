"use strict";

class Canvas
{
	static drawCanvasBg(canvasBg, imgBg)
	{
		let ctx = canvasBg.getContext('2d');
		ctx.drawImage(imgBg, 0, 0);
	}

	static initSize(imgBg)
	{
		let canvasBg = document.getElementById('canvas-bg');
		canvasBg.width = imgBg.width;
		canvasBg.height = imgBg.height;

		this.drawCanvasBg(canvasBg, imgBg);
	}
}