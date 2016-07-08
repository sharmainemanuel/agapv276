			$(document).ready(function(){
		$.ajax
({

  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/gfa.php",
  async: false,

  success: function (result2){
	setTimeout(function(){
		$('#imgLoader').fadeOut();	
		}, 1000);
	if(result2.result == "" || result2.result == null){
			$( ".inner" ).html("<h3>As of today there is no flood advisory</h3>");
	}
	else{
 	var region = result2.result['cb8dea14-6e0a-468d-88aa-b02bd2840df7'].info.parameter.value;
 	var area = result2.result['cb8dea14-6e0a-468d-88aa-b02bd2840df7'].info.area.areaDesc;
 	var headline = result2.result['cb8dea14-6e0a-468d-88aa-b02bd2840df7'].info.headline;
 	var description = result2.result['cb8dea14-6e0a-468d-88aa-b02bd2840df7'].info.description;

	
			$( ".inner" ).html("<p><span>Region: </span><br>" +region+"</p><p><span>Area: </span><br>" +area+"</p><p><span>Headline: </span><br>" +headline+"</p><p><span>Description: </span><br>" +description+"</p>");
		
	}


	}	,  error: function (request, textStatus, errorThrown) {
	setTimeout(function(){ $('#imgLoader').fadeOut();}, 1000); 
		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});