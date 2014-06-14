#ifndef COUNTER_H
#define COUNTER_H

#include <iostream>
#include <cstdio>

class Counter
{
public:
	int number;
	static int c;
	Counter(){
    number=c++;
  }
  int getNumber(){
  		//std::cout << "ahoj\n";
  		return number;
  }
};
int Counter::c = 0;

#endif 
