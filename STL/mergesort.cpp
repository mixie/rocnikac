#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

vector<int> a;
vector<int> pom;

void mergesort(int zac, int kon){
	if(zac!=kon-1){
		int stred=(kon+zac)/2;
		mergesort(zac,stred);
		mergesort(stred,kon);
		int cast1=zac;
		int cast2=stred;
		while ((cast1<stred)&&(cast2<kon)){
			if (a[cast1]<a[cast2]){
				pom[cast1-zac+cast2-stred]=a[cast1];
				cast1++;
			}else{
				pom[cast1-zac+cast2-stred]=a[cast2];
				cast2++;
			}
		}
		while(cast1<stred){
			pom[cast1-zac+cast2-stred]=a[cast1];
			cast1++;
		} 
		while(cast2<kon){
			pom[cast1-zac+cast2-stred]=a[cast2];
			cast2++;
		} 
		for(int i=0;i<(kon-zac);i++) {
			a[zac+i]=pom[i];	
		}		
	}
}

int main (){
	a.resize(10);
	for(int i=0;i<10;i++){
		a[i]=i;	
	}
	pom.resize(10);
	random_shuffle(a.begin(),a.end());
	mergesort(0,10);
	return 0;
}
