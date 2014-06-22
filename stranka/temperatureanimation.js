temperatureanimation.prototype = Object.create(animation.prototype);

temperatureanimation.prototype.constructor=animation;

function temperatureanimation(haveLabels,dataHandler) {	
	this.haveLabels=haveLabels;
	this.dataHandler=dataHandler;
	this.label=null;
	this.x=100;
	this.y=200;
	this.color='#f06';
	this.size=1;
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


temperatureanimation.prototype.showAndGetLabel=function(value,x,y,color,size){
		console.log("BAF");
			console.log(value+"value3");
		if(value==null){
			this.label=glob.svg.text("asddsadsadas").move(this.x,this.y).fill(this.color).scale(this.size,this.size);
			return this.label;
		}else{
			console.log("BLEBLEBLE");
			this.label.text(this.dataHandler.toText(value)).move(this.x,this.y).fill(this.color).scale(this.size,this.size);
			return;
		}
}

temperatureanimation.prototype.globalAfterActions=function(value){
	draw(this.dataHandler,this);
}

temperatureanimation.prototype.globalDuringActions=function(value) {
	if(this.haveLabels){
		this.showAndGetLabel(value,this.x,this.y,this.color,this.size);
	}
}

temperatureanimation.prototype.zobraz_label=function(value){
	var a=this;
	var c=value;
		console.log(value.numDS+"value4");
	this.label.animate(2000, '>', 1000)
	.during(function(){
			console.log(value.numDS+"value22");
			a.globalDuringActions(c);
	})
	.after(this.globalAfterActions(value));
}
