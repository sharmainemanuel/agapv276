var MyAdvisoryII;
var Advisory=[], Advisory2=[],Advisory3=[],aw;
function getData(){	
		var divisionResult = document.getElementById('div').value;
		$.ajax
({
  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/ts_watch2.php",
  async: false,
  success: function (result2){
		var div = Object.keys(result2.result);
		for(j=0; j<=div.length; j++){
			if(div[j] == divisionResult){
				var testing = JSON.stringify(result2);
				var res = testing.replace("watch/info", "watch");
				var test = JSON.parse(res);	
				var watch = test.result[divisionResult]['watch/info'];
				
				var Advisory = result2.result[divisionResult].Advisory;
				var Advisory2 = result2.result[divisionResult].Advisory_2;
				var Advisory3	 = result2.result[divisionResult].Advisory_3;
		
				var watchImg;
				if (watch != undefined){
					
					if(watch == "Thunderstorm Watch"){
						watch = "Thunderstorm Watch";
						 watchImg = "<img src='img/newwatch.png' style='width:30% !important;'>";
					}
					else{
						watch = "Thunderstorm Information"
						
						 watchImg = "<img src='img/newinfo.png' style='width:30% !important;'>";
					}
					
				}
				else
				{
					watch = "Thunderstorm Advisory";
					 watchImg = "<img src='img/newthunderstom.png' style='width:30% !important;'>";	
					
				}
				if( Advisory2  !=  undefined ){
			
					MyAdvisoryII = "<br><strong></strong>"+Advisory2+"<br>";
				}
				else{
					MyAdvisoryII =  "";	
				}	
				if( Advisory3  !=  undefined ){
		
					MyAdvisoryIII = "<br><strong></strong>"+Advisory3+"<br>";
				}
				else{
					MyAdvisoryIII =  "";	
				}
				var mytime = result2.result[divisionResult].Issued_Time;
				var myday = result2.result[divisionResult].Day;
				var mymonth = result2.result[divisionResult].Month;
				var myyear = result2.result[divisionResult].Year;
				var issued_at = mytime + " " +myday+" " +mymonth+ " " +myyear;
				
				document.getElementById('inner').innerHTML = "<p><strong><center>"+watch+"</center></strong></p><br><center>"+watchImg+"</center><br><strong>Issued at :</strong>"+issued_at+ "<br><br>"+"<strong></strong>"+Advisory +"	<br>"+MyAdvisoryII+MyAdvisoryIII;
		
			}
		}


							
				}	
					,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
			
		

	
});


}