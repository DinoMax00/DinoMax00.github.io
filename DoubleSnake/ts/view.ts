/**
 * 界面绘制
 */

import { config } from "./config.js";

export class View {
    private grids: Array<any>[] = [];
    private width: number;
    private height: number;
    public map: Array<any>[];

    constructor(map: Array<any>[]) {
        this.map = map;
        this.width = config.Width;
        this.height = config.Height;
        const root = document.getElementById("gameWindow");
        // 插入网格
        for (let i = 0; i < this.height; i++) {
            let tr = root?.appendChild(document.createElement("tr"));
            let td = [];
            for (let j = 0; j < this.width; j++) {
                td[j] = tr?.appendChild(document.createElement("td"));
            }
            this.grids[i] = td;
        }
    }

    // 根据地图障碍物对格子染色
    public printMap() {
        for (let i = 0; i < config.Height; i++) {
            for(let j = 0; j < config.Width; j++) {
                this.grids[i][j].style.background = config.COLORS[this.map[i][j]];
            }
        }
    }
}