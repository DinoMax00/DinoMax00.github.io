/*
 * author : Dino
 * content : 主体部分
 */

// 8数码 16数码
let digitNum = 3;

// 是否允许修改数组
let changeable = true;

// 起始与目标数组
let srcArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let tarArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 解题流程
let solArr = [];
let solPos = 0;

// 解题方式
let method = "A*";
let heuristic = "manhattan";

// 解题时间、层数与步数
let beginTime;
let endTime;
let depth;
let steps;

let pos = [];

// 初始化方格数字
init();

// 保存新的状态
function saveStatus(){
    beginTime = +new Date();
    if(method==="A*")
        solArr = new AStar(srcArr, tarArr).sol();
    else
        solArr = new IDAStar(srcArr, tarArr).sol();
    solPos = solArr.length-1;
    steps = solPos;
    updResult();
}