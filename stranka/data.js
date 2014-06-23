function dataHandler(selected,dataStructs) {
	this.values=glob.data;
	console.log(glob.data);
	this.selected=selected;
	this.dataStructs=dataStructs;
	this.i=0;
	this.numberOfProcessed=[];
	console.log(selected);
	for(var j=0;j<this.selected.length;j++){
		console.log(this.selected[j]);
		this.numberOfProcessed[this.selected[j]]=0;
	}
	console.log(this.numberOfProcessed)
}

dataHandler.prototype.getN=function() {
	return this.values.length;
}

dataHandler.prototype.resetIterator=function() {
	this.i=0;
}

dataHandler.prototype.next=function() {
	while(this.i<this.getN() && this.selected.indexOf(this.values[this.i].numDS)==-1){
			this.i++;
		}
	if(this.i==this.getN()){
		return null;
	}else{
		this.numberOfProcessed[this.values[this.i].numDS]+=1;
		this.i++;
		return this.values[this.i-1];
	}
}

dataHandler.prototype.haveNext=function(){
	while(this.i<this.getN() && this.selected.indexOf(this.values[this.i].numDS)==-1){
			console.log(this.i);
			console.log(this.values[this.i].numDS);
			this.i++;
	}
	if(this.i==this.getN()){
		return false;
	}else{
		console.log("jhdashdkjahdsdsadasdasdasdsa");
		return true;
	}
}

dataHandler.prototype.getName=function (value) {
	return this.dataStructs[value.numDS].name;
}

dataHandler.prototype.toText=function(value) {
	return this.dataStructs[value.numDS].name + value.numDS + value.funDS + value.valDS;
}