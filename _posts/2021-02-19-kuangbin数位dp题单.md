---
title: kuangbin数位dp题单
description: 
date: 2021-02-19 23:13:00
categories:
 - 动态规划
tags:
 - 动态规划 
mathjax: true
---

> 题单地址：[[kuangbin带你飞]专题1-23](https://vjudge.net/article/187)

<!--more-->

## HDU 2089 不要62

可以当做数位dp的模板题。$dp[i][j]$表示i位，且首位为j的数字个数，排除掉相邻两数为62与含有4的数字即可。

**代码**
```c++
#define LOCAL
#include<bits/stdc++.h>
#define INF 0x3f3f3f3f
#define debug(msg) cout << (msg) << endl
#define FOR(i, a, b) for (int i=a; i<=(b); i++)
#define ROF(i, a, b) for (int i=a; i>=(b); i--)
#define pb(x) push_back(x) 
#define ALL(x) x.begin(), x.end()
#define RALL(x) x.rbegin(), x.rend()
#define sz(x) (ll)x.size()
#define JUDGE(x) if(x) cout << "YES\n"; else cout << "NO\n";
using namespace std;
typedef long long ll;
const ll mod = 1e8+7;
const int maxn = 200005;
ll dp[15][10];
int a[15];
void init(){
    FOR(i, 0, 9) dp[1][i] = 1;
    dp[1][4] = 0;
    FOR(i, 1, 10){
        FOR(j, 0, 9){
            FOR(k, 0, 9){
                dp[i][j] += dp[i-1][k];
            }
            if(j==6) dp[i][j] -= dp[i-1][2];
            if(j==4) dp[i][j] = 0;
        }
    }
}
ll get(int x){
    int len = 0;
    ll ans = 0;
    while(x){
        a[++len] = x%10;
        x /= 10;
    }
    FOR(i, 1, len-1){
        FOR(j, 1, 9){
            ans += dp[i][j];
        }
    }
    FOR(i, 1, a[len]-1) ans += dp[len][i];
    if(a[len]==4) return ans;
    ROF(i, len-1, 1){
        FOR(j, 0, a[i]-1){
            if(!(a[i+1]==6 && j==2))ans += dp[i][j];
        }
        if((a[i+1]==6 && a[i]==2) || a[i]==4) return ans;
    }
    if(len) ans++; 
    return ans;
}
int main() {
	#ifdef LOCAL
		freopen("in.txt", "r", stdin);
    	freopen("out.txt", "w", stdout);
	#endif
    int a, b;
    init();
    while(cin >> a >> b && a+b){
        cout << get(b)-get(a-1) << endl;
    }
    return 0;
}
```
---
## HDU 3555 Bomb

$dp[i][j]$表示i位，且首位为j的数字个数

初始化: 当枚举到第i位数字为j时，$dp[i][j]=\sum_{0\leq k\leq 9}dp[i-1][k]$，再特判一下当j为4，k为9时，方案数应该为$10^{i-2}$

计算：前半部分还是常规计算，之后当枚举数字的每一位时，如果出现i位为9，i+1位为4，此时$ans$应该加上$x\%10^{i-1}+1$并结束计算

**代码**
```c++
#define LOCAL
#include<bits/stdc++.h>
#define INF 0x3f3f3f3f
#define debug(msg) cout << (msg) << endl
#define FOR(i, a, b) for (ll i=a; i<=(b); i++)
#define ROF(i, a, b) for (ll i=a; i>=(b); i--)
#define pb(x) push_back(x) 
#define ALL(x) x.begin(), x.end()
#define RALL(x) x.rbegin(), x.rend()
#define sz(x) (ll)x.size()
#define JUDGE(x) if(x) cout << "YES\n"; else cout << "NO\n";
using namespace std;
typedef long long ll;
const ll mod = 1e8+7;
const ll maxn = 200005;
ll dp[20][10];
ll a[20];
ll p(ll i){
    if(i==0) return 1;
    else return 10*p(i-1);
}
void init(){
    FOR(i, 2, 15){
        FOR(j, 0, 9){
            FOR(k, 0, 9){
                 dp[i][j] += dp[i-1][k];
            }
            if(j==4){
                dp[i][j] -= dp[i-1][9];
                dp[i][j] += p(i-2);
            }
        }
    }
}
ll get(ll x){
    ll t = x;
    ll len = 0, ans = 0;
    while(x) a[++len] = x%10, x /= 10;
    FOR(i, 1, len-1){
        FOR(j, 1, 9){
            ans += dp[i][j];
        }
    }
    FOR(i, 1, a[len]-1) ans += dp[len][i];
    ROF(i, len-1, 1){
        FOR(j, 0, a[i]-1){
            ans += dp[i][j];
        }
        if(a[i+1]==4 && a[i]==9){
            ans += t%p(i-1)+1;
            return ans;
        }
    }
    return ans;
}
int main() {
	#ifdef LOCAL
		freopen("in.txt", "r", stdin);
    	freopen("out.txt", "w", stdout);
	#endif
    init();
    ll T;
    cin >> T;
    while(T--){
        ll x;
        cin >> x;
        cout << get(x) << endl;
    }
    return 0;
}
```