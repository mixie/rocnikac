circleanimation.prototype = Object.create(temperatureanimation.prototype);

circleanimation.prototype.constructor=circleanimation;

function circleanimation(haveLabels,dataHandler,nextButton,length,delay) {
	this.haveLabels=haveLabels;
	this.dataHandler=dataHandler;
	this.nextButton=nextButton;
	var temp=this;
	this.label=null;
	this.x=glob.x/2;
	this.y=10;
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
	this.animConstants={
		type:'='
	}
	this.animConstants.length=length;
	this.animConstants.delay=delay;
	this.animConstants.color_fade="#666";
	this.circlePos=[];
	this.labelPos=[];
	this.circleRadius=6;
	var len=this.dataHandler.selected.length;
	var sqrt=Math.sqrt(len);
	sqrt++;
	sqrt=Math.round(sqrt);
	var stepx=glob.x/sqrt;
	var stepy=(glob.y-this.y*3)/sqrt;
	console.log(len+" "+sqrt+" "+stepx+" "+stepy);
	console.log(this.dataHandler.selected);
	var k=0;
	for (var i = 0; i < sqrt; i++) {
		for(var j=0;j<sqrt;j++){
			var cp={};
			cp.x=j*stepx+stepx/2;
			cp.y=i*stepy+stepy/2+this.y*3;
			this.circlePos[k]=cp;
			var lp={};
			lp.x=j*stepx+stepy/2;
			lp.y=i*stepy+this.y*3;
			this.labelPos[k]=lp;
			k++;
		}
	}
}

circleanimation.prototype.newDS=function(value) {
	var tr=true;
	var temp=this;
	var DSlabel=glob.svg.text(this.dataHandler.DStoText(value)).move(this.labelPos[this.vybraneConvert[value.numDS]].x, this.labelPos[this.vybraneConvert[value.numDS]].y).fill("white");
	this.playStopPause(DSlabel);
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


circleanimation.prototype.randomColor = function() {
	var col={};
	col.r=Math.round(Math.random()*256);
	col.g=Math.round(Math.random()*256);
	col.b=Math.round(Math.random()*256);
	var c=new SVG.Color(col);
	console.log(c.toRgb());
	return c.toHex();
};

circleanimation.prototype.resizeDS=function(value){
	var tr=true;
	var temp=this;
	var diff=value.valDS-this.setsLen[value.numDS];
	var newSet=glob.svg.set();
	this.playStopPause(newSet);
	var during=true;
	var after=true;
	if(diff>0){
		for(var j=value.valDS-diff;j<value.valDS;j++){
			var circle=glob.svg.circle(this.circleRadius*(j+1))
			.center(this.circlePos[this.vybraneConvert[value.numDS]].x,this.circlePos[this.vybraneConvert[value.numDS]].y)
			.fill(this.animConstants.color_fade)
			.back();
			this.addToSet(value.numDS, circle);
			newSet.add(circle);
			this.rectSet.add(circle);
		}
		console.log(newSet);
		this.playStopPause(newSet);
		newSet.each(function () {
			this.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
			.fill(temp.randomColor())
			.during(function () {
				if(during){
					during=false;
					temp.globalDuringActions(value);
				}
			}).after(function () {
				if(after){
					after=false;
					temp.globalAfterActions(value);
				}
			});
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
		.fill(this.animConstants.color_fade)
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

circleanimation.prototype.reverseColor = function(col) {
	console.log("reverse");
	var c=new SVG.Color(col);
	var color=c.toRgb();
	var rgb = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');
    rgb[0]=255-rgb[0];
    rgb[1]=255-rgb[1];
    rgb[2]=255-rgb[2];
    var rgbstring="rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
   	col=new SVG.Color(rgbstring);
   	return col.toHex();
};

circleanimation.prototype.accessToRect=function (value,ds,pos) {
	console.log("aaaa");
	var temp=this;
	var rect=this.sets[ds].get(pos);
	this.playStopPause(rect);
	console.log(this.sets[0]+rect);
	var col=rect.attr("fill");
	var revCol=this.reverseColor(col);
	console.log(col+revCol);
	rect.fill(revCol);
	rect.animate(temp.animConstants.length,temp.animConstants.type,temp.animConstants.delay)
	.fill(col)
	.during(function () {
		temp.globalDuringActions(value);
	}).after(function  () {
		temp.globalAfterActions(value);
	});
}


circleanimation.prototype.push_backDS=function(value) {
	var tr=true;
	var temp=this;
/**	var rect=glob.svg.rect(this.rect.sizex,this.rect.sizey)
			.move(this.rect.distx+this.rect.sizex*this.setsLen[value.numDS],this.rect.margin+this.rect.disty*this.vybraneConvert[value.numDS])
			.radius(3)
			.fill(this.rect.color_fade);**/
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

circleanimation.prototype.vectorNew=function (value) {
	this.newDS(value);
}

circleanimation.prototype.vectorResize=function (value) {
	this.resizeDS(value);
}

circleanimation.prototype.vectorOperator=function (value) {
	this.operatorDS(value);
}

circleanimation.prototype.operatorDS=function (value) {
	this.accessToRect(value, value.numDS, value.valDS);
}

circleanimation.prototype.vectorPush_back=function (value) {
	this.push_backDS(value);
}

circleanimation.prototype.dequeNew=function (value) {
	this.newDS(value);
}

circleanimation.prototype.dequeResize=function (value) {
	this.resizeDS(value);
}

circleanimation.prototype.dequeOperator=function (value) {
	this.operatorDS(value);
}

circleanimation.prototype.dequePush_back=function (value) {
	this.push_backDS(value);	
}

circleanimation.prototype.dequePush_front=function (value) {
	this.zobraz_label(value);
}

circleanimation.prototype.dequeFront=function (value) {
	this.accessToRect(value, value.numDS, 0);
}

circleanimation.prototype.dequeBack=function (value) {
	this.accessToRect(value, value.numDS, this.setsLen[value.numDS]-1);
}

circleanimation.prototype.deleteContent=function (value,place,move) {
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

circleanimation.prototype.dequePop_back=function (value) {	
	this.deleteContent(value, this.setsLen[value.numDS]-1,false);
}

circleanimation.prototype.dequePop_front=function (value) {
	this.deleteContent(value, 0,true);
}

circleanimation.prototype.setNew=function (value) {
	this.newDS(value);
}

circleanimation.prototype.setInsert=function (value) {
	this.push_backDS(value);
}


circleanimation.prototype.changeColor=function(fill,changeR,changeG,changeB){
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



circleanimation.prototype.globalAfterActions=function(value){
	var temp=this;
	var first=true;
	this.sets[value.numDS].animate(100,"=",100).after(function () {
		temp.sets[value.numDS].each(function () {
			console.log("new color")
			var newCol=temp.changeColor(this.attr("fill"),2,2,2);
			this.attr("fill",newCol);
		});
	});
	if(!this.nextButton){
		draw(this.dataHandler,this);
	}
}
