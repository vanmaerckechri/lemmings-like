"use strict";

class Engine
{
	constructor()
	{
		this.tools;
		this.keyboard;
		this.ui;
		this.menus;
		this.game;

		this.status = "mainMenu";

		this.queues = [];

		this.init();
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
				/*
				let queue = this.menus.closeMenus();
				this.queues.push(queue);
				*/
				this.menus.closeMenus();
				this.game.launchGame();
				this.updateWindowSize();
			}
		}
	}

	// COMMON

	updateWindowSize()
	{
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		this.game.updateScreen();

		Canvas.drawCanvasBg(this.tools.getImage("background"));

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
						let menusSection = document.getElementById('menus');
						menusSection.classList.add('hidden');
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
					// game
					else if (this.status == "game")
					{
						this.manageGame(command);
					}
				}
			}
		}
	}

	mainLoop()
	{
		this.manageQueues();
		this.ui.calculFrameBySec();
		window.requestAnimationFrame(() => this.mainLoop());
	}

	// INIT

	initGame()
	{
		window.addEventListener('wheel', (event) =>
		{
			if (this.status == "game")
			{
				this.game.updateZoom(event);
			}
		})		
		window.addEventListener('mousewheel', (event) =>
		{
			if (this.status == "game")
			{
				this.game.updateZoom(event);
			}
		})
		window.addEventListener('DOMMouseScroll', (event) =>
		{
			if (this.status == "game")
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
			keyContainer.querySelector('.customKey').innerText = keys[key].replace("key", "");
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
					
					let queue = this.menus.closeMenus();
					this.queues.push(queue);
					this.game.launchGame();
					this.updateWindowSize();
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
		this.tools = new Tools();
		this.tools.preloadImgs(() =>
		{
			this.initKeyboard();
			this.initMenus();
			this.ui = new Ui(this.menus.getOptions("fpsOption"));
			this.game = new Game();
			this.initGame();
			this.initCommon();

			this.updateWindowSize();

			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.requestAnimationFrame(() => this.mainLoop());
		});
	}
}

let engine = new Engine();