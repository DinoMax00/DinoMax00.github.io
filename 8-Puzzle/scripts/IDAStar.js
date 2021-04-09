/*
 * author : Dino
 * content : A*算法
 */
class IDAStar{
    constructor(src, tar) {
        this.startStatus = src;
        this.tarStatus = tar;
        this.limit = 0;
        this.solList = [];
        this.step = 0;
        this.blockPos = 0;
        for(let i=1; i<=digitNum*digitNum; i++){
            if(this.startStatus[i]===digitNum*digitNum){
                this.blockPos = i;
                break;
            }
        }
    }

    H(x){
        if(heuristic==="difference"){
            let ans = 0;
            for(let i=1; i<=digitNum*digitNum; i++)
                if(x[i]!==this.tarStatus[i])
                    ans++;
            return ans;
        }
        else if(heuristic==="manhattan"){
            let ans = 0;
            for(let i=1; i<=digitNum*digitNum; i++){
                pos[this.tarStatus[i]] = i;
            }
            for(let i=1; i<=digitNum*digitNum; i++){if(x[i]===digitNum*digitNum) continue;
                ans += Math.abs(getPosX(i)-getPosX(pos[x[i]]))+Math.abs(getPosY(i)-getPosY(pos[x[i]]));
            }
            return ans;
        }
        else if(heuristic==="fast"){
            let ans = 0;
            let pos = [];
            for(let i=1; i<=digitNum*digitNum; i++){
                pos[this.tarStatus[i]] = i;
            }
            for(let i=1; i<=digitNum*digitNum; i++){if(x[i]===digitNum*digitNum) continue;
                ans += Math.abs(getPosX(i)-getPosX(pos[x[i]]))+Math.abs(getPosY(i)-getPosY(pos[x[i]]));
            }
            return 4*ans;
        }
        return 0;
    }

    sol(){
        depth = 0;
        this.limit = this.H(this.startStatus);
        while(!this.dfs(this.startStatus, -1)){
            this.limit += 2;
        }
        endTime = +new Date();
        return this.solList;
    }

    // 检查有没有找到
    checkFind(arr){
        for(let i=1; i<=digitNum*digitNum; i++){
            if(arr[i] != this.tarStatus[i])
                return false;
        }
        return true;
    }

    // 搜索
    dfs(state, pre){
        depth++;
        // 是不是找到了
        if(this.checkFind(state)){
            this.solList.push(JSON.parse(JSON.stringify(state)));
            return true;
        }
        // 是否要剪枝
        if(this.step+this.H(state) > this.limit) return false;

        let tmpPos = this.blockPos;
        let ok = false;
        // 遍历四个方向 上左下右
        for(let i=1; i<=4; i++){
            // 是否与上一步移动对称
            if(pre!==-1 && Math.abs(pre-i)===2) continue;
            if(i===1){
                if(tmpPos<=digitNum) continue;
                this.blockPos = tmpPos-digitNum;
                this.step++;
                arrSwap(state, tmpPos, this.blockPos);
                ok = this.dfs(state, i);
                arrSwap(state, tmpPos, tmpPos-digitNum);
                this.step--;
                this.blockPos = tmpPos;
            }
            else if(i===2){
                if((tmpPos-1)%digitNum===0) continue;
                this.blockPos = tmpPos-1;
                this.step++;
                arrSwap(state, tmpPos, this.blockPos);
                ok = this.dfs(state, i);
                arrSwap(state, tmpPos, tmpPos-1);
                this.step--;
                this.blockPos = tmpPos;
            }
            else if(i===3){
                if(tmpPos>digitNum*(digitNum-1)) continue;
                this.blockPos = tmpPos+digitNum;
                this.step++;
                arrSwap(state, tmpPos, this.blockPos);
                ok = this.dfs(state, i);
                arrSwap(state, tmpPos, tmpPos+digitNum);
                this.step--;
                this.blockPos = tmpPos;
            }
            else if(i===4){
                if(tmpPos%digitNum===0) continue;
                this.blockPos = tmpPos+1;
                this.step++;
                arrSwap(state, tmpPos, this.blockPos);
                ok = this.dfs(state, i);
                arrSwap(state, tmpPos, tmpPos+1);
                this.step--;
                this.blockPos = tmpPos;
            }
            if(ok) break;
        }
        if(ok){
            this.solList.push(JSON.parse(JSON.stringify(state)));
            return true;
        }
        return false;
    }
}