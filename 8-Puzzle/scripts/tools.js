/*
 * author : Dino
 * content : 一些工具函数
 */


// 获取一个位置对应的坐标
function getPosTop(pos){
    return windowBorder+Math.floor((pos-1)/digitNum) * blockWidth + (Math.floor((pos-1)/digitNum)+1)*blockInterval;
}
function getPosLeft(pos){
    return windowBorder+(pos-1)%digitNum * blockWidth + ((pos-1)%digitNum+1) * blockInterval;
}
function getPosX(pos){
    return Math.floor((pos-1)/digitNum)+1;
}
function getPosY(pos){
    return (pos-1)%digitNum+1;
}
function getPos(x, y){
    return (x-1)*digitNum+y;
}

// 初始化方格内的数字
function init(){
    blockWidth = (windowLength-blockInterval*(digitNum+1)-2*windowBorder) / digitNum;
    let posArr = [];
    if(digitNum===3)
        posArr = init_arr_3;
    else
        posArr = init_arr_4;
    for(let i=1; i<=digitNum*digitNum; i++){
        $("#tar"+i).css("top", getPosTop(i));
        $("#tar"+i).css("left", getPosLeft(i));
        $("#tar"+i).css("width", blockWidth);
        $("#tar"+i).css("height", blockWidth);
        $("#tar"+i).css("font-size", (10/digitNum)*fontSize);

        $("#src"+i).css("top", getPosTop(i));
        $("#src"+i).css("left", getPosLeft(i));
        $("#src"+i).css("width", blockWidth);
        $("#src"+i).css("height", blockWidth);
        $("#src"+i).css("font-size", (10/digitNum)*fontSize);
        if(posArr[i]===digitNum*digitNum){
            $("#src"+i).text("");
        }
        else{
            $("#src"+i).text(posArr[i]);
        }
        if(i===digitNum*digitNum){
            $("#tar"+i).text("");
        }
        else{
            $("#tar"+i).text(i);
        }
        srcArr[i] = posArr[i];
        tarArr[i] = i;
    }
    if(digitNum===3){
        for(let i=10; i<=16; i++){
            $("#tar"+i).css("top", -9999);
            $("#tar"+i).css("left", -9999);

            $("#src"+i).css("top", -9999);
            $("#src"+i).css("left", -9999);
        }
    }
    updColor();
    updArrValue();
}

// 更改数组内的数字
// which: true为tar false为src
function changeArrayValue(which, pos, num){
    if(which){
        tarArr[pos] = num;
    }
    else{
        srcArr[pos] = num;
    }
}

// 对两个位置做一次交换动画 实际上不改变各个方格实际位置
function swap(from, to){
    console.log(from, to);
    let f = $("#src"+from), t = $("#src"+to);
    t.animate({top:getPosTop(from), left:getPosLeft(from)});
    f.animate({top:getPosTop(to), left:getPosLeft(to)}, ()=>{
        let tmp = f.text();
        f.text(t.text());
        t.text(tmp);
        f.animate({top:getPosTop(from), left:getPosLeft(from)}, 0);
        t.animate({top:getPosTop(to), left:getPosLeft(to)}, 0);
        updColor();
    });
}

function move2(){
    if(solPos===0) return;
    let from = findBlock(solArr[solPos]), to = findBlock(solArr[solPos-1])
    let f = $("#src"+from), t = $("#src"+to);
    t.animate({top:getPosTop(from), left:getPosLeft(from)});
    f.animate({top:getPosTop(to), left:getPosLeft(to)}, ()=>{
        let tmp = f.text();
        f.text(t.text());
        t.text(tmp);
        f.animate({top:getPosTop(from), left:getPosLeft(from)}, 0);
        t.animate({top:getPosTop(to), left:getPosLeft(to)}, 0);
        updColor();
        solPos--;
        move2();
    });
}

// 检查数组内数字是否合理
function checkArr(){
    let newSrcArr = [];
    let newTarArr = [];
    for(let i=0; i<=digitNum*digitNum; i++){
        newSrcArr[i] = srcArr[i];
        newTarArr[i] = tarArr[i];
    }
    newSrcArr.sort((x, y)=>{
        return parseInt(x)-parseInt(y);
    });
    newTarArr.sort((x, y)=>{
            return parseInt(x)-parseInt(y);
        }
    );
    for(let i=1; i<=digitNum*digitNum; i++){
        if(newSrcArr[i]!==i || newTarArr[i]!==i){
            console.log(newSrcArr[i], tarArr[i]);
            return false;
        }

    }
    return true;
}

// 交换数组中两个元素
function arrSwap(arr, from, to){
    let index = arr[from];
    arr[from] = arr[to];
    arr[to] = index;
}

// 检查问题是否有解
function checkOk(src, tar){
    let num1 = 0, num2 = 0;
    let c1 = 0, c2 = 0;
    for(let i=1; i<=digitNum*digitNum; i++){
        if(src[i]===digitNum*digitNum){
            c1 = Math.floor((i-1)/digitNum)+1;
        }
        if(tar[i]===digitNum*digitNum){
            c2 = Math.floor((i-1)/digitNum)+1;
        }
        for(let j=i+1; j<=digitNum*digitNum; j++){
            if(src[j]!==digitNum*digitNum && src[i]!==digitNum*digitNum)
                if(src[j]<src[i]) num1++;
            if(tar[j]!==digitNum*digitNum && tar[i]!==digitNum*digitNum)
                if(tar[j]<tar[i]) num2++;
        }
    }
    if(digitNum===4) num1 += Math.abs(c1-c2);
    if(num1%2===num2%2) return true;
    // swal("No Solutions","", "error");
    return false;
}

// 寻找一串数的空格
function findBlock(arr){
    for(let i=1; i<=digitNum*digitNum; i++){
        if(arr[i]===digitNum*digitNum)
            return i;
    }
}

// 更新数组
function updArrValue(){
    for(let i=1; i<=digitNum*digitNum; i++){
        srcArr[i] = parseInt($("#src"+i).text());
        tarArr[i] = parseInt($("#tar"+i).text());
        if(isNaN(srcArr[i])) srcArr[i] = digitNum*digitNum;
        if(isNaN(tarArr[i])) tarArr[i] = digitNum*digitNum;
    }
}

// 更新方格颜色
function updColor(){
    updArrValue();
    for(let i=1; i<=digitNum*digitNum; i++){
        if(tarArr[i]===srcArr[i]){
            $("#src"+i).css("background-color", fitColor);
        }
        else
            $("#src"+i).css("background-color", unfitColor);
    }
}

// 更新运行数据
function updResult(){
    swal("OHHHHHH~", "用时: "+(endTime-beginTime)+"ms\n"+"遍历次数: "+depth+"次\n"+"共需 "+steps+"步", "success");
    $("#before").text($("#time").text());
    $("#time").text(endTime-beginTime);
    $("#depth").text(depth);
    $("#steps").text(steps);
}

function equ(x, y){
    for(let i=1; i<=digitNum*digitNum; i++) {
        if (x[i] !== y[i])
            return false;
    }
    return true;
}

function copy(x){
    let arr = [];
    for(let i=1; i<=digitNum*digitNum; i++){
        arr[i] = x[i];
    }
    return arr;
}