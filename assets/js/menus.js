"use strict";

class Menus
{
	constructor()
	{
		this.oldCustomKey;

		this.customKeys = {};

		this.options = 
		{
			fpsOption: true
		}

		this.init();
	}

	getOptions(optionName = false)
	{
		if (!optionName)
		{
			return this.options;
		}
		else
		{
			return this.options[optionName];
		}
	}

	// COMMON (main menu and options menu)

	getCurrentIndex(buttons, selectedIndex)
	{
		let index = selectedIndex;

		for (let btn = buttons.length - 1; btn >= 0; btn--)
		{
			if (buttons[btn].classList.contains('selected'))
			{
				// from keyboard
				if (index == -1)
				{
					index = btn;
					return index;	
				}
				// from mouse
				else
				{
					buttons[btn].classList.remove('selected');
					buttons[index].classList.add('selected');
					return index;	
				}
			}
		}
	}

	browseSelection(buttons, direction)
	{
		let oldIndex;
		let newIndex;

		for (let btn = buttons.length - 1; btn >= 0; btn--)
		{
			if (buttons[btn].classList.contains('selected'))
			{
				buttons[btn].classList.remove('selected');
				oldIndex = btn;
				break;
			}
		}

		if (direction == "down")
		{
			newIndex = oldIndex + 1 < buttons.length ? oldIndex + 1 : 0;
		}
		else if (direction == "up")
		{
			newIndex = oldIndex === 0 ? buttons.length - 1 : oldIndex - 1;
		}

		buttons[newIndex].classList.add('selected');
	}

	// OPTIONS MENU

	recordCustomKeys()
	{
		let keysID = document.querySelectorAll('#customKey-container button');

		for (let i = 0, length = keysID.length; i < length; i++)
		{
			this.customKeys[keysID[i].id] = "key" + keysID[i].querySelector('.customKey').innerText;
		}

		return this.customKeys;
	}

	toggleFpsVisibility()
	{
		let content = document.querySelector('.fpsOption-content');
		
		this.options["fpsOption"] = this.options["fpsOption"] === true ? false : true;

		content.innerText = this.options["fpsOption"] === false ? "OFF" : "ON";
	}

	updateCustomKey(key)
	{
		let waitCustomKey = document.querySelector('.waitCustomKey');

		if (waitCustomKey)
		{
			waitCustomKey.classList.remove('waitCustomKey');

			if (key)
			{
				if (key == "invalid key")
				{
					waitCustomKey.innerHTML = "<span class=\"alert\">" + key + "</span>";
				}
				else
				{
					waitCustomKey.innerText = key.replace("key", "");
				}
			}
			else
			{
				waitCustomKey.innerText = this.oldCustomKey;
			}
		}
	}

	selectOption(buttons, selectedIndex = -1)
	{
		this.updateCustomKey()

		let index = this.getCurrentIndex(buttons, selectedIndex)
		let button = buttons[index];

		let customKey = button.querySelector('.customKey');
		// Custom Key Selected
		if (customKey)
		{
			this.oldCustomKey = customKey.innerText;

			customKey.classList.add('waitCustomKey');

			customKey.innerText = "...";

			return "waitCustomKey";
		}
		// Others Options Selected
		else
		{
			 if (button.id = "fpsOption")
			 {
			 	this.toggleFpsVisibility();

			 	return "options";
			 }
		}
	}

	// MAIN MENU

	closeMenus()
	{
		let mainMenu = document.getElementById('mainMenu-container');

		mainMenu.classList.add('closeMainMenu');

		let queue = Tools.createQueue('menus', 'closeMenusWindow', 500);
		return queue;
	}

	toggleOptionsWindow(action)
	{
		let optionsContainer = document.getElementById('options-container');

		if (action == "open")
		{
			if (optionsContainer.classList.contains('hidden'))
			{
				optionsContainer.classList.remove('hidden');
			}
		}
		else
		{
			if (!optionsContainer.classList.contains('hidden'))
			{
				optionsContainer.classList.add('hidden');
			}
		}
	}

	selectLabel(buttons, selectedIndex = -1)
	{
		let index = this.getCurrentIndex(buttons, selectedIndex)
		// Play
		if (buttons[index].id == "play-btn")
		{
			this.updateCustomKey();
			this.recordCustomKeys();
			this.toggleOptionsWindow("close");

			return "game";
		}
		// Options
		else if (buttons[index].id == "options-btn")
		{
			this.toggleOptionsWindow("open");

			return "options";
		}
	}

	// INIT

	init()
	{
		// init fps status btn
		let content = document.querySelector('.fpsOption-content');
		content.innerText = this.options["fpsOption"] === false ? "OFF" : "ON";
	}
}