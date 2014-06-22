function animation(haveLabels,dataHandler) {	
	this.haveLabels=haveLabels;
	var label=null;
	var x=100,y=200,color='#f06',size=1;
	if(haveLabels==true){
		label=glob.svg.text("").move(x,y).fill(color).scale(size,size); //glob.svg.text("").move(x,y).fill(color).scale(size,size);
	}
}
animation.prototype.vectorResize=function (value) {
	globalAfterActions(value);
};

animation.prototype.vectorOperator=function (value) {
	globalAfterActions(value);
};

animation.prototype.vectorPush_back=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequeNew=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequeResize=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequeOperator=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequePush_back=function (value) {
	globalAfterActions(value);
}

animation.prototype.dequePush_front=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequeFront=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequeBack=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequePop_back=function (value) {
	globalAfterActions(value);
};

animation.prototype.dequePop_front=function (value) {
	globalAfterActions(value);
};

animation.prototype.setNew=function (value) {
	globalAfterActions(value);
};

animation.prototype.setInsert=function (value) {
	globalAfterActions(value);
};

animation.prototype.globalAfterActions=function(value){
	draw(dataHandler,this);
}

animation.prototype.globalDuringActions=function(value) {
	if(haveLabels){
		showAndGetLabel(value,x,y,color,size);
	}
}

animation.prototype.showAndGetLabel=function(value,x,y,color,size){
		if(value==null){
			label=glob.svg.text("").move(x,y).fill(color).scale(size,size);
			return label;
		}else{
			label.text(dataHandler.toString()).move(x,y).fill(color).scale(size,size);
			return;
		}
}
