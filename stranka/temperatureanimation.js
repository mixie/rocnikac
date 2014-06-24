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
	this.setsLen=[];
 	for (var i = 0; i < this.dataHandler.selected.length; i++) {
 		this.sets[this.dataHandler.selected[i]]=glob.svg.set();
 		this.setsLen[this.dataHandler.selected[i]]=0;
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
	this.rectColor=new SVG.Color("#f08").morph("#FFFFFF");
	this.rect={
		outX:500,
		sizex:20,
		sizey:20,
		color:"#f08",
		color_fade:"#FFFFFF",
		dist:100
	}
}

temperatureanimation.prototype.setLen=function(set){
	console.log(set);
	console.log(set.get(0));
	return set.index(set.last())+1; //BUG
}

temperatureanimation.prototype.addToSet=function  (setIndex,content) {
	this.sets[setIndex].add(content);
	this.setsLen[setIndex]+=1;
	return;
}

temperatureanimation.prototype.newDS=function(value) {
	console.log(this.sets);
	var tr=true;
	var temp=this;
	var DSlabel=glob.svg.text(this.dataHandler.DStoText(value)).move(this.DSlabels.x, this.rect.dist*this.DSlabels.counter);
	$('#stop').click(function() {
		temp.DSlabel.stop();	
	});
	this.DSlabels.counter++;
	this.addToSet(value.numDS,DSlabel);
	console.log(this.sets[value.numDS].get(0));
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
	var diff=value.valDS-this.setsLen[value.numDS];
	var newSet=glob.svg.set();
	if(diff>0){
		for(var j=value.valDS-diff;j<value.valDS;j++){
			var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.sizex*j,this.rect.dist*value.numDS)
			.radius(5)
			.fill(this.rectColor.at(0).toHex);
			this.addToSet(value.numDS, rect);
			newSet.add(rect);
		}
		newSet.animate(2000,'=',2000).fill(this.rectColor.at(1).toHex()).during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			temp.globalAfterActions(value);
		})
	}
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



temperatureanimation.prototype.globalAfterActions=function(value){
	var temp=this;
	for(var i=0;i<this.sets.length;i++){
		this.sets[i].each(function() {
			if(temp.sets[i].index(this)!=0){
				console.log(this);			
				console.log("rx:"+this.attr('rx'));
				this.radius(this.attr('rx')+1);
			}
		});
	}
	animation.prototype.globalAfterActions.call(this,value);
}
