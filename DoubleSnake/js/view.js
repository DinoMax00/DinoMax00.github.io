/**
 * 界面绘制
 */
import { config } from "./config.js";
export class View {
    constructor(map) {
        this.grids = [];
        this.map = map;
        this.width = config.Width;
        this.height = config.Height;
        const root = document.getElementById("gameWindow");
        // 插入网格
        for (let i = 0; i < this.height; i++) {
            let tr = root === null || root === void 0 ? void 0 : root.appendChild(document.createElement("tr"));
            let td = [];
            for (let j = 0; j < this.width; j++) {
                td[j] = tr === null || tr === void 0 ? void 0 : tr.appendChild(document.createElement("td"));
            }
            this.grids[i] = td;
        }
    }
    // 根据地图障碍物对格子染色
    printMap() {
        for (let i = 0; i < config.Height; i++) {
            for (let j = 0; j < config.Width; j++) {
                this.grids[i][j].style.background = config.COLORS[this.map[i][j]];
            }
        }
    }
}
