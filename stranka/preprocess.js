function preprocess(val){
	console.log(glob.data);
	var ds=[]; //new riadky
	for(v in val){
		if(val[v].funDS=="new"){
			var ds_at={num:val[v].numDS,name:val[v].valDS};
			ds.push(ds_at);
		}
	}
	zobrazform(ds,val);
}

function zobrazform(ds,val){
	console.log(glob.data);	
	$("#form").html("");
	for(d in ds){
		var inp="<input type='checkbox' name='dschbox' value='"+ds[d].num+"' id='"+ds[d].num+"'/><label for='"+ds[d].num+"'>"+ds[d].name+" "+ds[d].num+"</label></br>";
		console.log(inp);
		$('#form').append(inp);
	}
	//$('#form').append("<input type='submit' name='sub2' id='sub2' value='choose'>");
		$('#start').click(function(e) {
			var vybrane=[];
			$("input[name='dschbox']:checked").each(function(){
				vybrane.push($(this).attr("id"));
			});
			var dh=new dataHandler(vybrane, ds);
			var a;
			$("input[type='radio']:checked").each(function(){
				a=$(this).attr("id");
			});
			var length=$("#len").val();
			var delay=$("#delay").val();
			var labels=false;
			var next=false;
			if($("#next").prop("checked")){
				next=true;
			}
			if($("#labels").prop("checked")){
				labels=true;
			}
			if(a=="temperature"){
					var anim=new temperatureanimation(labels,dh,next,length,delay);
			}
			if(a=="circles"){
					var anim=new circleanimation(labels,dh,next,length,delay);
			}
			$("#next").click(function (e) {
				if(next){
					draw(anim.dataHandler, anim);
				}
			});
			draw(dh,anim);
		});
}