function data(values,selected,dataStructs) {
	this.values=values;
	this.selected=selected;
	this.dataStructs=dataStructs;
	this.i=0;
	this.numberOfProcessed=ArrayAlloc();
}

data.prototype.ArrayAlloc()=function() {
	var a=[];
	for(i=0;i<selected.length;i++){
		a.push(0);
	}
	return a;
}

data.prototype.getN()=function() {
	return values.length;
}

data.prototype.resetIterator()=function() {
	i=0;
}

data.prototype.Next()=function() {
	while(i<getN() && selected.indexOf(values[i].numDS)==-1){
			i++;
		}
	if(i==getN()){
		return null;
	}else{
		numberOfProcessed[values[i].numDS]+=1;
		return values[i];
	}
}

data.prototype.haveNext()=function(){
	while(i<getN() && selected.indexOf(values[i].numDS)==-1){
			i++;
	}
	if(i==getN()){
		return false;
	}else{
		return true;
	}
}

data.prototype.toString()=function(value) {
	return dataStructs[value.numDS].name + value.numDS + value.funDS + value.valDS;
}

**************************************