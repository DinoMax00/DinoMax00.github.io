/**
 * 游戏引擎
 */
import { config } from "./config.js";
import { View } from "./view.js";
import { Snake } from "./snake.js";
//import {swal} from "../lib/sweetalert-dev.js"
import { ab } from "./alpha_beta.js";
import { MinMax } from "./MinMax.js";
import { MCTS } from "./mcts.js";
export class Engine {
    constructor() {
        this.map = [];
        this.view = new View(this.map);
        this.turn = 0;
        this.cur_player = false;
        this.game_mode = "alpha_beta";
        // init map
        for (let i = 0; i < config.Height; i++) {
            let row = [];
            for (let j = 0; j < config.Width; j++) {
                row.push(config.GRID);
            }
            this.map[i] = row;
        }
        // set blocks
        for (let i = 0; i < 15; i++) {
            let x = Math.floor(Math.random() * 100) % (config.Width - 2) + 1;
            let y = Math.floor(Math.random() * 100) % (config.Height - 2) + 1;
            this.map[x][y] = config.BLOCK;
        }
        // init snake
        this.snake_black = new Snake(this.map, config.BLACK);
        this.snake_white = new Snake(this.map, config.WHITE);
        // print map
        this.view.printMap();
    }
    // boot engine
    run() {
        window.addEventListener("keydown", this.handleKeydown.bind(this), false);
    }
    // handle keyboard events
    handleKeydown(event) {
        if (!this.snake_black.genLegalMoves().length) {
            swal("You Loss!", "", "error");
            this.reStart();
            return;
        }
        if (!this.cur_player && this.snake_black.checkKeyBoard(event.key)) {
            // 黑蛇 
            console.log(this.snake_white.genLegalMoves());
            this.snake_black.go(++this.turn);
            this.view.printMap();
            if (!this.snake_white.genLegalMoves().length) {
                console.log(this.snake_white.genLegalMoves());
                swal("You Win!", "", "success");
                this.reStart();
                return;
            }
            // 白蛇
            this.cur_player = !this.cur_player;
            this.snake_white.direction = this.getResult();
            this.snake_white.go(this.turn);
            this.view.printMap();
            this.cur_player = !this.cur_player;
            console.log(this.snake_black.evaluate());
            console.log(this.snake_white.evaluate());
        }
    }
    getResult() {
        if (this.game_mode === "alpha-beta")
            return ab.abSearch(this.map, this.snake_black, this.snake_white, this.turn, this.cur_player);
        else if (this.game_mode === "min-max")
            return MinMax.minMaxSearch(this.map, this.snake_black, this.snake_white, this.turn, this.cur_player);
        else
            return MCTS.monte_carlo_tree_search(this.cur_player, this.snake_white, this.snake_black, this.turn);
    }
    resetGameMode(mode) {
        this.game_mode = mode;
    }
    reStart() {
        console.clear();
        this.cur_player = false;
        this.turn = 0;
        // init map
        for (let i = 0; i < config.Height; i++) {
            let row = [];
            for (let j = 0; j < config.Width; j++) {
                row.push(config.GRID);
            }
            this.map[i] = row;
        }
        // set blocks
        for (let i = 0; i < 15; i++) {
            let x = Math.floor(Math.random() * 100) % (config.Width - 5) + 4;
            let y = Math.floor(Math.random() * 100) % (config.Height - 5) + 4;
            this.map[x][y] = config.BLOCK;
        }
        // init snake
        this.snake_black = new Snake(this.map, config.BLACK);
        this.snake_white = new Snake(this.map, config.WHITE);
        // print map
        this.view.map = this.map;
        this.view.printMap();
    }
}
