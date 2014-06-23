temperatureanimation.prototype = Object.create(animation.prototype);

temperatureanimation.prototype.constructor=animation;

function temperatureanimation(haveLabels,dataHandler,nextButton) {	
	this.haveLabels=haveLabels;
	this.dataHandler=dataHandler;
	this.label=null;
	this.x=100;
	this.y=200;
	this.color='#f06';
	this.size=1;
	this.nextButton=nextButton;
	if(this.haveLabels==true){
		this.label=glob.svg.text("").move(this.x,this.y).fill(this.color).scale(this.size,this.size); //glob.svg.text("").move(x,y).fill(color).scale(size,size);
	}
	this.sets=[];
 	for (var i = 0; i < this.dataHandler.selected.length; i++) {
 		this.sets[this.dataHandler.selected[i]]=glob.svg.set();
 	}
 	console.log(this.sets);
	this.DSlabels={
		x:10,y:100,color:'#f08',size:1,counter:0
	}
	this.animConstants={
		length:1000,
		delay:1000,
		type:'='
	}
	this.outX=500;
}

temperatureanimation.prototype.setLen=function(set){
	console.log(set);
	return set.index(set.last())+1; //BUG
}

temperatureanimation.prototype.newDS=function(value) {
	console.log(this.sets);
	var tr=true;
	var temp=this;
	var DSlabel=glob.svg.text(this.dataHandler.DStoText(value)).move(this.DSlabels.x, this.DSlabels.y*this.DSlabels.counter);
	$('#stop').click(function() {
		temp.DSlabel.stop();	
	});
	this.DSlabels.counter++;
	this.sets[value.numDS].add(DSlabel);
	DSlabel.animate(this.animConstants.length,this.animConstants.type,this.animConstants.delay)
	.during(function() {
		if(tr){
			tr=false;
			temp.globalDuringActions(value);	
		}
	}).after(function() {
		temp.globalAfterActions(value);
	})
}

temperatureanimation.prototype.resizeDS=function(value){
	var tr=true;
	var temp=this;
	console.log(value.numDS);
	console.log(this.setLen(this.sets[value.numDS]));
}

temperatureanimation.prototype.vectorNew=function (value) {
	this.newDS(value);
}

temperatureanimation.prototype.vectorResize=function (value) {
	this.resizeDS(value);
}

temperatureanimation.prototype.vectorOperator=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.vectorPush_back=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequeNew=function (value) {
	this.newDS(value);
}


temperatureanimation.prototype.dequeResize=function (value) {
	this.resizeDS(value);
}

temperatureanimation.prototype.dequeOperator=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequePush_back=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequePush_front=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequeFront=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequeBack=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequePop_back=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequePop_front=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.setNew=function (value) {
	this.newDS(value);
}

temperatureanimation.prototype.setInsert=function (value) {
	this.zobraz_label(value);
}


temperatureanimation.prototype.zobraz_label=function(value){
	var tr=true;
	var temp=this;
	$('#stop').click(function() {
		temp.label.stop();	
	});
	this.label.animate(1000, '>', 1000)
	.during(function() {
		if(tr){
			tr=false;
			temp.globalDuringActions(value);	
		}
	})
	.after(function(){
		temp.globalAfterActions(value);
	});
}
