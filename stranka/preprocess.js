function preprocess(val,svg){
	var ds=[]; //new riadky
	for(v in val){
		if(val[v].funDS=="new"){
			var ds_at={num:val[v].numDS,name:val[v].valDS};
			ds.push(ds_at);
		}
	}
	zobrazform(ds,val,svg);
}

function zobrazform(ds,val,svg){
	$("#form").html("");
	for(d in ds){
		var inp="<input type='checkbox' name='dschbox' value='"+ds[d].num+"' id='"+ds[d].num+"'>"+ds[d].name+" "+ds[d].num+"</input></br>";
		console.log(inp);
		$('#form').append(inp);
	}
	$('#form').append("<input type='submit' name='sub2' id='sub2' value='s1'>");
	$('#sub2').click(function(e){
		var vybrane=[];
		$("input[type='checkbox']:checked").each(function(){
			vybrane.push($(this).attr("id"));
		});
		draw(val,ds,svg,0,vybrane);
		console.log(vybrane);
	}); 
}
