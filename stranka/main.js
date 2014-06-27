//MAKE JAVASCRIPT LIBRARY!!! - NAKONIEC

$(document).ready(function(){
	var NUM_DS="numDS";
	var FUN_DS="funDS";
	var VAL_DS="valDS";
	var fileInput = document.getElementById('fileInput');
	var svg = SVG('svgdiv').size(glob.x,glob.y);
	glob.svg=svg;
	//svg.rect(700,600).attr("id","background");
	$('#submit').click(function(e) {
		var file=fileInput.files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			var obsah = reader.result;
			obsah=NUM_DS+","+FUN_DS+","+VAL_DS+"\n"+obsah;
			var val=d3.csv.parse(obsah);
			//console.log(val);
			glob.data=val;
			console.log(glob.data);
			preprocess(val);
		}
		if(file!="undefined"){
			reader.readAsText(file);	
		}
	});
});