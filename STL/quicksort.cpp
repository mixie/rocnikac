#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

vector<int> a;

int pivot(int zac, int kon){
	srand(time(NULL));
	int piv= rand() % (kon-zac) + zac;
	return piv;
}

void quick(int zac, int kon){
	if (kon-zac>1){
	int piv = a[pivot(zac,kon)];
	int mensie = 0;
	int rovnake = 0;
	for(int i=zac;i<kon;i++){
		if (a[i]<piv){
			swap(a[zac+mensie],a[i]);
			mensie++;
		}	
	}
	for(int i=zac+mensie;i<kon;i++){
		if(a[i]==piv){
			swap(a[i],a[zac+mensie+rovnake]);
			rovnake++;
		}
	}
	quick(zac,mensie);
	quick(zac+rovnake,kon);
	}
}

void hore(int poc){
	while ((poc!=0)&&(a[poc]>a[poc/2])){
		swap(a[poc],a[poc/2]);
		poc=poc/2;
	}	
}


int main(){
	a.resize(30);
	for(int i=0;i<30;i++){
		a[i]=i;	
	}
	random_shuffle(a.begin(),a.end());
	quick(0,30);
	return 0;
}
