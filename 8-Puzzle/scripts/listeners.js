/*
 * author : Dino
 * content : 事件监听器
 */


$("#confirm").click(()=>{
    if(changeable){
        if(!checkArr()){
            swal("Oops", "something wrong with the digits", "error");
            return;
        }
        if(!checkOk(srcArr, tarArr)){
            swal("No Solutions","", "error");
            return;
        }
        updColor();
        changeable = false;
        $("#confirm").text("reset");
        saveStatus();
    }
    else{
        init();
        solPos = 0;
        solArr = [];
        changeable = true;
        swal("Success", "Reset the numbers now!", "success");
        $("#confirm").text("confirm");
    }
});

$("#next").click(()=>{
    if(changeable) return;
    if(solPos!==0){
        swap(findBlock(solArr[solPos]), findBlock(solArr[solPos-1]));
        solPos--;
    }
});

$("#pre").click(()=>{
    if(changeable) return;
    if(solPos!=solArr.length-1){
        swap(findBlock(solArr[solPos]), findBlock(solArr[solPos+1]));
        solPos++;
    }
});

$("#play").click(()=>{
    move2();
});

$("#title").click(()=>{
    if(!changeable) return;
    if(digitNum===3){
        $("#title").text("🎲 15-Puzzle 🎲");
        digitNum = 4;
        init();
    }
    else{
        $("#title").text("🎲 8-Puzzle 🎲");
        digitNum = 3;
        init();
    }
});

$("[name=algorithm]").change(function(){
    if(!changeable){
        $("input[type=radio][name=algorithm][value='"+method+"']").prop("checked", true);
        return;
    }
    let checked = $('[name=algorithm]:checked');
    method = checked.val();
})

$("[name=heuristic]").change(function(){
    if(!changeable) {
        $("input[type=radio][name=heuristic][value='"+heuristic+"']").prop("checked", true);
        return;
    }
    let checked = $('[name=heuristic]:checked');
    heuristic = checked.val();
})

// target part
$('#tar1').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar1");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 1, to);
});

$('#tar2').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar2");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 2, to);
});

$('#tar3').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar3");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 3, to);
});

$('#tar4').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar4");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 4, to);
});

$('#tar5').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar5");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 5, to);
});

$('#tar6').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar6");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 6, to);
});

$('#tar7').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar7");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 7, to);
});

$('#tar8').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar8");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 8, to);
});

$('#tar9').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar9");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 9, to);
});

$('#tar10').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar10");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 10, to);
});

$('#tar11').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar11");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 11, to);
});

$('#tar12').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar12");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 12, to);
});

$('#tar13').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar13");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 13, to);
});

$('#tar14').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar14");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 14, to);
});

$('#tar15').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar15");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 15, to);
});

$('#tar16').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#tar16");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(true, 16, to);
});

// src part
$('#src1').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src1");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 1, to);
});

$('#src2').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src2");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 2, to);
});

$('#src3').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src3");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 3, to);
});

$('#src4').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src4");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 4, to);
});

$('#src5').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src5");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 5, to);
});

$('#src6').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src6");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 6, to);
});

$('#src7').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src7");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 7, to);
});

$('#src8').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src8");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 8, to);
});

$('#src9').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src9");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 9, to);
});

$('#src10').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src10");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 10, to);
});

$('#src11').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src11");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 11, to);
});

$('#src12').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src12");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 12, to);
});

$('#src13').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src13");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 13, to);
});

$('#src14').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src14");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 14, to);
});

$('#src15').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src15");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 15, to);
});

$('#src16').bind('mousewheel DOMMouseScroll',   function (event) {
    if(!changeable) return;
    let delta = event.originalEvent.wheelDelta;
    let obj = $("#src16");
    let num = parseInt(obj.text()), to;
    if(isNaN(num)) num = digitNum*digitNum;
    if(delta>0){
        to = num % (digitNum*digitNum) + 1;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    else{
        to = num-1;
        if(to===0) to = digitNum*digitNum;
        if(to===digitNum*digitNum) obj.text("");
        else obj.text(to);
    }
    changeArrayValue(false, 16, to);
});
