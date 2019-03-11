"use strict";

class Engine
{
	constructor()
	{
		this.keyboard;
		this.ui;

		this.menus;

		this.status = "mainMenu";

		this.init();
	}

	manageOptions(command)
	{
		let buttons = document.querySelectorAll('#options-container button');

		if (command == "moveLeft")
		{
			let newCustomKeys = this.menus.recordCustomKeys();
			this.keyboard.updateCustomKeys(newCustomKeys);

			let isFpsVisible = this.menus.getOption("fpsOption");
			this.ui.updateFpsVisibility(isFpsVisible);

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
					else if (this.status == "options")
					{
						this.manageOptions(command);
					}
					// main menus
					else if (this.status == "mainMenu")
					{
						this.manageMainMenu(command);
					}
				}
			}
		}
	}

	mainLoop()
	{
		this.ui.calculFrameBySec();
		window.requestAnimationFrame(() => this.mainLoop());
	}

	// INIT

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

				let isFpsVisible = this.menus.getOption("fpsOption");
				this.ui.updateFpsVisibility(isFpsVisible);
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

	init()
	{
		this.initKeyboard();
		this.initMenus();
		this.ui = new Ui(this.menus.getOption("fpsOption"));

		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame(() => this.mainLoop());
	}
}

let engine = new Engine();