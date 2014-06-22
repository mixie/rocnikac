temperatureanimation.prototype = Object.create(animation.prototype);

temperatureanimation.prototype.constructor=animation;

function temperatureanimation(haveLabels,dataHandler) {	
	this.haveLabels=haveLabels;
	var label=null;
	var x=100,y=200,color='#f06',size=1;
	if(haveLabels==true){
		label=glob.svg.text("").move(x,y).fill(color).scale(size,size); //glob.svg.text("").move(x,y).fill(color).scale(size,size);
	}
	console.log("tusom2"+label);
}

temperatureanimation.prototype.vectorResize=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.vectorOperator=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.vectorPush_back=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.dequeNew=function (value) {
	this.zobraz_label(value);
}


temperatureanimation.prototype.dequeResize=function (value) {
	this.zobraz_label(value);
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
	this.zobraz_label(value);
}

temperatureanimation.prototype.setInsert=function (value) {
	this.zobraz_label(value);
}

temperatureanimation.prototype.zobraz_label=function(value){
	this.label.animate(2000, '>', 1000).during(function () {
		globalDuringActions(value);
	}).after(function () {
		globalAfterActions(value);
	});
}
