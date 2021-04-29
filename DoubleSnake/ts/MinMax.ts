/**
 * 极大极小值搜索
 */

import {Snake} from "./snake.js";

export namespace MinMax {
    const INF = 100000000;
    const WIN_SCROE = 1000000;

    let map: Array<any>[] = [];
    let snake_black: Snake;
    let snake_white: Snake;
    let cur_player = false;
    let best = 2;
    let global_depth = 12;

    export function minMaxSearch(Map: Array<any>[], Snake_1: Snake, Snake_2: Snake, Turn: number, player: boolean): number {
        // 初始化
        map = Map;
        snake_black = Snake_1;
        snake_white = Snake_2;
        cur_player = player;
        global_depth = 4;

        negaMax(Turn, global_depth);

        return best;
    }

    // 负值最大
    function negaMax(turn: number, deep: number): number {
        let moves: number[] = [];
        moves = genMoves();

        if (!moves.length) {
            return evaluate() - WIN_SCROE;
        }

        let max_val = -INF;
        if(deep==0) {
            return evaluate();
        }

        let tail: [number, number]

        if(!cur_player)
            tail = [snake_black.body[snake_black.body.length-1][0], snake_black.body[snake_black.body.length-1][1]];
        else 
            tail = [snake_white.body[snake_white.body.length-1][0], snake_white.body[snake_white.body.length-1][1]];

        for (let i = 0; i < moves.length; i++) {
            makeMove(moves[i], turn);
            cur_player = !cur_player;
            let val;
            if (!cur_player)
                val = -negaMax(turn + 1, deep - 1);
            else
                val = -negaMax(turn, deep - 1);
            cur_player = !cur_player;
            deleteMove(turn, tail);
            if (val > max_val) {
                max_val = val;
                if (deep === global_depth) { 
                    best = moves[i];
                }
            }
        }
        return max_val;
    }
    
    // eval function 
    function evaluate(): number {
        if (!cur_player)
            return snake_black.evaluate() - snake_white.evaluate();
        else
            return snake_white.evaluate() - snake_black.evaluate();
    }
    
    // generate moves
    function genMoves() {
        if (!cur_player)
            return snake_black.genLegalMoves();
        else
            return snake_white.genLegalMoves();
    }

    // generate move
    function makeMove(dire: number, turn: number) {
        if (!cur_player) {
            snake_black.direction = dire;
            snake_black.go(turn);
        }
        else {
            snake_white.direction = dire;
            snake_white.go(turn);
        }
    }
    
    // delete move
    function deleteMove(turn: number, tail: [number, number]) {
        if (!cur_player) {
            snake_black.goBack(turn, tail);
        }
        else {
            snake_white.goBack(turn, tail);
        }
    }
}



