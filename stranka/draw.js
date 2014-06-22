function draw(dataHandler,animation) {
		console.log(animation.label);
		decide(dataHandler,animation);
}

function decide(dataHandler,animation) {
	var dh=dataHandler;
	//console.log(animation.vectorNew+"anima");
	//console.log(dh+"dhhh");
	console.log(dh.haveNext());
	if(dh.haveNext()){
		console.log("sajhsdkdsads");
		var value=dh.next();
		console.log(value+"value");
		switch(dh.getName(value)){
			case "vector":
				switch(value.funDS){
					case "new":
						animation.vectorNew(value);
						break;
					case "resize":
						animation.vectorResize(value);
						break;
					case "operator[]":
						animation.vectorOperator(value);
						break;
					case "push_back":
						animation.vectorPush_back(value);
						break;
				}
				break;
			case "deque":
				switch(value.funDS){
					case "new":
						console.log("BAF1");
						animation.dequeNew(value);
						break;
					case "resize":
						animation.dequeResize(value);
						break;
					case "operator[]":
						animation.dequeOperator(value);
						break;
					case "push_back":
						animation.dequePush_back(value);
						break;
					case "push_front":
						animation.dequePush_front(value);
						break;
					case "front":
						animation.dequeFront(value);
						break;
					case "back":
						animation.dequeBack(value);
						break;
					case "pop_back":
						animation.dequePop_back(value);
						break;
					case "pop_front":
						animation.dequePop_front(value);
						break;
				}
				break;
			case "set":
				switch(value.funDS){
					case "new":
						animation.setNew(value);
						break;
					case "insert":
						animation.setInsert(value);
						break;
				}
				break;
		}
	}
}
