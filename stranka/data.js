function dataHandler(selected,dataStructs) {
	this.values=glob.data;
	console.log(glob.data);
	this.selected=selected;
	this.dataStructs=dataStructs;
	this.i=0;
	this.numberOfProcessed;
	numberOfProcessed=[];
	for(i=0;i<this.dataStructs.length;i++){
		numberOfProcessed.push(0);
	}
}

dataHandler.prototype.getN=function() {
	return this.values.length;
}

dataHandler.prototype.resetIterator=function() {
	i=0;
}

dataHandler.prototype.next=function() {
	while(i<this.getN() && this.selected.indexOf(this.values[i].numDS)==-1){
			i++;
		}
	if(i==this.getN()){
		return null;
	}else{
		numberOfProcessed[this.values[i].numDS]+=1;
		return this.values[i];
	}
}

dataHandler.prototype.haveNext=function(){
	while(i<this.getN() && this.selected.indexOf(this.values[i].numDS)==-1){
			i++;
	}
	if(i==this.getN()){
		return false;
	}else{
		return true;
	}
}

dataHandler.prototype.getName=function (value) {
	return this.dataStructs[value.numDS].name;
}

dataHandler.prototype.toString=function(value) {
	return this.dataStructs[value.numDS].name + value.numDS + value.funDS + value.valDS;
}