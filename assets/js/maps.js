"use strict";

class Maps
{
	constructor()
	{
		this.currentMapName = "map01";
		this.currentMap;
		this.tileSizeOrigin = 32;
		this.tileSizeCurrent = 32;
		this.gravity = 2;

		this.elemInfos = 
		{
			editorOptionsIcons:
			{
				autoCloseMenu:
				{
					img: null,
					imgSrc: "icon_editor_autoclosemenu.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				toggleSideMenu:
				{
					img: null,
					imgSrc: "icon_editor_togglesidemenu.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				}
			},
			editorToolsIcons:
			{
				removeTile:
				{
					img: null,
					imgSrc: "icon_removetile.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
			},
			antsIcons:
			{
				gameBlock:
				{
					img: null,
					imgSrc: "icon_game_block.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 2
				}
			},
			gameSpeedIcons:
			{
				timePlay:
				{
					img: null,
					imgSrc: "icon_game_timeplay.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				timePause:
				{
					img: null,
					imgSrc: "icon_game_timepause.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				timeUp:
				{
					img: null,
					imgSrc: "icon_game_timeup.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				timeDown:
				{
					img: null,
					imgSrc: "icon_game_timedown.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				}
			},
			blocs:
			{
				grass:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_grass.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 5
				},
				ground:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_ground.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 5
				},
				stalactites:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_stalactites.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 6
				}
			},
			ants:
			{
				walk:
				{
					img: null,
					imgSrc: "ant_walk.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				spawn:
				{
					img: null,
					imgSrc: "ant_spawn.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				fall:
				{
					img: null,
					imgSrc: "ant_fall.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				block:
				{
					img: null,
					imgSrc: "ant_block.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				}
			},
			doors:
			{
				spawn:
				{
					img: null,
					imgSrc: "entity_spawn.png",
					colWidth: 2,
					rowHeight: 2,
					shadeLength: 1,
					typeLength: 1
				},
				exit:
				{
					img: null,
					imgSrc: "entity_exit.png",
					colWidth: 2,
					rowHeight: 2,
					shadeLength: 1,
					typeLength: 1
				}
			}
		};

		this.editor =
		{
			elemsList: 
			{
				blocs: ["grass", "ground", "stalactites"],
				doors: ["spawn", "exit"],
				editorOptionsIcons: ["autoCloseMenu", "toggleSideMenu"],
				editorToolsIcons: ["removeTile"]
			}
		};

		this.commonElem = 
		{
			elemsList: 
			{
				ants: ["walk", "spawn", "fall", "block"],
				doors: ["spawn", "exit"],
				antsIcons: ["gameBlock"],
				gameSpeedIcons: ["timeDown", "timePause", "timePlay", "timeUp"]
			}
		};

		this.map01 = 
		{
			w: 1920,
			h: 1024,
			actions:
			{
				gameBlock: 2
			},
			antsLength: 20,
			elemsList: 
			{
				blocs: ["grass", "ground", "stalactites"],
			},
			tiles: [null,null,null,null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":4,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"doors","objName":"spawn","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":11,"dependToCol":26},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":11,"dependToCol":26},{"dependToRow":11,"dependToCol":26},null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":4,"imgCol":3,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"doors","objName":"exit","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":14,"dependToCol":19},null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":14,"dependToCol":19},{"dependToRow":14,"dependToCol":19},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":3,"collision":true},null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0,"collision":true},null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0,"collision":true},{"catName":"blocs","objName":"stalactites","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"stalactites","imgRow":2,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0,"collision":true},{"catName":"blocs","objName":"stalactites","imgRow":4,"imgCol":3,"collision":true},{"catName":"blocs","objName":"stalactites","imgRow":5,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1,"collision":true},null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true},null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}]]
		}
	}
}