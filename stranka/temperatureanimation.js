temperatureanimation.prototype = Object.create(animation.prototype);

temperatureanimation.prototype.constructor=animation;

function temperatureanimation(haveLabels,dataHandler,nextButton,length,delay) {	
	this.haveLabels=haveLabels;
	this.dataHandler=dataHandler;
	this.nextButton=nextButton;
	this.label=null;
	this.x=100;
	this.y=20;
	this.color='#f06';
	this.size=1;
	this.vybraneConvert=[];
	for(var j=0;j<dataHandler.selected.length;j++){
		console.log(dataHandler.selected[j]+" "+j);
		this.vybraneConvert[dataHandler.selected[j]]=j;
	}
	console.log(this.vybraneConvert);
	if(this.haveLabels==true){
		this.label=glob.svg.text("").move(this.x,this.y).fill(this.color).scale(this.size,this.size); //glob.svg.text("").move(x,y).fill(color).scale(size,size);
	}
	this.sets=[];
	this.nameSet=glob.svg.set();
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
		type:'='
	}
	this.animConstants.length=length;
	this.animConstants.delay=delay;
	this.rect={
		outX:500,
		sizex:15,
		sizey:15,
		color:"#f08",
		color_fade:"#666",
		distx:100,
		disty:50,
		margin:50
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
	console.log(this.sets[setIndex].get(this.setsLen[setIndex]-1));
	console.log("aaa");
	return;
}

temperatureanimation.prototype.newDS=function(value) {
//	console.log(this.sets);
	var tr=true;
	var temp=this;
	var DSlabel=glob.svg.text(this.dataHandler.DStoText(value)).move(this.DSlabels.x, this.rect.margin+this.rect.disty*this.vybraneConvert[value.numDS]).fill("white");
	this.playStopPause(DSlabel);
	this.DSlabels.counter++;
	this.nameSet.add(DSlabel);
	DSlabel.animate(this.animConstants.length,this.animConstants.type,this.animConstants.delay)
	.during(function() {
		if(tr){
			tr=false;
			temp.globalDuringActions(value);	
		}
	}).after(function() {
		temp.globalAfterActions(value);
	});
}

temperatureanimation.prototype.removeFromSet=function(setIndex,content){
		this.sets[setIndex].remove(content);
		this.rectSet.remove(content);
		this.setsLen[setIndex]--;
}

temperatureanimation.prototype.resizeDS=function(value){
	var tr=true;
	var temp=this;
	var diff=value.valDS-this.setsLen[value.numDS];
	var newSet=glob.svg.set();
	this.playStopPause(newSet);
//	console.log(value.numDS);
	if(diff>0){
		for(var j=value.valDS-diff;j<value.valDS;j++){
			console.log(j+" "+diff);
			var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.distx+this.rect.sizex*j,this.rect.margin+this.rect.disty*this.vybraneConvert[value.numDS])
			.radius(3)
			.fill(this.rect.color_fade);
			this.addToSet(value.numDS, rect);
			newSet.add(rect);
			this.rectSet.add(rect);
		}
		this.playStopPause(newSet);
		newSet.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(this.rect.color)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			temp.globalAfterActions(value);
		});
	}else if(diff<0){
		console.log("AAAAAAAA");
		diff=diff*(-1);
		var pom=value.valDS;
		console.log(pom+" "+this.setsLen[value.numDS]);
		for(var j=this.setsLen[value.numDS]-1;j>=pom;j--){
			console.log(j);
			var temprect=this.sets[value.numDS].get(j);
			newSet.add(temprect);
			this.removeFromSet(value.numDS, temprect);
		}
		this.playStopPause(newSet);
		newSet.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(this.rect.color_fade)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			newSet.each(function () {
				this.remove();
			})
			temp.globalAfterActions(value);
		});
	}
}

temperatureanimation.prototype.accessToRect=function (value,ds,pos) {
	var temp=this;
//	console.log(ds+' '+pos);
//	console.log(this.sets[ds].get(pos));
	var rect=this.sets[ds].get(pos);
	this.playStopPause(rect);
	console.log(this.sets[0]+rect);
	rect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
	.fill(temp.rect.color)
	.during(function () {
		temp.globalDuringActions(value);
	}).after(function  () {
		temp.globalAfterActions(value);
	});
}


temperatureanimation.prototype.push_backDS=function(value) {
	var tr=true;
	var temp=this;
	var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.distx+this.rect.sizex*this.setsLen[value.numDS],this.rect.margin+this.rect.disty*this.vybraneConvert[value.numDS])
			.radius(3)
			.fill(this.rect.color_fade);
	this.addToSet(value.numDS, rect);
	this.rectSet.add(rect);
	this.playStopPause(rect);
	rect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(temp.rect.color)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			temp.globalAfterActions(value);
		});
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
	this.accessToRect(value, value.numDS, value.valDS);
}

temperatureanimation.prototype.vectorPush_back=function (value) {
	this.push_backDS(value);
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
	this.push_backDS(value);	
}

temperatureanimation.prototype.dequePush_front=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequeFront=function (value) {
	this.accessToRect(value, value.numDS, 0);
}

temperatureanimation.prototype.dequeBack=function (value) {
	this.accessToRect(value, value.numDS, this.setsLen[value.numDS]-1);
}

temperatureanimation.prototype.deleteContent=function (value,place,move) {
	var temp=this;
	var temprect=this.sets[value.numDS].get(place);
	this.removeFromSet(value.numDS, temprect);
	this.playStopPause(temprect);
	temprect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
		.fill(this.rect.color_fade)
		.during(function () {
			temp.globalDuringActions(value);
		}).after(function () {
			this.remove();
			if(move){
				temp.playStopPause(temp.sets[value.numDS]);
				temp.sets[value.numDS].animate(temp.animConstants.length,
					temp.animConstants.type,temp.animConstants.delay)
				.dx(-temp.rect.sizex).after(function () {
					temp.globalAfterActions(value);
				});
			}else{
				temp.globalAfterActions(value);
			}
		});
}

temperatureanimation.prototype.dequePop_back=function (value) {	
	this.deleteContent(value, this.setsLen[value.numDS]-1,false);
}

temperatureanimation.prototype.dequePop_front=function (value) {
	this.deleteContent(value, 0,true);
}

temperatureanimation.prototype.setNew=function (value) {
	this.newDS(value);
}

temperatureanimation.prototype.setInsert=function (value) {
	this.push_backDS(value);
}


temperatureanimation.prototype.changeColor=function(fill,changeR,changeG,changeB){
	var col=new SVG.Color(fill);
	var color=col.toRgb();
	var rgb = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');
   	rgb[0]=Math.max(rgb[0]-changeR,0);
   	rgb[1]=Math.max(rgb[1]-changeG,0);
   	rgb[2]=Math.max(rgb[2]-changeB,0);
   	var rgbstring="rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
   	col=new SVG.Color(rgbstring);
   	return col.toHex();
}



temperatureanimation.prototype.globalAfterActions=function(value){
	var temp=this;
	var first=true;
	this.sets[value.numDS].animate(100,"=",100).after(function () {
		temp.sets[value.numDS].each(function () {
			var newCol=temp.changeColor(this.attr("fill"),2,2,2);
			this.attr("fill",newCol);
		});
	});
	if(!this.nextButton){
		draw(this.dataHandler,this);
	}else{
		$("#next").click(function () {
			draw(temp.dataHandler, temp);
		});
	}
}
