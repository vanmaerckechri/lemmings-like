"use strict";

class Maps
{
	constructor()
	{
		this.currentMap = "map01";
		this.tileSizeOrigin = 32;
		this.tileSizeCurrent = 32;
		this.gravity = 2;

		this.elemInfos = 
		{
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
					typeLength: 3
				},
				ground:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_ground.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 3
				},
				stalactites:
				{
					collision: true,
					img: null,
					imgSrc: "bloc_stalactites.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 4,
					typeLength: 3
				}
			},
			player:
			{
				walk:
				{
					img: null,
					imgSrc: "player_walk.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				spawn:
				{
					img: null,
					imgSrc: "player_spawn.png",
					colWidth: 1,
					rowHeight: 1,
					shadeLength: 1,
					typeLength: 1
				},
				fall:
				{
					img: null,
					imgSrc: "player_fall.png",
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
			},
			background:
			{
				gabarit:
				{
					img: null,
					imgSrc: "background.png"
				}
			}
		};

		this.editor =
		{
			elemsList: 
			{
				blocs: ["grass", "ground", "stalactites"],
				doors: ["spawn", "exit"]
			}
		};

		this.commonElem = 
		{
			elemsList: 
			{
				player: ["walk", "spawn", "fall"],
				doors: ["spawn", "exit"],
				background: ["gabarit"]
			}
		};

		this.map01 = 
		{
			w: 1920,
			h: 1024,
			elemsList: 
			{
				blocs: ["grass", "ground", "stalactites"],
			},
			tiles: [null,null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":2,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":3},null,{"catName":"doors","objName":"exit","imgRow":0,"imgCol":0},{"dependToRow":15,"dependToCol":22},null,null,{"catName":"doors","objName":"spawn","imgRow":0,"imgCol":0},{"dependToRow":15,"dependToCol":26},null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,{"dependToRow":15,"dependToCol":22},{"dependToRow":15,"dependToCol":22},null,null,{"dependToRow":15,"dependToCol":26},{"dependToRow":15,"dependToCol":26},null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":1},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":3},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":3},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2}]]
		}
	}
}