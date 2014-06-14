
function preprocess(val){
	var pov=[];
	var initial=[];
	var good = ["operator[]"];
	var others = ["insert","push_back"];
	var ds=[];

	for(v in val){
		if(val[v].funDS=="new"){
			ds.push(val[v]);
			pov.push(0);
			initial.push(true);
		}else{
			if($.inArray(val[v].funDS,good) && initial[val[v].numDS]){
				pov[val[v].numDS]=Math.max(pov[val[v].numDS],val[v].valDS);
			}else if($.inArray(val[v].funDS,others)){
				initial[val[v].numDS]=false;
			}	
		}
	}
	console.log(pov);
	zobrazform(ds,pov,val);
	var temp=[];
	console.log(temp);
}

function zobrazform(ds,pov,val){
	$("#form").html("");
	for(d in ds){
		var inp="<input type='checkbox' name='dschbox' value='"+ds[d].numDS+"' id='"+ds[d].numDS+"'>"+ds[d].valDS+" "+ds[d].numDS+"</input></br>";
		console.log(inp);
		$('#form').append(inp);
	}
	$('#form').append("<input type='submit' name='sub2' id='sub2' value='s1'>");
	$('#sub2').click(function(e){
		var vybrane=[];
		$("input[type='checkbox']:checked").each(function(){
			vybrane.push($(this).attr("id"));
		});
		console.log(vybrane);
		
	}); 
}
