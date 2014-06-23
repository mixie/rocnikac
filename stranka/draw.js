function draw(dataHandler,animation) {
		decide(dataHandler,animation);
}

function decide(dataHandler,animation) {
	var dh=dataHandler;
	if(dh.haveNext()){
		var value=dh.next();
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
