$(document).bind('pagecreate', function (){
	updateStatus("init page",0);
	
	/*if(StatusBar.isVisible) {
		StatusBar.overlaysWebView(false);
		StatusBar.show();
	}*/
        onInit();

});
   $(document).on('keydown', 'input', function(e, ui) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key === 13 && e.target.type !== 'submit'){
            e.preventDefault();
            $(this).nextAll('input:visible').eq(0).focus();
        }
});
 $('input').on("keypress", function(e) {
            /* ENTER PRESSED*/
            if (e.keyCode == 13) {
                /* FOCUS ELEMENT */
                var inputs = $(this).parents("form").eq(0).find(":input");
                var idx = inputs.index(this);

                if (idx == inputs.length - 1) {
                    inputs[0].select()
                } else {
                    inputs[idx + 1].focus(); //  handles submit buttons
                    inputs[idx + 1].select();
                }
                return false;
            }
        });

$(document).bind('pagecontainershow', function (){
    if (document.getElementById("bib")){
        if (!window.openDatabase) {
            makeBIBtable(0);
        }else {
            makeBIBtable(1);
        }
        if(document.getElementById("BIBinput").style.display=="block" && document.getElementById("bib")) {
            document.getElementById("bib").focus();
            updateStatus("set focus1",0);
        }else{
            document.getElementById("lengthTOT").focus();
        }
    }
});

//1. initialization

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Error: DB not supported",0);
            $('.footerbar').append(makeFooterbar(0));
            document.getElementById("savebutton").innerHTML =  makeSavebutton(0);
        }else {
            initDB();
            createTables();
            if(document.getElementById("skilist")){
                queryAndUpdateOverview();
            }
            
            if(document.getElementById("savebutton")){
                document.getElementById("savebutton").innerHTML =  makeSavebutton(1);
            }
            $('.footerbar').append(makeFooterbar(1));  
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Error onInit: Invalid database version.",1);
        }
        else {
            updateStatus("Error onInit: Unknown error " + e + ".",1);
        }
        return;
    }
}
function initDB(){
    var shortName = 'skicalcDB';
    var version = '1.0';
    var displayName = 'skicalcDB';
    var maxSize = 100000; // in bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
    updateStatus("init DB",0);
}
function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS skis(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, bib VARCHAR NOT NULL, lengthTOT VARCHAR NOT NULL, lengthW VARCHAR NOT NULL, lengthH VARCHAR NOT NULL, length1 VARCHAR NOT NULL, length VARCHAR NOT NULL, lengthS VARCHAR NOT NULL, length2 VARCHAR NOT NULL, front VARCHAR NOT NULL, middle VARCHAR NOT NULL, rear VARCHAR NOT NULL, radius VARCHAR NOT NULL, tolerance VARCHAR NOT NULL, savedate VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Table 'skis' is present",0);
        });
    } 
    catch (e) {
        updateStatus("Error initDB: Unable to create table 'skis' " + e + ".",1);
        return;
    }
}
function makeFooterbar(db){
    var html = "";
//    html = html + '<div data-role="footer" data-position="fixed" data-id="foo1">';
//    html = html + '<div data-role="navbar">\n'; //ui-mini deleted
////    if(db == 1){
////        html = html + '<ul class="ui-grid-b">\n';
////    }else{
////        html = html + '<ul class="ui-grid-a">\n';
////    }
//    html = html + '<ul>';
//    html = html + '<li>\n';
//    html = html + '<a href="index.html" class="ui-btn-active">Calculator</a>';
//    html = html +  '</li>\n';
//    html = html + '<li>\n';
//    if(db == 1){
//        html = html + '<a href="skicalc_list.htm">Saved List</a>';
//        html = html + '</li>\n';
//        html = html + '<li>\n';
//    }
//    html = html + '<a href="skicalc_info.htm">Info</a>';
//    html = html + '</li>\n';
//    html = html + '</ul>\n';
//    html = html + '</div>\n';
//    html = html + '</div>\n';
    html = '<div class="ui-footer ui-bar-a ui-footer-fixed slideup" data-position="fixed" data-id="foo1" data-role="footer" role="contentinfo">\n';
    html = html + '<div class="ui-navbar" data-role="navbar" role="navigation">\n'; //ui-mini deleted
    if(db == 1){
        html = html + '<ul class="ui-grid-b">\n';
    }else{
        html = html + '<ul class="ui-grid-a">\n';
    }
    html = html + '<li class="ui-block-a">\n';
    html = html + '<a href="index.html" class="ui-btn ui-btn-b ui-btn-inline ui-icon-shadow">Calculator</a>';
    html = html +  '</li>\n';
    if(db == 1){
        html = html + '<li class="ui-block-b">\n';
        html = html + '<a href="skicalc_list.htm" class="ui-btn ui-btn-b ui-btn-inline ui-icon-shadow">Saved List</a>';
        html = html + '</li>\n';
        html = html + '<li class="ui-block-c">\n';
    }else{
        html = html + '<li class="ui-block-b">\n';  
    }
    html = html + '<a href="skicalc_info.htm" class="ui-btn ui-btn-b ui-btn-inline ui-icon-shadow">Info</a>';
    html = html + '</li>\n';
    html = html + '</ul>\n';
    html = html + '</div>\n';
    html = html + '</div>\n';
    html = html + '</div>\n';
    //updateStatus(html,0);
    //updateStatus("footerbar created",0);
    return html;
}
function makeBIBtable(db){
        if(db == 1){
            document.getElementById("BIBlable").style.display="inline"; //to hide
            document.getElementById("BIBinput").style.display="block"; //to hide
        }else{
            document.getElementById("BIBlable").style.display="none"; //to hide
            document.getElementById("BIBinput").style.display="none"; //to hide
        }
//    var html = "";
//     html = '<table width="100%" border="0" cellspacing="0" cellpadding="0" id="BIBtabledone">\n';
//    html = html + '<tr>\n';
//    if(db == 1){
//        html = html + '<td valign="bottom" class="skicalclegend" width="25%">\n';
//        html = html + 'BIB (optional):\n';
//        html = html + '</td>\n';
//        html = html + '<td valign="bottom" class="skicalclegend" width="38%">\n';
//    }else{
//        html = html + '<td valign="bottom" class="skicalclegend" width="50%">\n';
//    }
//    html = html + 'Ski total lenght (L<sub>TOT</sub>):\n';
//    html = html + '</td>\n';
//    if(db == 1){
//        html = html + '<td valign="bottom" class="skicalclegend" width="37%">\n';
//    }else{
//        html = html + '<td valign="bottom" class="skicalclegend" width="50%">\n';
//    }
//    html = html + 'Ski lenght rear (L<sub>W</sub>):\n';
//    html = html + '</td>\n';
//    html = html + '</tr>\n';
//    html = html + '<tr>\n';
//    if(db == 1){
//        html = html + '<td style="padding-right:1px">\n';
//        html = html + '<input id="bib" class="Footer
//         ui-input-text ui-body-a ui-corner-all ui-shadow-inset" type="number" tabindex="8" valign="middle" name="bib" maxlength="5" size="5">\n';
//        html = html + '</td>\n';
//    }
//    html = html + '<td style="padding-right:1px">\n';
//    html = html + '<input id="lengthTOT" class="skicalcdata ui-input-text ui-body-a ui-corner-all ui-shadow-inset" type="number" tabindex="10" valign="middle" name="lengthTOT" maxlength="6" size="7">\n';
//    html = html + '</td>\n';
//    html = html + '<td style="padding-left:1px">\n';
//    html = html + '<input id="lengthW" class="skicalcdata ui-input-text ui-body-a ui-corner-all ui-shadow-inset" type="number" onblur="PreCalc()" tabindex="12" valign="middle" name="lengthW" maxlength="6" size="7">\n';
//    html = html + '</td>\n';
//    html = html + '</tr>\n';
//    html = html + '</tbody>\n';
//    html = html + '</table>\n';
//    return html;
}
function makeSavebutton(db){
    var html = "";
    html = '<table width="100%" cellspacing="0" cellpadding="0" border="0">\n';
    html = html + '<tbody>\n';
    html = html + '<tr>\n';
    if(db == 1){
        html = html + '<td width="33%" style="padding-right:2px">\n';
        html = html + '<button class="ui-btn ui-btn-b ui-shadow ui-corner-all" tabindex="24" type="button" onclick="onSave()">\n';
        html = html + 'Save</button>\n';
        html = html + '</div>\n';
        html = html + '</td>\n';
    }
    if(db == 1){
        html = html + '<td style="padding-left:2px">\n';
    }else{
       html = html + '<td>\n';
    }
    html = html + '<button class="ui-btn ui-btn-b ui-shadow ui-corner-all" tabindex="24" onClick="ResetCalc()" type="reset">\n';
    html = html + 'Reset</button>\n';
    html = html + '</td>\n';
    html = html + '</tr>\n';
    html = html + '</tbody>\n';
    html = html + '</table>\n';
    //updateStatus(html,0);
    //updateStatus("savebutton created",0);
    return html;
}


//2. query db and view update
// event handler start with on*

//function onUpdate(){
//    var id = document.skidataForm.id.value;
//    var amount = document.skidataForm.amount.value;
//    var name = document.skidataForm.name.value;
//    if (amount == "" || name == "") {
//        updateStatus("'Amount' and 'Name' are required fields!");
//    }
//    else {
//        var query = "update skis set amount=?, name=? where id=?;";
//        try {
//            localDB.transaction(function(transaction){
//                transaction.executeSql(query, [amount, name, id], function(transaction, results){
//                    if (!results.rowsAffected) {
//                        updateStatus("Error: No rows affected");
//                    }
//                    else {
//                        updateForm("", "", "");
//                        updateStatus("Updated rows:" + results.rowsAffected);
//                        queryAndUpdateOverview();
//                    }
//                }, errorHandler);
//            });
//        } 
//        catch (e) {
//            updateStatus("Error onUpdate: Unable to perform an UPDATE " + e + ".");
//        }
//    }
//}

function onDelete(){
	var query = "DELETE FROM skis;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Error delete data: No rows affected.",1);
                }
                else {
                    //updateForm("", "", "", "", "", "", "", "", "", "", "", "", "", "");
					resetTable()
                    updateStatus("Deleted rows:" + results.rowsAffected,0);
                    queryAndUpdateOverview();
                    resetSequence();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error onDelete: Unable to perform an DELETE " + e + ".",1);
    }
}
function resetSequence() {
	//var query = "DELETE FROM sqlite_sequence WHERE name = 'skis'";
	var query = "UPDATE sqlite_sequence SET seq = '0'";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error onDelete: Unable to perform an DELETE " + e + ".",1);
    }
	
}

function onSave(){
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	if (day < 10){
		day = "0" + day
	}
	var year = currentTime.getFullYear()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	if (minutes < 10){
		minutes = "0" + minutes
	}
    var bib = document.skidataForm.bib.value;
    var lengthTOT = document.skidataForm.lengthTOT.value;
	var lengthW = document.skidataForm.lengthW.value;
	var lengthH = document.getElementById("lengthH").innerHTML;
	var length1 = document.getElementById('length1').innerHTML;
	var length = document.getElementById('length').innerHTML;
	var lengthS = document.getElementById('lengthS').innerHTML;
	var length2 = document.getElementById('length2').innerHTML;
	var front = document.skidataForm.front.value;
	var middle = document.skidataForm.middle.value;
	var rear = document.skidataForm.rear.value;
	var radius = document.getElementById('radius').innerHTML;
	var tolerance = document.getElementById('tolerance').innerHTML;
	var savedate = day+"."+month+"."+year+" "+hours+":"+minutes;
	
	//updateStatus(bib+" "+lengthTOT+" "+lengthW+" "+lengthH+" "+length1+" "+length+" "+lengthS+" "+length2+" "+front+" "+middle+" "+rear+" "+radius+" "+tolerance+" "+savedate);
    if (lengthTOT == "" || lengthW == "" || lengthH == "" || front == "" || middle == "" || rear == "" || radius == "") {
        updateStatus("Error: 'lengthTOT','lengthW', 'front', 'middle', 'rear' and 'radius' are required fields!",0);
        alert_empty("Ski total lenght, Ski lenght rear, Front ski width, Middle ski width, Rear ski width and Radius are required fields!<br>Please and calculate these values before saving!","lengthTOT");
    }else {
        var query = "insert into skis (bib, lengthTOT, lengthW, lengthH, length1, length, lengthS, length2, front, middle, rear, radius, tolerance, savedate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [bib, lengthTOT, lengthW, lengthH, length1, length, lengthS, length2, front, middle, rear, radius, tolerance, savedate], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error onSave: No rows affected.",1);
                    }
                    else {
                        updateStatus("Inserted row with id " + results.insertId,0);
                        alert_autoclose("Data saved",1);
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error onSave: Unable to perform an INSERT " + e + ".",0);
        }
    }
}

//function onSelect(htmlLIElement){
//	var id = htmlLIElement.getAttribute("id");
//	
//	query = "SELECT * FROM skis where id=?;";
//    try {
//        localDB.transaction(function(transaction){
//        
//            transaction.executeSql(query, [id], function(transaction, results){
//            
//                var row = results.rows.item(0);
//                
//                updateForm(row['id'], row['amount'], row['name']);
//                
//            }, function(transaction, error){
//                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
//            });
//        });
//    } 
//    catch (e) {
//        updateStatus("Error onSelect: Unable to select data from the db " + e + ".");
//    }
//   
//}
function resetTable(){
	var table = document.getElementById("skilist");
	for(var i = table.rows.length - 1; i > 1; i--)
	{
		table.deleteRow(i);
	}
}
function queryAndUpdateOverview(){
	
	//read db data and create new table rows
    var query = "SELECT * FROM skis;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                //updateStatus(results.rows.length,0)
                //remove old table rows
                resetTable();
                mytable = document.getElementById("skilist");
                if (results.rows.length != 0){
                    var emailArray = new Array(results.rows.length);
                    var csvArray = new Array(results.rows.length);
                    //updateStatus(results.rows.length,0);
                    for (var i = 0; i < results.rows.length; i++) {
                            //updateStatus(i,0);
                        var row = results.rows.item(i);
                        emailArray[i] = new Array(row['id'], row['bib'], row['lengthTOT'], row['lengthW'], row['front'], row['middle'], row['rear'], row['radius'], row['savedate'], row['lengthH'], row['lengthS'], row['length1'], row['length2'], row['length'], row['tolerance']);
                        //updateStatus("email: "+i+" "+emailArray[i],0);
                        csvArray[i] = new Array(row['id'], row['bib'], row['lengthTOT'], row['lengthW'], row['lengthH'], row['length1'], row['length'], row['lengthS'], row['length2'], row['front'], row['middle'], row['rear'], row['radius'], row['tolerance'], row['savedate']);
                        updateStatus("csv: "+i+" "+csvArray[i]);
                        var skidatarow = new Array(row['id'], row['bib'], row['lengthTOT'], row['lengthW'], row['front'], row['middle'], row['rear'], row['radius'], row['savedate'], row['lengthH'], row['lengthS'], row['length1'], row['length2'], row['length'], row['tolerance']);

                        mytablerow = document.createElement("tr");
                        mytablerow.setAttribute("class","i"+((i+1) % 2));

                        //updateStatus("skidatarow.length: "+skidatarow.length,0);
                        for (var j = 1; j < skidatarow.length; j++) {
                            if (j != 8){
                                //updateStatus("j = "+j,0);
                                mytablecol = document.createElement("td");
                                mytablecol.setAttribute("class","points");
                                //if(j == 0 || j == 1 || j == 8){
                                if(j == 1){
                                    mytablecol.setAttribute("rowspan","2");
                                }
                                mytablecol.appendChild(document.createTextNode(skidatarow[j]));
                                mytablerow.appendChild(mytablecol);
                                if(j == 7){
                                    mytable.appendChild(mytablerow);
                                    mytablerow = document.createElement("tr");
                                    mytablerow.setAttribute("class","i"+((i+1) % 2));
                                }
                            }
                        }
                        mytable.appendChild(mytablerow);
                    }
                    if(document.getElementById('emailbutton')) {
                        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                            emailLink(emailArray,csvArray,1);
                        }else{
                            emailLink(csvArray,"",0);
                        }
                    }
//					if(document.getElementById('csvbutton')) {
//						csvLink(csvArray);	
//					}
                    document.getElementById("skicalcbutton").style.display = 'inline';
                    //document.getElementById("skiData").appendChild(li);
                }else{
                    resetTable()
                    document.getElementById("skicalcbutton").style.display = 'none';
                    mytablerow = document.createElement("tr");
                    mytablerow.setAttribute("class","i1");
                    mytablecol = document.createElement("td");
                    mytablecol.setAttribute("colspan","8");
                    mytablecol.appendChild(document.createTextNode("no data saved"));
                    mytablerow.appendChild(mytablecol);
                        mytable.appendChild(mytablerow);
                }
            }, function(transaction, error){
                updateStatus("Error queryAndUpdateOverview: " + error.code + "<br>Message: " + error.message,1);
            });
        });
    } 
    catch (e) {
        updateStatus("Error queryAndUpdateOverview: Unable to select data from the db " + e + ".",1);
    }
}

// 3. misc utility functions

// db data handler

errorHandler = function(transaction, error){
    updateStatus("Error errorHandler: " + error.message,1);
    return true;
}

nullDataHandler = function(transaction, results){
}

// update view functions

function updateForm(id, bib, lengthTOT, lengthW, lengthH, length1, length, lengthS, length2, front, middle, rear, radius, tolerance){
    //document.skidataForm.id.value = id;
//    document.skidataForm.amount.value = amount;
//    document.skidataForm.name.value = name;
}

function updateStatus(status,message){
	if(document.getElementById('status')) {
    	document.getElementById('status').innerHTML = status;
	}
	window.console && console.log(status);
        if(message == 1){
            alert_empty(status,"");
        }
}
function dataToCSV(csvArray) {
	//updateStatus("start creating csv",0);
	var csv = ""
	csv = 'id;bib;lengthTOT;lengthW;lengthH;length1;length;lengthS;length2;front;middle;rear;radius;tolerance;savedate\n';
	if (csvArray.length != 0){
		//updateStatus("csvArray.length: "+csvArray.length,0);
		for (var i = 0; i < csvArray.length; i++) {
			//updateStatus("i="+i,0);
			//updateStatus("csvArray[i].length: "+csvArray[i].length,0);
			for (var j = 0; j < csvArray[i].length; j++) {	
				csv = csv + csvArray[i][j] ;
				if(j < csvArray[i].length-1){
					csv = csv + ";";
				}
			}
			csv = csv +'\n';
			//updateStatus(csv,0);
		}
	}else{
		csv = csv + 'no data to save;;;;;;;;;;;;;;';
	}
	//updateStatus("dataToCSV: "+csv,0);
	return csv;         
}
function csvLink(csvArray){
	document.getElementById('csvbutton').innerHTML = '<a class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-theme="b" data-role="button" download="'+createEmailDate ()+'.csv" href="data:text/csv;base64,' + btoa(dataToCSV(csvArray)) +'" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Save CSV"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Save CSV</span><span class="ui-icon ui-icon-home-fis ui-icon-shadow"></span></span></a>';
	//updateStatus(atob(btoa(csv,0)));
}
//var downloadDataURI = function(options) {
//  if(!options) {
//    return;
//  }
//  $.isPlainObject(options) || (options = {data: options});
//  if(!$.browser.webkit) {
//    location.href = options.data;
//  }
//  options.filename || (options.filename = "download." + options.data.split(",")[0].split(";")[0].substring(5).split("/")[1]);
//  options.url || (options.url = "http://download-data-uri.appspot.com/");
//  $('<form method="post" action="'+options.url+'" style="display:none"><input type="hidden" name="filename" value="'+options.filename+'"/><input type="hidden" name="data" value="'+options.data+'"/></form>').submit().remove();
//}
//function downloadCSV(csvArray){
//	downloadDataURI({
//		filename: createEmailDate ()+".csv", 
//		data: "data:text/csv;base64,"+btoa(dataToCSV(csvArray))
//	});
//	
//}

function createEmailDate (){
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	if (day < 10){
		day = "0" + day;
	}
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	var emaildate = day+"."+month+"."+year+"%20"+hours+":"+minutes;
	return emaildate;
}
function createEmailTableiPhone(emailarray){	
	updateStatus("start creating email iPhone",0);
	var emailbody = "";

	emailbody = '<table style=\"background: #F6F6F6; border:1px solid #000; border-collapse:collapse\" width=\"100%\">';
	emailbody = emailbody + '<tr style=\"background: #00388C; color:#FFF; border:1px solid #000;\">';
	emailbody = emailbody + '<th rowspan=\"2\" style=\"border:1px solid #000;\">id</th>';
	emailbody = emailbody + '<th rowspan=\"2\" style=\"border:1px solid #000;\">BIB</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>TOT</sub></th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>W</sub></th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">S</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">W</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">H</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">R</th>';
	emailbody = emailbody + '<th rowspan=\"2\" style=\"border:1px solid #000;\">saved on<br>date/time</th>';
	emailbody = emailbody + '</tr>';
	emailbody = emailbody + '<tr style=\"background: #00388C; color:#FFF; border:1px solid #000;\">';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>H</sub></th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>S</sub></th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>1</sub>-20%</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L<sub>2</sub>-10%</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">L</th>';
	emailbody = emailbody + '<th style=\"border:1px solid #000;\">R<sub>T</sub></th>';
	emailbody = emailbody + '</tr>';
	
	if (emailarray.length != 0){
		for (var i = 0; i < emailarray.length; i++) {
			//updateStatus(emailarray.length,0);
//			updateStatus(emailarray[i],0);
//			updateStatus(emailarray[i].length,0);
			
			emailbody = emailbody +'<tr';
			if(((i+1) % 2) == 0){
				emailbody = emailbody +' style=\"background: #F6F6F6; border:1px solid #000\"';
			}else{
				emailbody = emailbody +' style=\"background: #ffffff; border:1px solid #000\"';
			}
			emailbody = emailbody +'>';
			//updateStatus("skidatarow.length: "+skidatarow.length,0);
			for (var j = 0; j < emailarray[i].length; j++) {					
				emailbody = emailbody +'<td align=\"right\" style=\"border:1px solid #000\"';
				if(j == 0 || j == 1 || j == 8){
					emailbody = emailbody +' rowspan=\"2\"';
				}
				emailbody = emailbody +'>';
				emailbody = emailbody +emailarray[i][j];
				emailbody = emailbody +'</td>';
				if(j == 8){
					emailbody = emailbody +'</tr>';
					emailbody = emailbody +'<tr';
					if(((i+1) % 2) == 0){
						emailbody = emailbody +' style=\"background: #F6F6F6;\"';
					}else{
						emailbody = emailbody +' style=\"background: #ffffff;\"';
					}
					emailbody = emailbody +'>';
				}
			}
			emailbody = emailbody +'</tr>';
		}
	}else{
		emailbody = emailbody +'<tr style=\"background: #ffffff;\">';
		emailbody = emailbody +'<td colspan=\"10\">';
		emailbody = emailbody +'</td>';
		mytablecol.appendChild(document.createTextNode("no data saved"));	
	}
	emailbody = emailbody + '</table>';
	//updateStatus(emailbody,0);
	//emailbody = "test";
	//updateStatus("email created",0);
	return emailbody;
}
function emailLink(emailarray,csvarray,iPhone){
	if(iPhone == 1) {
		var emailbody = createEmailTableiPhone(emailarray)
                emailbody = emailbody + "\n\n\n"
                emailbody = emailbody + dataToCSV(csvarray)
	}else{
		var emailbody = dataToCSV(emailarray)
	}
//	var test = encodeURIComponent(createEmailTable(emailarray));
	//updateStatus("emailArray: "+emailarray,0);
	document.getElementById('emailbutton').innerHTML = '<button data-theme="c" type="button"  class="ui-btn ui-btn-c ui-shadow ui-corner-all" onclick="parent.location=\'mailto:?subject=Ski%20radius%20calculator%20list%20from%20'+createEmailDate()+'&body='+encodeURIComponent(emailbody)+'\'\" tabindex="26">Email List</button>';
}
function ResetCalc() {
//        $('#bib').val = "";
//	document.getElementById('bib').value = "";
//	document.getElementById('lengthTOT').value = "";
//	document.getElementById('lengthW').value = "";
        $('#lengthH').html("");
        $('#lengthS').html("");
        $('#length1').html("");
        $('#length2').html("");
        $('#length').html("");
        $('#radius').html("");
        $('#tolerance').html("");
//	document.getElementById('lengthH').innerHTML = "";
//	document.getElementById('lengthS').innerHTML = "";
//	document.getElementById('length1').innerHTML = "";
//	document.getElementById('length2').innerHTML = "";
//	document.getElementById('length').innerHTML = "";
////	document.getElementById('front').value = "";
////	document.getElementById('middle').value = "";
////	document.getElementById('rear').value = "";
//	document.getElementById('radius').innerHTML = "";
//	document.getElementById('tolerance').innerHTML = "";
    if(($('#bib').val())=== true) {
        $('#bib').focus();
    }else{
        $('#lengthTOT').focus();
    }
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function R_round(x, n) {
        if (n < 1 || n > 14) return false;
        var e = Math.pow(10, n);
        var k = (Math.round(x * e) / e).toString();
        if (k.indexOf('.') == -1) k += '.';
        k += e.toString().substring(1);
        return k.substring(0, k.indexOf('.') + n+1);
}
function alert_value(text,element){
	document.getElementById("alerttext").innerHTML = text;
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
	window.console && console.log(element + " is not numeric");
	$( "#alert" ).bind({
		popupafterclose: function(event, ui) {
            if (element != '' || element != 'undefined'){
                document.getElementById(element).value = "";
                document.getElementById(element).focus();
            }
			
		}
	});
}
function alert_empty(text,element){
	v_alert_div = document.getElementById("alerttext");
	if (typeof(v_alert_div) != 'undefined' && v_alert_div != null){	
		v_alert_div.innerHTML = text;
	}
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
    window.console && console.log(element + " is empty");
     $( "#alert" ).bind({
        popupafterclose: function(event, ui) {
            if (element != '' || element != 'undefined'){
                document.getElementById(element).focus();
            }
        }
    });
}
function alert_bigger(text,element){
	document.getElementById("alerttext").innerHTML = text;
	$( "#alert" ).popup({transition: "pop"});
	$( "#alert" ).popup( "open" );
	window.console && console.log(text);
	$( "#alert" ).bind({
		popupafterclose: function(event, ui) {
			if (element != '' || element != 'undefined'){
                document.getElementById(element).focus();
            }
		}
	});
}
function alert_autoclose(text,res){
	document.getElementById("alerttextauto").innerHTML = text;
	$( "#alertauto" ).popup({transition: "pop"});
	$( "#alertauto" ).popup( "open" );
	window.console && console.log(text);
	$( "#alertauto" ).bind({
		popupafteropen: function() {
            setTimeout(function () {
                $( "#alertauto" ).popup("close");
                if(res == 1){
                    ResetCalc();
                }
            }, 500);
        }
	});
}   

function PreCalc(){
    if ($.trim($('#lengthTOT').val()) != ""){
		if (isNaN($('#lengthTOT').val())=== false) {
			LTOT = parseFloat($('#lengthTOT').val());
		}else{
			alert_value("Value for 'Ski total lenght' is not a number!","lengthTOT");
			return;		
		}
	}else if (checkvalue == 0){
		window.console && console.log("Please enter a value for:<br>'Ski total lenght'!",'lengthTOT');
        checkvalue = 1;
		return;
	}
	if ($.trim($('#lengthW').val()) != ""){
		if (isNaN($('#lengthW').val())=== false) {
			LW = parseFloat($('#lengthW').val());
		}else{
			alert_value("Value for 'Ski lenght rear' is not a number!","lengthW");
            checkvalue = 0;
			return;
		}
	}else{
		window.console && console.log("Please enter a value for:<br>'Ski lenght rear'!",'lengthW');
		return;
	}
	if (LW > LTOT){
		alert_bigger("Value for 'Ski lenght rear' is bigger than the value for 'Ski total lenght'. Please check the values.","lengthTOT");
		return;
	}
	
	var LH = parseInt(LW * 0.1);
	var L1 = parseInt((LTOT - LW) * 0.8);
	var LS = parseInt(L1 + LW);
	var L2 = parseInt(LW * 0.9);
	var L = parseInt(L1 + L2);
	window.console && console.log("LH=" + LH);
	window.console && console.log("LS=" + LS);
	window.console && console.log("L1=" + L1);
	window.console && console.log("L2=" + L2);
	window.console && console.log("L=" + L);

	/* $('lengthH').innerHTML = LH;
	$('lengthS').innerHTML = LS;
	$('length1').innerHTML = L1;
	$('length2').innerHTML = L2;
	$('length').innerHTML = L; */
        $('#lengthH').html(LH);
	$('#lengthS').html(LS);
	$('#length1').html(L1);
	$('#length2').html(L2);
        $('#length').html(L);
	checkvalue = 0;
	return;
}

function CalculateSki(mode){
	if ($.trim($('#lengthTOT').val()) != ""){
		if (isNaN($('#lengthTOT').val()) === false) {
			LTOT = parseFloat($('#lengthTOT').val());
		}else{
			alert_value("Value for 'Ski total lenght' is not a number!","lengthTOT");
			return;
		}
	} else {
		alert_value("Please enter a correct value for:<br>'Ski total lenght'!",'lengthTOT');
		return;             
	}
        if ($.trim($('#lengthW').val()) != ""){
		if (isNaN($('#lengthW').val())=== false) {
			LW = parseFloat($('#lengthW').val());
		}else{
			alert_value("Value for 'Ski lenght rear' is not a number!","lengthW");
			return;
                }
	} else {
		alert_value("Please enter a correct value for:<br>'Ski lenght rear'!",'lengthW')  
		return;
	}
	if (LW > LTOT){
		alert_bigger("Value for 'Ski lenght rear' is bigger than the value for 'Ski total lenght'. Please check the values.","lengthTOT");
		return;
	}
	if ($.trim($('#front').val()) != ""){
		if (isNaN($('#front').val()) === false) {
			S = parseFloat($('#front').val());
			window.console && console.log("S=" + S);
		}else{
			alert_value("Value for:<br>'Front ski width' is not a number!","front");
			return;
		}
	}else{
		alert_value("Please enter a correct value for:<br>'Front ski width'!",'front') 
		return;
	}
	if ($.trim($('#middle').val()) != ""){
		if (isNaN($('#middle').val())=== false) {
			W = parseFloat($('#middle').val());
			window.console && console.log("W=" + W);
		}else{
			alert_value("Value for 'Middle ski width' is not a number!","middle");
			return;
		}
	}else{
		alert_value("Please enter a correct value for:<br>'Middle ski width'!",'middle')  
		return
	}
	if ($.trim($('#rear').val())){
		if (isNaN($('#rear').val())=== false) {
			H = parseFloat($('#rear').val());
			window.console && console.log("H=" + H);
		}else{
			alert_value("Value for 'Rear ski width' is not a number!","rear");
			return;
		}
	}else{
		alert_value("Please enter a correct value for:<br>'Rear ski width'!",'rear')  
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
	
	var LH = parseInt(LW * 0.1);
	var L1 = parseInt((LTOT - LW) * 0.8);
	var LS = parseInt(L1 + LW)
	var L2 = parseInt(LW * 0.9);
	var L = parseInt(L1 + L2);
	var R = (L * L)/(2000 * (parseFloat(R_round(S,1)) + parseFloat(R_round(H,1)) - 2 * parseFloat(R_round(W,1))));
        
        if(R == "Infinity")
        {
            alert_empty("Front, middle and rear widths cannot be equal",'front');
            return;
        }
        
	window.console && console.log("S="+S + " SR="+R_round(S,1));
	window.console && console.log("W="+W + " WR="+R_round(W,1));
	window.console && console.log("H="+H + " HR="+R_round(H,1));
	window.console && console.log("LH=" + LH);
	window.console && console.log("LS=" + LS);
	window.console && console.log("L1=" + L1);
	window.console && console.log("L2=" + L2);
	window.console && console.log("L=" + L);
	window.console && console.log("Radius=" + R_round(R,2));
	window.console && console.log("mode=" + mode);
	
	$('#lengthH').html(LH);
	$('#lengthS').html(LS);
	$('#length1').html(L1);
	$('#length2').html(L2);
	$('#length').html(L);
	$('#radius').html(R_round(R,2));

	if (mode == '1'){
		var T = R + R * 0.015
		window.console && console.log("Tolerance=" + R_round(T,2));
		$('#tolerance').html(R_round(T,2));  
	}
        return;
}           
