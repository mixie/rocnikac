#include <vector>
#include <algorithm>
#include <cstdio>

/**#include <set>
#include <deque>**/


#include <iostream>

//#include "string"

using namespace std;

int main(){
	vector<long long int> a;
	a.resize(50);
	for(int i=0;i<50;i++){
		a[i]=i;
	}
	random_shuffle(a.begin(),a.end());
	for(int i=0;i<50;i++){
		printf("%lld\n", a[i]);
	}
	sort(a.begin(), a.end());
	for(int i=0;i<50;i++){
		printf("%lld\n", a[i]);
	}
}