"use strict";
/**
 * 蛇
 */
const config = {
    GRID: 0,
    BLOCK: 1,
    BLACK: 2,
    WHITE: 3,
    COLORS: ["#54a0ff", "#00b894", "#2d3436", "#f5f6fa"],
    HUMAN: 0,
    AB: 1,
    MINMAX: 2,
    Width: 15,
    Height: 15,
    MAX_DEEP: 16,
    TIME_LIMIT: 1000
};
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const INF = 1000000000000;
const WIN_SCROE = 1000000;
const WINDOW = 100;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
let height = 10;
let width = 10;
let startTime;
let endTime;
let map = [];
let snake_black;
let snake_white;
let turn = 0;
let cur_player = false;
let best = 2;
let depth = 12;
let search_flg = true;
// mcts 
function mctsSearch() {
    return MCTS.monte_carlo_tree_search(cur_player, snake_black, snake_white, turn);
}
// alpha-beta pruning
function abSearch() {
    startTime = new Date().getTime();
    endTime = new Date().getTime();
    depth = 2;
    let alpha = -INF, beta = INF;
    search_flg = true;
    let cur_best = 2;
    while (endTime - startTime < config.TIME_LIMIT) {
        let val = alphaBeta(turn, depth, alpha, beta);
        if (search_flg) {
            cur_best = best;
            // 有杀棋，返回最短步数。
            if (val > WIN_SCROE) {
                break;
            }
        }
        else {
            break;
        }
        // 每次加2，否则奇数层相当于自己多走了一次
        depth += 2;
        endTime = new Date().getTime();
    }
    return cur_best;
}
// parse input json info
var readline = require('readline');
process.stdin.resume();
process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
    input: process.stdin
});
rl.on('line', function (line) {
    var _a;
    // 解析读入的JSON
    var input = JSON.parse(line);
    // 获取地图长宽
    width = input.requests[0].height;
    height = input.requests[0].width;
    // init map
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(config.GRID);
        }
        map[i] = row;
    }
    // 蛇的初始化信息
    let x = input.requests[0].x;
    if (x == 1) {
        // 左上角
        snake_black = new Snake(map, config.BLACK, false);
        snake_white = new Snake(map, config.WHITE, false);
    }
    else {
        // 右下角
        snake_black = new Snake(map, config.WHITE, false);
        snake_white = new Snake(map, config.BLACK, false);
    }
    let obsCount = (_a = input.requests[0]["obstacle"]) === null || _a === void 0 ? void 0 : _a.length;
    // 处理地图障碍物
    if (obsCount && input.requests[0]["obstacle"])
        for (let i = 0; i < obsCount; i++) {
            let oy = input.requests[0]["obstacle"][i]["x"];
            let ox = input.requests[0]["obstacle"][i]["y"];
            map[ox - 1][oy - 1] = config.BLOCK;
        }
    // 根据历史信息恢复现场
    let total = input.responses.length;
    for (let i = 0; i < total; i++) {
        turn = i + 1;
        let dire = input.responses[i]["direction"];
        snake_black.direction = getDire(dire);
        snake_black.go(turn);
        // 动
        dire = input.requests[i + 1]["direction"];
        snake_white.direction = getDire(dire);
        snake_white.go(turn);
    }
    // 搜索
    turn = total + 1;
    // abSearch();
    let myAction = {
        "direction": reverseDire(mctsSearch()) // reverseDire(best)
    };
    process.stdout.write(JSON.stringify({
        response: myAction,
        debug: {
            dire: best,
            "深度": depth
        }
    }));
    // 退出程序
    process.exit(0);
});
// correct the input direction
function getDire(dir) {
    switch (dir) {
        case 0:
            return LEFT;
        case 1:
            return DOWN;
        case 2:
            return RIGHT;
        default:
            return UP;
    }
}
function reverseDire(dir) {
    switch (dir) {
        case 0:
            return 3;
        case 1:
            return 1;
        case 2:
            return 0;
        default:
            return 2;
    }
}
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
    if (!moves.length)
        return evaluate() - WIN_SCROE;
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
        if (val >= beta)
            return beta;
        if (val > alpha) {
            alpha = val;
            if (deep === depth) {
                best = moves[i];
            }
        }
    }
    return alpha;
}
class Snake {
    constructor(map, color, copy) {
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
            this.body[0] = [height - 1, width - 1];
            this.direction = LEFT;
        }
        this.printSnake();
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
        if (x >= height || x < 0)
            return false;
        if (y >= width || y < 0)
            return false;
        if (this.map[x][y] != config.GRID)
            return false;
        return true;
    }
    // evaluate function
    evaluate() {
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
                val += vis[x][y] >= (height + width) * 0.65 ? 0.5 : 1;
                // val += 1;
                queue[tail++] = [x, y];
            }
        }
        return 100 * val;
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
var MCTS;
(function (MCTS) {
    const SIM_TIMES = 10;
    let player; // root player
    let root;
    let c = 2;
    let nodes = [];
    let debug_sim = 0;
    class Node {
        constructor(cur_player, cur_snake, opp_snake, par, turn) {
            this.cur_player = false;
            this.win = 0;
            this.tot = 0;
            this.childs = [];
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
    function monte_carlo_tree_search(cur_player, cur_snake, opp_snake, turn) {
        player = cur_player;
        // create root node
        root = new Node(cur_player, copy(cur_snake), copy(opp_snake), -1, turn);
        nodes = [];
        nodes.push(root);
        root.win += runSimulate(root);
        root.tot += 1;
        // loop
        let startTime = new Date().getTime();
        let endTime = new Date().getTime();
        debug_sim = 0;
        while (endTime - startTime < config.TIME_LIMIT) {
            endTime = new Date().getTime();
            treePolicy();
        }
        // console.log("sim done", debug_sim);
        // console.log("space", cur_snake.evaluate());
        // console.log("node num", nodes.length);
        // find best move 
        let val = 0, best = 2;
        for (let i = 0; i < root.childs.length; i++) {
            if (nodes[root.childs[i]].tot > val) {
                best = root.moves[i];
                val = nodes[root.childs[i]].tot;
            }
        }
        // console.log(nodes[0].win, nodes[0].tot);
        // for(let i=0; i<root.childs.length; i++) console.log(root.moves[i], nodes[root.childs[i]].win, nodes[root.childs[i]].tot);
        return best;
    }
    MCTS.monte_carlo_tree_search = monte_carlo_tree_search;
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
            if (index == -1) {
                // console.log(cur_num);
                let win = cur.cur_player == player ? 0 : 1;
                backpropagation(cur, win, SIM_TIMES);
                return;
            }
            // go down
            cur_num = cur.childs[index];
        }
    }
    // expand node
    function expand(cur_index) {
        let cur = nodes[cur_index];
        let move = cur.moves[cur.childs.length];
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
        cur.childs.push(nodes.length - 1);
        // backtracing
        backpropagation(expand_node, runSimulate(expand_node), SIM_TIMES);
    }
    // Backpropagation
    function backpropagation(cur, win, tot) {
        while (cur !== undefined) {
            cur.win += win;
            cur.tot += 1;
            cur = nodes[cur.par];
        }
    }
    // simulate
    function defaultPolicy(cur_snake, opp_snake, cur_player, turn) {
        debug_sim++;
        let moves;
        let sim_turn = turn;
        let sim_cur_snake = copy(cur_snake);
        let sim_opp_snake = copy(opp_snake);
        sim_cur_snake.map = sim_opp_snake.map;
        // console.log("-----------------------------", cur_player, player);
        while (true) {
            // console.log("我", JSON.parse(JSON.stringify( sim_cur_snake)));
            // console.log("他",JSON.parse(JSON.stringify( sim_opp_snake)));
            moves = sim_cur_snake.genLegalMoves();
            if (!moves.length) {
                // console.log(cur_player != player, "我输了");
                return cur_player != player;
            }
            sim_cur_snake.direction = moves[GetRandNum(0, moves.length - 1)];
            sim_cur_snake.go(sim_turn);
            if (cur_player)
                sim_turn++;
            moves = sim_opp_snake.genLegalMoves();
            if (!moves.length) {
                // console.log(cur_player == player,"他输了");
                return cur_player == player;
            }
            sim_opp_snake.direction = moves[GetRandNum(0, moves.length - 1)];
            sim_opp_snake.go(sim_turn);
            if (!cur_player)
                sim_turn++;
        }
    }
    // run multiple simulate
    function runSimulate(expand_node) {
        let win = 0;
        for (let i = 0; i < SIM_TIMES; i++) {
            win += defaultPolicy(expand_node.cur_snake, expand_node.opp_snake, expand_node.cur_player, expand_node.turn) ? 1 : 0;
        }
        return win / SIM_TIMES;
    }
    // calculate UCT value
    function getUct(cur_player, Qi, Ni, N) {
        // return Qi / Ni + Math.sqrt(c * Math.log(N) / Math.log(Math.E) / Ni);
        if (cur_player == player)
            return Qi / Ni + Math.sqrt(c * Math.log(N) / Math.log(Math.E) / Ni);
        else
            return (1 - Qi / Ni) + Math.sqrt(c * Math.log(N) / Math.log(Math.E) / Ni);
    }
    // get a random integer
    function GetRandNum(min, max) {
        let range = max - min + 1;
        let ranValue = min + Math.floor(Math.random() * range);
        return ranValue;
    }
    // deep copy a snake Type
    function copy(src) {
        let tmp = new Snake([], src.head_color, true);
        tmp.map = JSON.parse(JSON.stringify(src.map));
        tmp.body = JSON.parse(JSON.stringify(src.body));
        tmp.body_color = src.body_color;
        tmp.direction = src.direction;
        tmp.head_color = src.head_color;
        return tmp;
    }
    // randomly sort a array
    function randomShuffle(array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
})(MCTS || (MCTS = {}));
