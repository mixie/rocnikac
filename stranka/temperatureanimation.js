temperatureanimation.prototype = Object.create(animation.prototype);

temperatureanimation.prototype.constructor=animation;

function temperatureanimation(haveLabels,dataHandler) {	
	this.haveLabels=haveLabels;
	this.dataHandler=dataHandler;
	this.selected=this.dataHandler.selected;
	this.label=null;
	this.x=100;
	this.y=200;
	this.color='#f06';
	this.size=2;
	if(haveLabels==true){
		this.label=glob.svg.text("").move(this.x,this.y).fill(this.color).scale(this.size,this.size); //glob.svg.text("").move(x,y).fill(color).scale(size,size);
	}
	console.log("tusom2"+this.label);
}

temperatureanimation.prototype.vectorNew=function (value) {
	this.zobraz_label(value);
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
	console.log(value+"value2");
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
	var tr=true;
	var temp=this;
	this.label.animate(1000, '>', 1000)
	.during(function(){
		if(tr){
			tr=false;
			temp.globalDuringActions(value);	
		}
	})
	.after(function(){
		temp.globalAfterActions(value);
	});
}