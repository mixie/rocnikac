function animation(haveLabels,dataHandler,nextButton) {	
	this.haveLabels=haveLabels;
	this.label=null;
	this.x=100;this.y=200;this.color='#f06';this.size=2;
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
	draw(this.dataHandler,this);
}

animation.prototype.globalDuringActions=function(value) {
	if(this.haveLabels){
		showAndGetLabel(value,this.x,this.y,this.color,this.size);
	}
}


animation.prototype.showAndGetLabel=function(value,x,y,color,size){
		if(value==null){
			this.label=glob.svg.text("asddsadsadas").move(this.x,this.y).fill(this.color).scale(this.size,this.size);
			return this.label;
		}else{
			this.label.text(this.dataHandler.toText(value))
			.move(this.x,this.y)
			.fill(this.color)
			.scale(this.size,this.size)
			.attr("font-weight","bold");
			return;
		}
}

animation.prototype.globalAfterActions=function(value){
	var temp=this;
	if(!this.nextButton){
		draw(this.dataHandler,this);
	}else{
		$("#next").click(function () {
			draw(temp.dataHandler, temp);
		})
	}
}

animation.prototype.playStopPause=function (object) {
	$("#play").click(function () {
		object.play();
	});
	$("#pause").click(function () {
		object.pause();
	});
	$("#stop").click(function () {
		object.stop();
	});
}

animation.prototype.globalDuringActions=function(value) {
	if(this.haveLabels){
		this.showAndGetLabel(value,this.x,this.y,this.color,this.size);
	}
}

