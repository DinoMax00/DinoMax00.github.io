/**
 * alpha-beta 搜索
 */
import { config } from "./config.js";
export var ab;
(function (ab) {
    const INF = 100000000;
    const WIN_SCROE = 1000000;
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    let map = [];
    let snake_black;
    let snake_white;
    let cur_player = false;
    let best = 2;
    let startTime;
    let endTime;
    let global_depth = 12;
    let search_flg = false;
    // alpha-beta pruning
    function abSearch(Map, Snake_1, Snake_2, Turn, player) {
        // 初始化
        map = Map;
        snake_black = Snake_1;
        snake_white = Snake_2;
        cur_player = player;
        global_depth = 4;
        let alpha = -INF, beta = INF;
        startTime = new Date().getTime();
        endTime = new Date().getTime();
        search_flg = true;
        let cur_best = 2;
        while (endTime - startTime < config.TIME_LIMIT) {
            let val = alphaBeta(Turn, global_depth, alpha, beta);
            console.log(val);
            if (search_flg) {
                cur_best = best;
                // 有杀棋，返回最短步数。
                if (val > WIN_SCROE) {
                    console.log(global_depth, "杀！！！");
                    break;
                }
            }
            else {
                break;
            }
            // 每次加2，否则奇数层相当于自己多走了一次
            global_depth += 2;
            endTime = new Date().getTime();
        }
        console.log(global_depth);
        return cur_best;
    }
    ab.abSearch = abSearch;
    // eval function 
    function evaluate() {
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
    function makeMove(dire, turn) {
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
    function deleteMove(turn, tail) {
        if (!cur_player) {
            snake_black.goBack(turn, tail);
        }
        else {
            snake_white.goBack(turn, tail);
        }
    }
    // ab
    function alphaBeta(turn, deep, alpha, beta) {
        let moves = [];
        moves = genMoves();
        if (!moves.length) {
            return evaluate() - WIN_SCROE;
        }
        if (deep === 0) {
            return evaluate();
        }
        endTime = new Date().getTime();
        if (endTime - startTime > config.TIME_LIMIT) {
            search_flg = false;
            return evaluate();
        }
        let t = [];
        let tail;
        if (!cur_player)
            tail = [snake_black.body[snake_black.body.length - 1][0], snake_black.body[snake_black.body.length - 1][1]];
        else
            tail = [snake_white.body[snake_white.body.length - 1][0], snake_white.body[snake_white.body.length - 1][1]];
        for (let i = 0; i < moves.length; i++) {
            makeMove(moves[i], turn);
            cur_player = !cur_player;
            let val;
            if (!cur_player)
                val = -alphaBeta(turn + 1, deep - 1, -beta, -alpha);
            else
                val = -alphaBeta(turn, deep - 1, -beta, -alpha);
            cur_player = !cur_player;
            deleteMove(turn, tail);
            if (val >= beta) {
                return beta;
            }
            if (val > alpha) {
                alpha = val;
                if (deep === global_depth) {
                    best = moves[i];
                }
            }
        }
        return alpha;
    }
})(ab || (ab = {}));
