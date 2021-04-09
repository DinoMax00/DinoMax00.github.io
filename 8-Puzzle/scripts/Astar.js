/*
 * author : Dino
 * content : A*算法
 */

class AStar{
    constructor(src, tar) {
        // 起始与终止状态
        this.src = src;
        this.tar = tar;
        // 优先队列
        this.openList = new FastPriorityQueue((x, y) => {
            return x.val < y.val;
        })
        // 两个List
        this.openList = new FastPriorityQueue((x, y) => {
            return x.val < y.val;
        })
        this.closeList = [];
        // 路径记录
        this.pre = [];
        // 记录节点是否已被更新
        this.fValue = [];
    }

    // 解题
    sol(){
        depth = 0;
        let ans = this.aStarSearch();
        endTime = +new Date();
        let solList = [];
        let tmp = this.src;
        while(!equ(ans, tmp)){
            solList.push(ans);
            ans = this.pre[ans];
        }
        solList.push(ans);
        return solList;
    }

    H(x){
        if(heuristic==="difference"){
            let ans = 0;
            for(let i=1; i<=digitNum*digitNum; i++)
                if(x[i]!==this.tar[i])
                    ans++;
            return ans;
        }
        else if(heuristic==="manhattan"){
            let ans = 0;
            for(let i=1; i<=digitNum*digitNum; i++){
                pos[this.tar[i]] = i;
            }
            for(let i=1; i<=digitNum*digitNum; i++){if(x[i]===digitNum*digitNum) continue;
                ans += Math.abs(getPosX(i)-getPosX(pos[x[i]]))+Math.abs(getPosY(i)-getPosY(pos[x[i]]));
            }
            return ans;
        }
        else if(heuristic==="fast"){
            let ans = 0;
            for(let i=1; i<=digitNum*digitNum; i++){
                pos[this.tar[i]] = i;
            }
            for(let i=1; i<=digitNum*digitNum; i++){if(x[i]===digitNum*digitNum) continue;
                ans += Math.abs(getPosX(i)-getPosX(pos[x[i]]))+Math.abs(getPosY(i)-getPosY(pos[x[i]]));
            }
            return 4*ans;
        }
        return 0;
    }

    // 优先队列实现
    aStarSearch(){
        let topNode = new StatusNode(this.src);
        topNode.val = this.H(this.src);
        this.openList.add(topNode);
        while(!this.openList.isEmpty()){
            depth++;
            let top = this.openList.poll();
            // 查询是否重复更新
            if(this.closeList[top.status]) continue;
            this.closeList[top.status] = true;
            // 是不是找到了
            if(equ(top.status, this.tar))
                return top.status;
            // 遍历
            for(let i=0; i<4; i++){
                let x = top.posX+px[i];
                let y = top.posY+py[i];
                let pos = getPos(x, y);
                if(x<1 || x>digitNum || y<1 || y>digitNum)
                    continue;
                // 获取新节点数组
                let newStatus = copy(top.status);
                arrSwap(newStatus, top.pos, pos);
                // 是不是在closeList里
                if(this.closeList[newStatus]===true){
                    continue;
                }
                // 更新
                let newNode = new StatusNode(newStatus);
                newNode.step = top.step+1;
                newNode.val = top.step+1+this.H(newNode.status);
                // 检查入队条件
                if(this.fValue[newStatus]===undefined || newNode.val < this.fValue[newStatus]){
                    this.pre[newNode.status] = top.status;
                    this.openList.add(newNode);
                    this.fValue[newStatus] = newNode.val;
                }
            }
        }
        return undefined;
    }
}