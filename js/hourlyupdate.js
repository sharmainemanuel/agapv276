
			$(document).ready(function(){
		$.ajax
({

  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/ty_hourly.php",
  async: false,

  success: function (result2){
	setTimeout(function(){
		$('#imgLoader').fadeOut();	 }, 1000);
		var test =result2.result[result2.result.length-1];
		
 	var ty_name = test.ty_name;

 	var intl_name = test.intl_name;
 	var ty_date = test.ty_date;
 	var ty_time = test.ty_time;
 	//var issued_for = test.ty_lat;
 	//var issued_for = test.ty_lon;
 	var ty_reference = test.ty_reference;

	if (ty_name == undefined ){
		
		$( ".inner" ).html("<p><strong>No data available</p>");
	}
	else{
	$( ".inner" ).html("<p><strong>Typhoon Name:<br> </strong>"+ty_name+"</p><p><strong>International Name:</strong><br> "+intl_name+"</p><p><strong>Issued :</strong><br> "+ty_time+ " ,"+ty_date+"</p><p><strong>Reference: <br> </strong>" +ty_reference+"</p>");
	
	
	}

	},  error: function (request, textStatus, errorThrown) {
     errMsg();
	 	setTimeout(function(){
		$('#imgLoader').fadeOut();	 }, 1000);
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});