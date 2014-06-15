function draw_labels (val,ds,svg,v) {
		var t=svg.text(ds[val[v].numDS].name+v);
			t.animate(0, '>', 1000).move(1*v,100).after(function() {
				this.text(ds[val[v].numDS].name+v);
				t.remove();
				if(v+1<val.length){
					draw_labels(val, ds, svg, v+1);
				}
			}
			);
			$("#pause").click(function(){
					t.pause();
			});
			$("#play").click(function(){
				t.play();
			})
}