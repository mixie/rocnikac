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
		var inp="<input type='checkbox' name='dschbox' value='"+ds[d].num+"' id='"+ds[d].num+"'>"+ds[d].name+" "+ds[d].num+"</input></br>";
		console.log(inp);
		$('#form').append(inp);
	}
	$('#form').append("<input type='submit' name='sub2' id='sub2' value='choose'>");
	$('#sub2').click(function(e){
		var vybrane=[];
		$("input[type='checkbox']:checked").each(function(){
			vybrane.push($(this).attr("id"));
		});
		var dh=new dataHandler(vybrane, ds);
		var anim=new temperatureanimation(true,dh,false);
		console.log(anim.label);
		draw(dh,anim);
		console.log(vybrane);
	});
}