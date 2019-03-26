"use strict";

class Maps
{
	constructor()
	{
		this.currentMap = "map01";

		this.commonElem = 
		{
			imgInfos:
			{
				elements:
				{
					player:
					{
						actionsName: ["walk"],
						imagesSrc: ["player_walk.png"]
					},
					doors:
					{
						actionsName: ["spawn", "exit"],
						imagesSrc: ["entity_spawn.png", "entity_exit.png"]
					}
				}		
			}
		}
		this.map01 = 
		{
			w: 3840,
			h: 2160,
			imgInfos:
			{
				elements:
				{
					blocs:
					{
						actionsName: ["grass", "ground", "stalactites"],
						imagesSrc: ["bloc_grass.png", "bloc_ground.png", "bloc_stalactites.png"]
					}
				}		
			},
			tiles:
			[
				
			]
		}
	}
}