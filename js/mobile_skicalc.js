function ResetCalc() {
	document.getElementById('lengthTOT').value = ""
	document.getElementById('lengthW').value = ""
	document.getElementById('lengthH').innerHTML = "";
	document.getElementById('lengthS').innerHTML = "";
	document.getElementById('length1').innerHTML = "";
	document.getElementById('length2').innerHTML = "";
	document.getElementById('length').innerHTML = "";
	document.getElementById('front').value = "";
	document.getElementById('middle').value = "";
	document.getElementById('rear').value = "";
	document.getElementById('radius').innerHTML = "";
	document.getElementById('tolerance').innerHTML = "";
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function R_round(x) {
	var k = (Math.round(x * 100) / 100).toString();
	k += (k.indexOf('.') == -1)? '.00' : '00';
	var p = k.indexOf('.');
	return k.substring(0, p) + '.' + k.substring(p+1, p+3);
}
function alert_value(text,element){
	document.getElementById("alerttext").innerHTML = text
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
	window.console && console.log(element + " is not numeric");
	$( "#alert" ).bind({
		popupafterclose: function(event, ui) {
			document.getElementById(element).value = "";
			document.getElementById(element).focus();
		}
	});
}
function alert_empty(text,element){
	document.getElementById("alerttext").innerHTML = text
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
	window.console && console.log(element + " is empty");
	$( "#alert" ).bind({
	   popupafterclose: function(event, ui) {
			document.getElementById(element).focus();
	   }
	});
}
function alert_bigger(text,element){
	document.getElementById("alerttext").innerHTML = text
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
	window.console && console.log(text);
	$( "#alert" ).bind({
		popupafterclose: function(event, ui) {
			document.getElementById(element).focus();
		}
	});
}
function PreCalc(){
	if (trim(document.getElementById('lengthTOT').value) != ""){
		if (isNaN(document.getElementById('lengthTOT').value)=== false) {
			LTOT = parseFloat(document.getElementById('lengthTOT').value);
		}else{
			alert_value("Value for 'Ski total lenght' is not a number!","lengthTOT");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Ski total lenght'!",'lengthTOT');
		return;
	}
	if (trim(document.getElementById('lengthW').value) != ""){
		if (isNaN(document.getElementById('lengthW').value)=== false) {
			LW = parseFloat(document.getElementById('lengthW').value);
		}else{
			alert_value("Value for 'Ski lenght rear' is not a number!","lengthW");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Ski lenght rear'!",'lengthW');
		return;
	}
	if (LW > LTOT){
		alert_bigger("Value for 'Ski lenght rear' is bigger than the value for 'Ski total lenght'. Please check the values.","lengthTOT");
		return;
	}
	
	var LH = (LW * 0.1);
	var L1 = (LTOT - LW) * 0.8;
	var LS = L1 + LW;
	var L2 = (LW * 0.9);
	var L = L1 + L2;
	window.console && console.log("LH=" + LH);
	window.console && console.log("LS=" + LS);
	window.console && console.log("L1=" + L1);
	window.console && console.log("L2=" + L2);
	window.console && console.log("L=" + L);

	document.getElementById('lengthH').innerHTML = LH;
	document.getElementById('lengthS').innerHTML = LS;
	document.getElementById('length1').innerHTML = L1;
	document.getElementById('length2').innerHTML = L2;
	document.getElementById('length').innerHTML = L;
	
	return;
}

function CalculateSki(mode){
	if (trim(document.getElementById('lengthTOT').value) != ""){
		if (isNaN(document.getElementById('lengthTOT').value)=== false) {
			LTOT = parseFloat(document.getElementById('lengthTOT').value);
		}else{
			alert_value("Value for 'Ski total lenght' is not a number!","lengthTOT");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Ski total lenght'!",'lengthTOT');
		return;             
	}
	if (trim(document.getElementById('lengthW').value) != ""){
		if (isNaN(document.getElementById('lengthW').value)=== false) {
			LW = parseFloat(document.getElementById('lengthW').value);
		}else{
			alert_value("Value for 'Ski lenght rear' is not a number!","lengthW");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Ski lenght rear'!",'lengthW')  
		return;
	}
	if (LW > LTOT){
		alert_bigger("Value for 'Ski lenght rear' is bigger than the value for 'Ski total lenght'. Please check the values.","lengthTOT");
		return;
	}
	if (trim(document.getElementById('front').value) != ""){
		if (isNaN(document.getElementById('front').value)=== false) {
			S = parseFloat(document.getElementById('front').value);
			window.console && console.log("S=" + S);
		}else{
			alert_value("Value for:<br>'Front ski width' is not a number!","front");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Front ski width'!",'front') 
		return;
	}
	if (trim(document.getElementById('middle').value) != ""){
		if (isNaN(document.getElementById('middle').value)=== false) {
			W = parseFloat(document.getElementById('middle').value);
			window.console && console.log("W=" + W);
		}else{
			alert_value("Value for 'Middle ski width' is not a number!","middle");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Middle ski width'!",'middle')  
		return
	}
	if (trim(document.getElementById('rear').value) != ""){
		if (isNaN(document.getElementById('rear').value)=== false) {
			H = parseFloat(document.getElementById('rear').value);
			window.console && console.log("H=" + H);
		}else{
			alert_value("Value for 'Rear ski width' is not a number!","rear");
			return;
		}
	}else{
		alert_empty("Please enter a value for:<br>'Rear ski width'!",'rear')  
		return;
	}
	if (LW > LTOT){
		alert_bigger("Value for 'Ski lenght rear' is bigger than the value for 'Ski total lenght'. Please check the values.","lengthTOT");
		return;
	}
	if (W > S){
		alert_bigger("Value for 'Rear ski width' is bigger than the value for 'Middle ski width'. Please check the values.","rear");
		return;
	}
	if (W > H){
		alert_bigger("Value for 'Front ski width' is bigger than the value for 'Middle ski width'. Please check the values.","front");
		return;
	}
	
	var LH = (LW * 0.1);
	var L1 = (LTOT - LW) * 0.8;
	var LS = L1 + LW
	var L2 = (LW * 0.9);
	var L = L1 + L2;
	var R = (L * L)/(2000 * (S + H - 2 * W));
   
	window.console && console.log("LH=" + LH);
	window.console && console.log("LS=" + LS);
	window.console && console.log("L1=" + L1);
	window.console && console.log("L2=" + L2);
	window.console && console.log("L=" + L);
	window.console && console.log("Radius=" + R_round(R));
	window.console && console.log("mode=" + mode);
	
	document.getElementById('lengthH').innerHTML = LH;
	document.getElementById('lengthS').innerHTML = LS;
	document.getElementById('length1').innerHTML = L1;
	document.getElementById('length2').innerHTML = L2;
	document.getElementById('length').innerHTML = L;
	document.getElementById('radius').innerHTML = R_round(R);

	if (mode == '1'){
		var T = R + R * 0.015
		window.console && console.log("Tolerance=" + R_round(T));
		document.getElementById('tolerance').innerHTML = R_round(T);  
	}
}           