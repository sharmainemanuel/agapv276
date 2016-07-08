
	
	$(document).ready(function(){
	$.ajax({
	  type: "GET",
	  url: "http://m.weather.gov.ph/agaptest/weekly_outlook.php",
	  async: false,
	  success: function (result2){
		setTimeout(function(){
		$('#imgLoader').fadeOut();
			var issuedtime = result2.result[0].issuedtime;
			var description = result2.result[0].outlook1;
				 if(description.indexOf("Â") > -1)
    description = description.replace("Â", "");
			$( ".inner" ).html("<p>"+description+"</p>");
		 }, 1000);		
		}
		,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
	});
});
