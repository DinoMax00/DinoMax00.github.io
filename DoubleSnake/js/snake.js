/**
 * 蛇
 */
import { config } from "./config.js";
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
export class Snake {
    constructor(map, color, copy = false) {
        this.body = [];
        this.map = [];
        this.head_color = config.BLACK;
        this.body_color = config.WHITE;
        this.direction = UP;
        if (copy)
            return;
        // init map by reference
        this.map = map;
        // init body    
        if (color === config.BLACK) {
            this.head_color = config.BLACK;
            this.body_color = config.WHITE;
            this.body[0] = [0, 0];
            this.direction = RIGHT;
        }
        else {
            this.head_color = config.WHITE;
            this.body_color = config.BLACK;
            this.body[0] = [config.Height - 1, config.Width - 1];
            this.direction = LEFT;
        }
        this.printSnake();
    }
    // check wether to increase body length
    increase(turn) {
        if (turn <= 10 || (turn - 10) % 3 === 0) {
            let len = this.body.length - 1;
            let node = [this.body[len][0], this.body[len][1]];
            this.body.push(node);
        }
    }
    // draw snake on the map
    printSnake() {
        // body
        for (let node of this.body) {
            this.map[node[0]][node[1]] = this.body_color;
        }
        // head
        let node = this.body[0];
        this.map[node[0]][node[1]] = this.head_color;
    }
    // go!
    go(turn) {
        // move head
        let head = [this.body[0][0], this.body[0][1]];
        this.map[head[0]][head[1]] = this.body_color;
        switch (this.direction) {
            case UP:
                head[0] -= 1;
                break;
            case DOWN:
                head[0] += 1;
                break;
            case LEFT:
                head[1] -= 1;
                break;
            case RIGHT:
                head[1] += 1;
                break;
        }
        this.body.unshift(head);
        this.map[head[0]][head[1]] = this.head_color;
        // check tail
        if (!(turn <= 10 || (turn - 10) % 3 === 0)) {
            let len = this.body.length;
            this.map[this.body[len - 1][0]][this.body[len - 1][1]] = config.GRID;
            this.body.pop();
        }
    }
    // delete one move
    goBack(turn, tail) {
        // remove head
        let head = this.body[0];
        this.map[head[0]][head[1]] = config.GRID;
        this.body.shift();
        head = this.body[0];
        this.map[head[0]][head[1]] = this.head_color;
        if (turn <= 10 || (turn - 10) % 3 === 0) {
            return;
        }
        this.map[tail[0]][tail[1]] = this.body_color;
        this.body.push(tail);
    }
    // check whether a legal move
    checkMove(direction) {
        let x = this.body[0][0];
        let y = this.body[0][1];
        switch (direction) {
            case UP:
                x -= 1;
                break;
            case DOWN:
                x += 1;
                break;
            case LEFT:
                y -= 1;
                break;
            case RIGHT:
                y += 1;
                break;
            default:
                return false;
        }
        if (x >= config.Height || x < 0)
            return false;
        if (y >= config.Width || y < 0)
            return false;
        if (this.map[x][y] != config.GRID)
            return false;
        return true;
    }
    checkKeyBoard(d) {
        let dir = -1;
        switch (d) {
            case "w":
                dir = UP;
                break;
            case "s":
                dir = DOWN;
                break;
            case "a":
                dir = LEFT;
                break;
            case "d":
                dir = RIGHT;
                break;
        }
        if (this.checkMove(dir)) {
            this.direction = dir;
            return true;
        }
        return false;
    }
    // evaluate function
    evaluate() {
        let height = config.Height, width = config.Width;
        let val = 0;
        let queue = [], head = 0, tail = 0;
        let vis = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(0);
            }
            vis[i] = row;
        }
        let u = [this.body[0][0], this.body[0][1]];
        queue[tail++] = u;
        while (head !== tail) {
            let top = queue[head];
            head++;
            for (let i = 0; i < 4; i++) {
                let x = top[0] + dx[i];
                let y = top[1] + dy[i];
                if (x >= height || x < 0)
                    continue;
                if (y >= width || y < 0)
                    continue;
                if (vis[x][y])
                    continue;
                if (this.map[x][y] != config.GRID)
                    continue;
                vis[x][y] = vis[top[0]][top[1]] + 1;
                // val += vis[x][y]>(height+width)*0.65 ? (height+width)*0.5 / vis[x][y]: 1;
                val += 1;
                queue[tail++] = [x, y];
            }
        }
        return 1000 * val;
    }
    genLegalMoves() {
        let vec = [];
        for (let i = 0; i < 4; i++) {
            if (this.checkMove(i)) {
                vec.push(i);
            }
        }
        return vec;
    }
}
