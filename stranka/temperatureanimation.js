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
	this.rectSet=glob.svg.set();
 	for (var i = 0; i < this.dataHandler.selected.length; i++) {
 		this.sets[this.dataHandler.selected[i]]=glob.svg.set();
 		this.setsLen[this.dataHandler.selected[i]]=0;
 	}
 	console.log(this.sets[0]);
	this.DSlabels={
		x:10,y:100,color:'#f08',size:1,counter:0
	}
	this.animConstants={
		length:1000,
		delay:1000,
		type:'='
	}
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
	console.log("SET1:"+this.sets[setIndex]+"setIndex"+setIndex);
	this.setsLen[setIndex]+=1;
	return;
}

temperatureanimation.prototype.newDS=function(value) {
	console.log(this.sets);
	var tr=true;
	var temp=this;
	var DSlabel=glob.svg.text(this.dataHandler.DStoText(value)).move(this.DSlabels.x, this.rect.dist*this.DSlabels.counter);
	$('#stop').click(function() {
		DSlabel.stop();	
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
	console.log(value.numDS);
	if(diff>0){
		for(var j=value.valDS-diff;j<value.valDS;j++){
			var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.dist+this.rect.sizex*j,this.rect.dist*value.numDS)
			.radius(3)
			.fill(this.rect.color_fade);
			this.addToSet(value.numDS, rect);
			newSet.add(rect);
			this.rectSet.add(rect);
		}
		$("#stop").click(function() {
			newSet.stop();
		});
		newSet.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(this.rect.color)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			temp.globalAfterActions(value);
		});
	}
}

temperatureanimation.prototype.vectorNew=function (value) {
	this.newDS(value);
}

temperatureanimation.prototype.vectorResize=function (value) {
	this.resizeDS(value);
}

temperatureanimation.prototype.vectorOperator=function (value) {
	this.operatorDS(value);
}

temperatureanimation.prototype.operatorDS=function (value) {
	var temp=this;
	console.log("SETS:"+this.sets[value.numDS]);
	var rect=this.sets[value.numDS].get(value.valDS);
	rect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
	.fill(temp.rect.color)
	.during(function () {
		temp.globalDuringActions(value);
	}).after(function  () {
		temp.globalAfterActions(value);
	})
}

temperatureanimation.prototype.vectorPush_back=function (value) {
	var tr=true;
	var temp=this;
	var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.dist+this.rect.sizex*this.setsLen[value.numDS],this.rect.dist*value.numDS)
			.radius(3)
			.fill(this.rect.color_fade);
	this.addToSet(value.numDS, rect);
	this.rectSet.add(rect);
	rect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(temp.rect.color)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			temp.globalAfterActions(value);
		});
}

temperatureanimation.prototype.dequeNew=function (value) {
	this.newDS(value);
}



temperatureanimation.prototype.dequeResize=function (value) {
	this.resizeDS(value);
}

temperatureanimation.prototype.dequeOperator=function (value) {
	this.operatorDS(value);
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

temperatureanimation.prototype.changeColor=function(fill,changeR,changeG,changeB){
	var col=new SVG.Color(fill);
	var color=col.toRgb();
	var rgb = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');
   	rgb[0]=Math.max(rgb[0]-changeR,0);
   	rgb[1]=Math.max(rgb[1]-changeG,0);
   	rgb[2]=Math.max(rgb[2]-changeG,0);
   	var rgbstring="rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
   	col=new SVG.Color(rgbstring);
   	return col.toHex();
}



temperatureanimation.prototype.globalAfterActions=function(value){
	var temp=this;
	this.rectSet.animate(100,"=",100).after(function () {
		temp.rectSet.each(function () {
			var newCol=temp.changeColor(this.attr("fill"),2,2,2);
			this.attr("fill",newCol);
		});
	});
	if(!this.nextButton){
		draw(this.dataHandler,this);
	}else{
		$("#next").click(function () {
			draw(temp.dataHandler, temp);
		})
	}
}
