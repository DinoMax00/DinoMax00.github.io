/*
 * author : Dino
 * content : 搜索过程中要用到的抽象节点类
 */

class StatusNode{
    constructor(status) {
        // 保存当前场面
        this.status = [];
        // 起点到该状态步数
        this.step = 0;
        // 估值
        this.val = 0;
        // 空格位置
        this.posX = 0;
        this.posY = 0;
        for(let i=1; i<=digitNum*digitNum; i++) {
            this.status[i] = status[i];
        }
        for(let i=1; i<=digitNum*digitNum; i++) {
            if (status[i] === digitNum*digitNum) {
                [this.posX, this.posY] = [getPosX(i), getPosY(i)];
                break;
            }
        }
        this.pos = getPos(this.posX, this.posY);
    }
}
