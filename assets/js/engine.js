"use strict";

class Engine
{
	constructor()
	{
		this.imgs;
		this.keyboard;
		this.ui;
		this.menus;
		this.editor;
		this.game;
		this.maps;
		this.ants;

		this.tileSize = 32;
		this.status = "mainMenu";
		this.loading = false;

		this.queues = [];

		this.init();
	}

	// LAUNCH GAME / EDITOR

	launchGame()
	{
		this.loading = true;

		this.menus.closeMenus();
		let queue = this.menus.closeMenus();
		this.queues.push(queue);

		let imgMapInfos = this.maps[this.maps["currentMapName"]]['elemsList'];
		let imgCommonInfos = this.maps['commonElem']['elemsList'];

		this.imgs.preloadImgs(this.maps, [imgCommonInfos, imgMapInfos], () =>
		{
			this.game.loadMap();
			this.updateWindowSize();
			this.game.launchGame();
			this.loading = false;
		});
	}

	launchEditor()
	{
		this.loading = true;

		this.menus.closeMenus();
		let queue = this.menus.closeMenus();
		this.queues.push(queue);

		let imgMapInfos = this.maps['editor']['elemsList'];

		this.imgs.preloadImgs(this.maps, [imgMapInfos], () =>
		{
			let res = Resolution.getStandardRes();
			this.editor = new Editor(this.maps, res["w"], res["h"]);
			this.updateWindowSize();
			this.loading = false;
		});
	}

	// MENUS

	dispatchOptions(options)
	{
		this.ui.updateFpsVisibility(options["fpsOption"]);
	}

	manageGame(command)
	{
		if (command == "moveDown" || command == "moveUp" || command == "moveLeft" || command == "moveRight")
		{
			this.game.moveScreen(command);
		}
		else if (command == "speedUp")
		{
			this.game.updateSpeedGame(1)
		}
		else if (command == "speedDown")
		{
			this.game.updateSpeedGame(-1)
		}
		else if (command == "pause")
		{
			this.game.updateSpeedGame(0);
		}
	}

	manageEditor(command)
	{
		if (command == "moveDown" || command == "moveUp" || command == "moveLeft" || command == "moveRight")
		{
			this.game.moveScreen(command);
		}
	}

	manageMenuOptions(command)
	{
		let buttons = document.querySelectorAll('#options-container button');

		if (command == "moveLeft")
		{
			this.menus.toggleOptionsWindow("close");
			let newCustomKeys = this.menus.recordCustomKeys();
			this.keyboard.updateCustomKeys(newCustomKeys);

			// import options and dispatch them
			let options = this.menus.getOptions();
			this.dispatchOptions(options);

			this.status = "mainMenu";
		}
		else if (command == "moveDown")
		{
			this.menus.browseSelection(buttons, "down");
		}
		else if (command == "moveUp")
		{
			this.menus.browseSelection(buttons, "up");
		}
		else if (command == "validate")
		{
			this.status = this.menus.selectOption(buttons);
		}	
	}

	manageMainMenu(command)
	{
		let buttons = document.querySelectorAll('#mainMenu-container button');

		if (command == "moveDown")
		{
			this.menus.browseSelection(buttons, "down");
		}
		else if (command == "moveUp")
		{
			this.menus.browseSelection(buttons, "up");
		}
		else if (command == "validate")
		{
			this.status = this.menus.selectLabel(buttons);
			if (this.status == "game")
			{
				this.launchGame();
			}
			else if (this.status == "editor")
			{
				this.launchEditor();
			}
		}
	}

	// COMMON

	updateWindowSize()
	{
		let canvasPl = document.getElementById('canvas-ants');

		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		if (this.status == 'game' || this.status == 'testMap')
		{
			let w = this.maps['currentMap']['w'];
			let h = this.maps['currentMap']['h'];
			
			this.maps.tileSizeCurrent = Resolution.update(this.maps.tileSizeOrigin, w, h);
			this.game.drawMap();
			if (this.game.ants)
			{
				this.game.ants.particles.drawDeads();
			}
		}
		else if (this.status == 'editor')
		{
			this.maps.tileSizeCurrent = Resolution.update(this.maps.tileSizeOrigin, this.editor.canWidth, this.editor.canHeight);
		}
		else
		{
			this.maps.tileSizeCurrent = Resolution.update(this.maps.tileSizeOrigin);
		}

		this.game.updateScreen();

		// center sections
		let sections = document.querySelectorAll('section')
		for (let s = sections.length - 1; s >= 0; s--)
		{
			let section = sections[s];
			section.style.left = (winWidth / 2) - (section.offsetWidth / 2) + "px";
			section.style.top = (winHeight / 2) - (section.offsetHeight / 2) + "px";
		}
	}

	manageQueues()
	{
		for (let q = 0, length = this.queues.length; q < length; q++)
		{
			let queue = this.queues[q];

			let newTimeStart = Tools.countTime(queue.timeStart, queue.timeLength);
			if (queue.timeStart != newTimeStart)
			{
				// do something...
				if (queue.objName == "menus")
				{
					if (queue.actionName == "closeMenusWindow")
					{
						/*
						let menusSection = document.getElementById('menus');
						menusSection.classList.add('hidden');
						*/
					}
				}
				this.queues.splice(q, 1);
			}
		}
	}


	manageStatus(event)
	{
		this.keyboard.activeKey(this.keyboard, event);

		// WAIT AN CUSTOM INPUT KEY
		if(this.status == "waitCustomKey")
		{
			let keyPressed = this.keyboard.getKeyPressed();
			if (keyPressed)
			{
				this.menus.updateCustomKey(keyPressed);

				this.status = "options";
			}
		}
		// MANAGE INPUT COMMANDS
		else
		{
			let commands = this.keyboard.getCommands();

			for (let command in commands)
			{
				if (commands[command])
				{
					// common
					if (command == "fullScreen")
					{
						this.ui.openFullscreen();
						this.keyboard.commands.fullScreen = false;
					}
					// options
					if (this.status == "options")
					{
						this.manageMenuOptions(command);
					}
					// main menus
					else if (this.status == "mainMenu")
					{
						this.manageMainMenu(command);
					}
					// editor
					else if (this.status == "editor")
					{
						this.manageEditor(command);
					}
					// game
					else if (this.status == "game" || this.status == "testMap")
					{
						this.manageGame(command);
					}
				}
			}
		}
	}

	mainLoop()
	{
		if (this.status == "game" && !this.loading)
		{
			this.game.mainLoop();
		}
		else if (this.status == "editor" && !this.loading)
		{
			this.editor.draw();
			this.status = this.editor.getStatus();
			if (this.status == "testMap" && !this.loading)
			{
				this.launchGame();
			}
		}
		else if (this.status == "testMap" && !this.loading)
		{
			this.game.mainLoop();
			this.status = this.editor.getStatus();
			if (this.status == "editor" && !this.loading)
			{
				this.game.stopGame();
			}
		}

		this.manageQueues();
		this.ui.calculFrameBySec();
		window.requestAnimationFrame(() => this.mainLoop());
	}

	// INIT

	initGame()
	{
		let zoomEvent;
		if ("onwheel" in window)
		{
			zoomEvent = "wheel";
		}
		else if ('onmousewheel' in window)
		{
			zoomEvent = "onmousewheel";
		}
		else
		{
			zoomEvent = "DOMMouseScroll";			
		}

		window.addEventListener(zoomEvent, (event) =>
		{
			if (this.status == "game" || this.status == "editor" || this.status == "testMap")
			{
				this.game.updateZoom(event);
			}
		})
	}

	initMenus()
	{
		this.menus = new Menus();

		// Import Custom Keys
		let keys = this.keyboard.getCurrentKeys();
		for (let key in keys)
		{
			let keyContainer = document.getElementById(key);
			if (keyContainer)
			{
				keyContainer.querySelector('.customKey').innerText = keys[key].replace("key", "");
			}
		}

		// EVENTS

		// Main Menu
		let mainMenuBtns = document.querySelectorAll('#mainMenu-container button');

		for (let i = mainMenuBtns.length - 1; i >= 0; i--)
		{
			mainMenuBtns[i].addEventListener('mousedown', () =>
			{
				let status = this.menus.selectLabel(mainMenuBtns, i);
				this.status = status;

				// if user leave options menu (with a click on another main menu button)
				if (this.status != "options")
				{
					let options = this.menus.getOptions();
					this.dispatchOptions(options);
					this.manageMainMenu("validate");
				}
			});
		}

		// Options
		let optionsBtns = document.querySelectorAll("#options-container button");

		for (let i = optionsBtns.length - 1; i >= 0; i--)
		{
			optionsBtns[i].addEventListener('mousedown', () =>
			{ 
				let status = this.menus.selectOption(optionsBtns, i); 
				this.status = status;
			});
		}
	}

	initKeyboard()
	{
		this.keyboard = new Keyboard();
		let self = this;
		document.addEventListener('keyup', this.keyboard.disableKey.bind(this, this.keyboard));
		document.addEventListener('keydown', this.manageStatus.bind(this));
	}

	initCommon()
	{
		window.addEventListener('resize', () =>
		{
			this.updateWindowSize();
		})
	}

	init()
	{
		this.imgs = new Imgs();
		this.maps = new Maps();

		this.initKeyboard();
		this.initMenus();
		this.ui = new Ui(this.menus.getOptions("fpsOption"));
		this.game = new Game(this.maps);
		this.initGame();
		this.initCommon();

		this.updateWindowSize();

		//window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame(() => this.mainLoop());
	}
}

let engine = new Engine();