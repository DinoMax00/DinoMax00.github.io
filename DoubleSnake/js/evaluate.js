/**
 * evaluate function
 */
import { config } from "./config.js";
export function evaluate(snake) {
    let val = 0;
    let queue = [];
    let vis = [];
    for (let i = 0; i < config.Height; i++) {
        let row = [];
        for (let j = 0; j < config.Width; j++) {
            row.push(false);
        }
        vis[i] = row;
    }
    return 1;
}
