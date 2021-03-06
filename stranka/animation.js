function animation(haveLabels,dataHandler) {	
	this.haveLabels=haveLabels;
	this.label=null;
	this.x=100;this.y=200,this.color='#f06',this.size=1;
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

animation.prototype.showAndGetLabel=function(value,x,y,color,size){
		if(value==null){
			this.label=glob.svg.text("asddsadsadas").move(this.x,this.y).fill(this.color).scale(this.size,this.size);
			return this.label;
		}else{
			this.label.text(this.dataHandler.toText(value)).move(this.x,this.y).fill(this.color).scale(this.size,this.size);
			return;
		}
}

animation.prototype.globalAfterActions=function(value){
	draw(this.dataHandler,this);
}

animation.prototype.globalDuringActions=function(value) {
	if(this.haveLabels){
		this.showAndGetLabel(value,this.x,this.y,this.color,this.size);
	}
}

