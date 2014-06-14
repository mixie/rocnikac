#include <vector>
#include <cstdio>
/**#include <set>
#include <deque>**/


#include <iostream>

//#include "string"

using namespace std;

int main(){
	vector<long long int> a;
	vector<int> b;
	//string be("sa");
//	deque <int> dd;
	//string h("Initial string");
	//string hh();
	//string a;
	//string b="aaaa";
//	set<string> e;
 //	e.insert("haha");
	vector<int> c(3,50);
	vector<int> d(30);
/**	dd.push_front(5);
	dd.push_back(3);
	dd[1]=2;
	dd.pop_front();
	dd.pop_front(); **/
	for(int i=0;i<20;i++){
		printf("%d",d[i]);
	}
	for(int i=0;i<100;i++){
		a.push_back(5);
	}	
	for(int i=0;i<5;i++){
		b.push_back(10);
	}	
	for(int i=0;i<5;i++){
		a[i]=0;
		printf("* %d *",i);
	}
	for(int i=0;i<5;i++){
		b[i]=0;
		printf("* %d *",i);
	}
	for(int i=10;i>=0;i--){
		a[i]=0;
		printf("* %d *",i);
	}		
	printf("**");
	c[0]=0;
	vector <int> ab;
	ab.push_back(3);
	ab.at(0)=3; 
}