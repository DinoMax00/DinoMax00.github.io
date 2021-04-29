/**
 * 蒙特卡洛树搜索
 */

import { Snake } from "./snake.js"
import {config} from "./config.js"

export namespace MCTS {
    const SIM_TIMES = 10;
    let player: boolean; // root player
    let root: Node;
    let c: number = 2;
    let nodes: Array<Node> = [];
    class Node {
        cur_player: boolean = false;
        cur_snake: Snake;
        opp_snake: Snake;
        win: number = 0;
        tot: number = 0;
        par: number;
        turn: number;
        moves: any;
        childs: Array<number> = [];

        constructor(cur_player: boolean, cur_snake: Snake, opp_snake: Snake, par: number, turn: number) {
            this.cur_player = cur_player;
            this.cur_snake = cur_snake;
            this.opp_snake = opp_snake;
            this.par = par;
            this.turn = turn;
            this.moves = randomShuffle(this.cur_snake.genLegalMoves()); 
        }

        // get best child
        getBest() {
            let uct = -100000000, index = -1;
            for (let i = 0; i < this.childs.length; i++) {
                let child_uct = getUct(this.cur_player, nodes[this.childs[i]].win, nodes[this.childs[i]].tot, this.tot);
                // update
                if (child_uct > uct) {
                    uct = child_uct;
                    index = i;
                }
            }
            return index;
        }
    }

    // search loop
    export function monte_carlo_tree_search(cur_player: boolean, cur_snake: Snake, opp_snake: Snake, turn: number): number {
        player = cur_player;
        // create root node
        root = new Node(cur_player, 
                        copy(cur_snake), 
                        copy(opp_snake), 
                        -1, 
                        turn);
        nodes = [];
        nodes.push(root);
        root.win += runSimulate(root);
        root.tot += 1;
        // loop
        let startTime = new Date().getTime();
        let endTime = new Date().getTime();

        while (endTime - startTime < config.TIME_LIMIT) {
            endTime = new Date().getTime();
            treePolicy();
        }
        // find best move 
        let val = 0, best = 2;
        for (let i = 0; i < root.childs.length; i++) {
            if (nodes[root.childs[i]].tot > val) {
                best = root.moves[i];
                val = nodes[root.childs[i]].tot;
            }
        }
        return best;
    }

    // dfs
    function treePolicy() {
        let cur_num = 0;
        while (true) {
            let cur = nodes[cur_num];
            // expand
            if (cur.childs.length != cur.moves.length) {
                expand(cur_num);
                return;
            }
            // find a suitable child
            let index = cur.getBest();
            // no un_expand node
            if(index == -1) {
                let win = cur.cur_player==player? 0: 1;
                backpropagation(cur, win, SIM_TIMES);
                return;
            }
            // go down
            cur_num = cur.childs[index];
        }
    }

    // expand node
    function expand(cur_index: number) {
        let cur = nodes[cur_index];
        let move =  cur.moves[cur.childs.length];
        // copy snakes
        let opp_snake = copy(cur.cur_snake);
        let cur_snake = copy(cur.opp_snake);
        opp_snake.map = cur_snake.map;
        opp_snake.direction = move;
        opp_snake.go(cur.turn);
        let turn = cur.cur_player ? cur.turn + 1 : cur.turn;
        // create a new node
        let expand_node = new Node(!cur.cur_player, cur_snake, opp_snake, cur_index, turn);
        nodes.push(expand_node);
        cur.childs.push(nodes.length-1);
        // backtracing
        backpropagation(expand_node, runSimulate(expand_node), SIM_TIMES);
    }

    // Backpropagation
    function backpropagation(cur: Node, win: number, tot: number) {
        while (cur !== undefined) {
            cur.win += win;
            cur.tot += 1;
            cur = nodes[cur.par];
        }
    }

    // simulate
    function defaultPolicy(cur_snake: Snake, opp_snake: Snake, cur_player: boolean, turn: number): boolean {
        let moves: Array<number>;
        let sim_turn = turn;
        let sim_cur_snake = copy(cur_snake);
        let sim_opp_snake = copy(opp_snake);
        sim_cur_snake.map = sim_opp_snake.map;
        while (true) {
            moves = sim_cur_snake.genLegalMoves();
            if (!moves.length) {
                return cur_player != player;
            }
            sim_cur_snake.direction = moves[GetRandNum(0, moves.length - 1)];
            sim_cur_snake.go(sim_turn);

            if (cur_player) sim_turn++;

            moves = sim_opp_snake.genLegalMoves();
            if (!moves.length) {
                return cur_player == player;
            }
            sim_opp_snake.direction = moves[GetRandNum(0, moves.length - 1)];
            sim_opp_snake.go(sim_turn);

            if (!cur_player) sim_turn++;
        }
    }

    // run multiple simulate
    function runSimulate(expand_node: Node): number { 
        let win = 0;
        for(let i=0; i<SIM_TIMES; i++) {
            win += defaultPolicy(expand_node.cur_snake, expand_node.opp_snake, expand_node.cur_player, expand_node.turn) ? 1 : 0;
        }
        return win / SIM_TIMES;
    }

    // calculate UCT value
    function getUct(cur_player: boolean, Qi: number, Ni: number, N: number): number {
        if(cur_player==player) return Qi / Ni + Math.sqrt(c * Math.log(N) / Math.log(Math.E) / Ni);
        else return (1 - Qi / Ni) + Math.sqrt(c * Math.log(N) / Math.log(Math.E) / Ni);
    }

    // get a random integer
    function GetRandNum(min: number, max: number) {
        let range = max - min + 1;
        let ranValue = min + Math.floor(Math.random() * range);
        return ranValue;
    }

    // deep copy a snake Type
    function copy(src: Snake): Snake {
        let tmp = new Snake([], src.head_color, true);
        tmp.map = JSON.parse(JSON.stringify(src.map));
        tmp.body = JSON.parse(JSON.stringify(src.body));
        tmp.body_color = src.body_color;
        tmp.direction = src.direction;
        tmp.head_color = src.head_color;
        return tmp;
    } 

    // randomly sort a array
    function randomShuffle(array: Array<number>): Array<number> {
        var m = array.length,
                t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
}






