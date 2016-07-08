/*$(document).ready(function(){$.ajax({type:"GET",url:"http://m.weather.gov.ph/agaptest/special_fcst.php",async:!1,success:function(e){setTimeout(function(){$("#imgLoader").fadeOut();var t=e.result[0].title,s=e.result[0].issued,o=e.result[0].p1;$(".inner").append("<p>"+s+"<br><br>"+t+"<br><br>"+o+"</p>")},1e3)},error:function(e,t,s){console.log(e.responseText),console.log(t),console.log(s)}})});*/


$(document).ready(function(){
		$.ajax
({

  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/special_fcst.php",
  async: false,

  success: function (result2){

	setTimeout(function(){
		$('#imgLoader').fadeOut();
 	var title = result2.result[0].title;
 	var issued = result2.result[0].issued;
 	var p1 = result2.result[0].p1;

	$( ".inner" ).append("<p>"+issued+"<br><br>"+title+"<br><br>"+p1+"</p>");
	 }, 1000);	
	},  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});