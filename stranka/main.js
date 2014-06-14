$(document).ready(function(){
	var NUM_DS="numDS";
	var FUN_DS="funDS";
	var VAL_DS="valDS";
	var fileInput = document.getElementById('fileInput');

	$('#submit').click(function(e) {
		var file=fileInput.files[0];
		var reader = new FileReader();
		
		reader.onload = function(e) {
			var obsah = reader.result;
			obsah=NUM_DS+","+FUN_DS+","+VAL_DS+"\n"+obsah;
			var val=d3.csv.parse(obsah);
			console.log(val);
			preprocess(val);
		}
		if(file!="undefined"){
			reader.readAsText(file);	
		}
	});

});


