var atime=[], adate=[], aseaboard=[], aseaboardarea=[], aweather=[], awindforce=[], aseacondition=[], awaveheight=[], htmlcontent="", vObject;

$(document).ready(function(){
	
	
	
$.ajax
({
  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/gencontent.php",
  async: false,

  success: function (result3){	
  var warningNum = result3.result[0].warning_num;
  var synop1 = result3.result[0].synop1;
  var issuedTime = result3.result[0].time;
  var issuedDate = result3.result[0].date;
  var synop2 = result3.result[0].synop2;
	
	 var htmlData = "";
	 htmlData += "<p><strong>GALE WARNING:</strong>"+warningNum+"<br></p>";
	 htmlData += "<p><strong>For:</strong><br/>"+synop1+"<br></p>";
	 htmlData += "<p><strong>Issued Date:</strong>"+issuedTime+","+issuedDate+"<br></p>";
	 htmlData += "<p>"+synop2+"</p>";
	 if (synop2 == undefined || synop2 == ""){
		  document.getElementById('gale-header').innerHTML ="<p><strong>No data Available</strong></p>";
		 
	 }
	 else{
	 document.getElementById('gale-header').innerHTML = htmlData;
	 }
  }
  ,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
  
});
$.ajax
({
  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/gen_gale.php",
  async: false,

  success: function (result2){
  	var m = document.getElementById("seaboardlist");
  	vObject=result2.result;
	setTimeout(function(){$('#imgLoader').fadeOut();}, 500);

	for(var i=0; i<=result2.result.length-1;i++){
		atime.push(vObject[i].time);
		adate.push(vObject[i].date);
		aseaboard.push(vObject[i].seaboard);
		aseaboardarea.push(vObject[i].seaboardarea);
		aweather.push(vObject[i].weather);
		awindforce.push(vObject[i].windforce);
		aseacondition.push(vObject[i].seacondition);
		awaveheight.push(vObject[i].waveheight);

		htmlcontent	+="<option value=";
		htmlcontent+=(i==0)?(i+1)+" selected>":(i+1)+">";
	    htmlcontent+=result2.result[i].seaboard;
	    htmlcontent+="</option>";}


	
	if(aseaboardarea[indx] == undefined){
		document.getElementById("seaboard").innerHTML = "<strong>No data Available</strong>";
		
	}
	else{
			$("#seaboardlist").append(htmlcontent);
			viewnow();
	}

	}
	,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});

function viewnow(){
	var indx = document.getElementById("seaboardlist").value - 1;
	//document.getElementById("vdate").innerHTML = "<strong>Date: </strong>" + adate[indx];
//	document.getElementById("vtime").innerHTML = "<strong>Time: </strong>" + atime[indx];
	document.getElementById("seaboard").innerHTML = "<strong>Seaboard:<br/> " + aseaboard[indx] + "</strong>";
	document.getElementById("seaboardarea").innerHTML = "<strong>Seaboardarea: </strong> <br/>" + aseaboardarea[indx];
	document.getElementById("weather").innerHTML = "<strong>Weather: </strong><br/>" + aweather[indx];
	document.getElementById("windforce").innerHTML = "<strong>Windforce: </strong>" + awindforce[indx];
	document.getElementById("seacondition").innerHTML = "<strong>Seacondition: </strong>" + aseacondition[indx];
	document.getElementById("waveheight").innerHTML = "<strong>Waveheight: </strong>" + awaveheight[indx];
}