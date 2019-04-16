"use strict";

class Maps
{
	constructor()
	{
		this.currentMapName = "map01";
		this.currentMap;
		this.tileSizeOrigin = 32;
		this.tileSizeCurrent = 32;
		this.ratio = 1;
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
					typeLength: 9
				},
				ground:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_ground.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 10
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
			alphaOmega:
			{
				spawn:
				{
					img: null,
					imgSrc: "entity_spawn.png",
					colWidth: 4,
					rowHeight: 3,
					shadeLength: 1,
					typeLength: 1
				},
				exit:
				{
					img: null,
					imgSrc: "entity_exit.png",
					colWidth: 4,
					rowHeight: 3,
					shadeLength: 1,
					typeLength: 1
				},
			},
			interactive:
			{
				btn:
				{
					collision: "btn",
					img: null,
					imgSrc: "entity_btn.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1,
					active: false,
					imgIndex: 0,
					animation: true
				}
			},
			decor:
			{
				tree:
				{
					img: null,
					imgSrc: "entity_tree.png",
					colWidth: 5,
					rowHeight: 5,
					shadeLength: 1,
					typeLength: 1					
				},
				tombs:
				{
					img: null,
					imgSrc: "entity_tombs.png",
					colWidth: 3,
					rowHeight: 3,
					shadeLength: 1,
					typeLength: 1						
				},
				arrowLeft:
				{
					img: null,
					imgSrc: "entity_arrowleft.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1						
				}
			}
		};

		this.editor =
		{
			elemsList: 
			{
				alphaOmega: ["spawn", "exit"],
				interactive: ["btn"],
				blocs: ["grass", "ground"],
				decor: ["tree", "tombs", "arrowLeft"],
				editorOptionsIcons: ["autoCloseMenu", "toggleSideMenu"],
				editorToolsIcons: ["removeTile"]
			}
		};

		this.commonElem = 
		{
			elemsList: 
			{
				ants: ["walk", "spawn", "fall", "block"],
				alphaOmega: ["spawn", "exit"],
				antsIcons: ["gameBlock"],
				gameSpeedIcons: ["timeDown", "timePause", "timePlay", "timeUp"]
			}
		};

		this.editorMap = {};

		this.map01 = 
		{
			w: 1280,
			h: 720,
			actions:
			{
				gameBlock: 2
			},
			antsLength: 20,
			elemsList: 
			{
				blocs: ["grass", "ground"],
				decor: ["tree", "tombs", "arrowLeft"]
			},
			tiles: [null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"decor","objName":"tree","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"alphaOmega","objName":"spawn","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":7,"dependToCol":18},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22},{"dependToRow":5,"dependToCol":22}],[null,null,null,null,null,null,null,{"catName":"alphaOmega","objName":"exit","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":3,"collision":true}],[null,null,null,null,null,null,null,{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1,"collision":true}],[null,null,null,null,null,null,null,{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},{"dependToRow":10,"dependToCol":7},null,null,null,null,{"catName":"decor","objName":"arrowLeft","imgRow":0,"imgCol":0,"collision":false},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1,"collision":true}],[null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":1,"collision":true},null,null,{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":2,"collision":true},null,null,null,null,{"catName":"decor","objName":"tombs","imgRow":0,"imgCol":0,"collision":false},{"dependToRow":13,"dependToCol":30},{"dependToRow":13,"dependToCol":30},null],[null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2,"collision":true},null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":13,"dependToCol":30},{"dependToRow":13,"dependToCol":30},{"dependToRow":13,"dependToCol":30},null],[null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":9,"imgCol":0,"collision":true},null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"dependToRow":13,"dependToCol":30},{"dependToRow":13,"dependToCol":30},{"dependToRow":13,"dependToCol":30},null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":5,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":6,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":5,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":7,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":8,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":6,"imgCol":0,"collision":true}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":5,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":7,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":8,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":6,"imgCol":0,"collision":true}],[null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"grass","imgRow":7,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"grass","imgRow":8,"imgCol":1,"collision":true},{"catName":"blocs","objName":"grass","imgRow":4,"imgCol":2,"collision":true}],[null,null,{"catName":"blocs","objName":"ground","imgRow":5,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0,"collision":true}],[null,null,{"catName":"blocs","objName":"ground","imgRow":7,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3,"collision":true}],[null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0,"collision":true},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3,"collision":true},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2,"collision":true}]],
			collisions: []
		}
	}
}