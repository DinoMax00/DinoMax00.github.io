---
title: AtCoder Beginner Contest 190 E - Magical Ornament Editorial
description: 
date: 2021-01-31 19:03:00
categories:
 - AtCoder
tags: 状态压缩
mathjax: true
---
> 昨晚没注意k的范围，当成1e5的数据量去想，不过ABC的题能考察状态压缩还是挺令人震惊的

<!--more-->

## 题意
给定$n$个点，$m$条无向边，边的长度都看作1。之后给$k$个点，问把这$k$个点都走一遍所需要的最短路程。
## 题解
其实把题意理解后就几乎是状态压缩的模板题，只不过$k$个点两两间的距离没有给出，由于每条边的长度都可以看作1，所以对这$k$个点每个点跑一次$bfs$就可以得出每个点到其余点的最短距离。

用$dp[mask][i]$进行状态压缩dp，$mask$是$k$位的二进制数，第$i$位的0或1表示是否经过这个点。所以这个$dp$数组就表示经过$mask$表示的这些点并且最后走的点是$i$的最短路。如果$mask$的第j位是0，用$next$表示$mask$第$j$位是1的二进制表示，那么经过$mask$表示的点并从$i$出来到达$j$的最短路程为$dp[mask][i]+dis[i][j]$，可以得到状态转移方程：

$$

dp[next][j] = min(dp[next][j], dp[mask][i]+dis[i][j])

$$

得到所有的状态后，最终答案可以用如下方程更新：

$$

ans = \min_{1<=i<=k}(dp[(1<<k)-1][i])

$$

$(1<<k)-1$表示所有点都经过(即11...111)，求一遍以每个点为最后一个点的最小值。

## 代码

```c++
#define LOCAL
#include <bits/stdc++.h>
#define INF 0x3f3f3f3f
#define debug(msg) cout << (msg) << endl
#define FOR(i, a, b) for (int i=a; i<=(b); i++)
#define pb(x) push_back(x) 
#define ALL(x) x.begin(), x.end()
#define RALL(x) x.rbegin(), x.rend()
#define sz(x) (int)x.size()
#define JUDGE(x) if(x) cout << "Yes\n"; else cout << "No\n";
using namespace std;
typedef long long ll;
int n, m, k;
vector<vector<int> > e;
int dis[20][100005], dp[1<<17][20], a[20];
void bfs(int idx){
	queue<int> q;
	dis[idx][a[idx]] = 0;
	q.push(a[idx]);
	while(!q.empty()){
		int u = q.front();
		q.pop();
		for(auto x: e[u]){
			if(!(dis[idx][x]==INF)) continue;
			dis[idx][x] = dis[idx][u]+1;
			q.push(x);
		}
	}
}
int main()
{
	#ifdef LOCAL
		freopen("in.txt", "r", stdin);
    	freopen("out.txt", "w", stdout);
	#endif
	cin >> n >> m;
	e.resize(n+1);
	memset(dp, INF, sizeof(dp));
	memset(dis, INF, sizeof(dis));
	FOR(i, 1, m){
		int x, y;
		cin >> x >> y;
		e[x].pb(y);
		e[y].pb(x);
	}
	cin >> k;
	for(int i=1; i<=k; i++){
		cin >> a[i];
		bfs(i);
	}
	int ans = INF;
	FOR(i, 1, k) dp[1<<(i-1)][i] = 1;
	FOR(i, 1, (1<<k)-1){
		FOR(j, 1, k){
			if(dp[i][j]==INF) continue;
			FOR(x, 1, k){
				if(i&(1<<(x-1))) continue;
				dp[i|(1<<(x-1))][x] = min(dp[i|(1<<(x-1))][x], dp[i][j]+dis[j][a[x]]);
			}
		}
	}
	FOR(i, 1, k) ans = min(ans, dp[(1<<k)-1][i]);
	if(ans==INF) cout << -1 << endl;
	else cout << ans << endl;
	return 0;
}
```