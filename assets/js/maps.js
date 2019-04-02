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
			icons:
			{
				removeTile:
				{
					img: null,
					imgSrc: "icon_removetile.png",
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
				icons: ["removeTile"]
			}
		};

		this.commonElem = 
		{
			elemsList: 
			{
				ants: ["walk", "spawn", "fall"],
				doors: ["spawn", "exit"],
			}
		};

		this.map01 = 
		{
			w: 1920,
			h: 1024,
			antsLength: 20,
			elemsList: 
			{
				blocs: ["grass", "ground", "stalactites"],
			},
			tiles: [null,null,null,null,null,null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":1,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":2,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":2,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":4,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":5,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":4,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":5,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1},null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0},null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0},null,null,null,null,null,null,{"catName":"doors","objName":"spawn","imgRow":0,"imgCol":0},{"dependToRow":9,"dependToCol":19},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":1,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0},null,null,null,null,null,null,{"dependToRow":9,"dependToCol":19},{"dependToRow":9,"dependToCol":19},null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2},null,{"catName":"doors","objName":"exit","imgRow":0,"imgCol":0},{"dependToRow":11,"dependToCol":14},null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":2,"imgCol":1},null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0},null,{"dependToRow":11,"dependToCol":14},{"dependToRow":11,"dependToCol":14},null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1},null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":4,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1},null,null,{"catName":"blocs","objName":"grass","imgRow":1,"imgCol":1},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":1},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":2}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":2,"imgCol":0},null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0},null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":4,"imgCol":2},null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":0}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"grass","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":1,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":0,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":2,"imgCol":1},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":3}],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"catName":"blocs","objName":"ground","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":4,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":0},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":1},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":3},{"catName":"blocs","objName":"stalactites","imgRow":3,"imgCol":2},{"catName":"blocs","objName":"stalactites","imgRow":5,"imgCol":3},{"catName":"blocs","objName":"ground","imgRow":4,"imgCol":1}]]
		}
	}
}