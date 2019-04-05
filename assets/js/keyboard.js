"use strict";

class Keyboard
{
	constructor()
	{
		this.isPressed = false;

		this.keys = 
		{
			keyEnter: false,
			keyEsc: false,
			keySpace: false,
			keyArrowLeft: false,
			keyArrowUp: false,
			keyArrowDown: false,
			keyArrowRight: false,
			keyD: false,
			keyQ: false,
			keyP: false,
			keyS: false,
			keyZ: false,
			keyMore: false,
			keyLess: false
		}

		this.keysDefault =
		{
			fullScreen: "keySpace",
			moveUp: "keyArrowUp",
			moveDown: "keyArrowDown",
			moveLeft: "keyArrowLeft",
			moveRight: "keyArrowRight",
			speedUp: "keyMore",
			speedDown: "keyLess",
			pause: "keyP"
		};

		this.keysCurrent = this.keysDefault;

		this.commands =
		{
			fullScreen: false,
			moveLeft: false,
			moveDown: false,
			moveRight: false,
			moveUp: false,
			speedUp: false,
			speedDown: false,
			pause: false,
			validate: false
		}
	}

	getCommands()
	{
		this.updateCommandsStatus();

		return this.commands;
	}

	getCurrentKeys()
	{
		return this.keysCurrent;
	}

	getKeyPressed()
	{
		for (let key in this.keys)
		{
			if (this.keys[key])
			{
				return key;
			}
		}
		if (this.isPressed)
		{
			return "invalid key";
		}
		return false;
	}

	updateCustomKeys(newCustomKeys)
	{
		this.keysCurrent = newCustomKeys;
	}

	updateCommandsStatus()
	{
		if (this.keys[this.keysCurrent['fullScreen']])
		{
			this.commands.fullScreen = true;
		}

		this.commands.moveUp = this.keys[this.keysCurrent['moveUp']] ? true : false;
		this.commands.moveDown = this.keys[this.keysCurrent['moveDown']] ? true : false;
		this.commands.moveLeft = this.keys[this.keysCurrent['moveLeft']] ? true : false;
		this.commands.moveRight = this.keys[this.keysCurrent['moveRight']] ? true : false;
		this.commands.speedUp = this.keys[this.keysCurrent['speedUp']] ? true : false;
		this.commands.speedDown = this.keys[this.keysCurrent['speedDown']] ? true : false;
		this.commands.pause = this.keys[this.keysCurrent['pause']] ? true : false;
		this.commands.validate = this.keys.keyEnter ? true : false;
	}

	activeKey(self, event)
	{
		// enter
		if (event.keyCode == 13)
		{
			self.keys.keyEnter = true;
		}
		// esc
		else if (event.keyCode == 27)
		{
			self.keys.keyEsc = true;
		}
		// space
		else if (event.keyCode == 32)
		{
			self.keys.keySpace = true;
		}
		// arrow left
		else if (event.keyCode == 37)
		{
			self.keys.keyArrowLeft = true;
		}
		// arrow up
		else if (event.keyCode == 38)
		{
			self.keys.keyArrowUp = true;
		}
		// arrow right
		else if (event.keyCode == 39)
		{
			self.keys.keyArrowRight = true;
		}
		// arrow down
		else if (event.keyCode == 40)
		{
			self.keys.keyArrowDown = true;
		}
		// d
		else if (event.keyCode == 68)
		{
			self.keys.keyD = true;
		}
		// p
		else if (event.keyCode == 80)
		{
			self.keys.keyP = true;
		}
		// q
		else if (event.keyCode == 81)
		{
			self.keys.keyQ = true;
		}
		// s
		else if (event.keyCode == 83)
		{
			self.keys.keyS = true;
		}
		// z
		else if (event.keyCode == 90)
		{
			self.keys.keyZ = true;
		}
		// +
		else if (event.keyCode == 107)
		{
			self.keys.keyMore = true;
		}
		// -
		else if (event.keyCode == 109)
		{
			self.keys.keyLess = true;
		}
		this.isPressed = true;
	}

	disableKey(self, event)
	{
		// enter
		if (event.keyCode == 13)
		{
			self.keys.keyEnter = false;
		}
		// esc
		else if (event.keyCode == 27)
		{
			self.keys.keyEsc = false;
		}
		// space
		else if (event.keyCode == 32)
		{
			self.keys.keySpace = false;
		}
		// arrow left
		else if (event.keyCode == 37)
		{
			self.keys.keyArrowLeft = false;
		}
		// arrow up
		else if (event.keyCode == 38)
		{
			self.keys.keyArrowUp = false;
		}
		// arrow right
		else if (event.keyCode == 39)
		{
			self.keys.keyArrowRight = false;
		}
		// arrow down
		else if (event.keyCode == 40)
		{
			self.keys.keyArrowDown = false;
		}
		// d
		else if (event.keyCode == 68)
		{
			self.keys.keyD = false;
		}
		// p
		else if (event.keyCode == 80)
		{
			self.keys.keyP = false;
		}
		// q
		else if (event.keyCode == 81)
		{
			self.keys.keyQ = false;
		}
		// s
		else if (event.keyCode == 83)
		{
			self.keys.keyS = false;
		}
		// z
		else if (event.keyCode == 90)
		{
			self.keys.keyZ = false;
		}
		// +
		else if (event.keyCode == 107)
		{
			self.keys.keyMore = false;
		}
		// -
		else if (event.keyCode == 109)
		{
			self.keys.keyLess = false;
		}
		this.isPressed = false;
	}
}