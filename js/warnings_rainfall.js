var warningnum = [];
var weathersystem = [];
var finals = [];
var advisory = [];
var advisory2 = [];
var advisory3 = [];
var advisory4 = [];
var yellowarea = [];
var orangearea = [];
var redarea = [];
var yellowimpact= [];
var orangeimpact = [];
var redimpact = [];
//var vtime, vday, vmonth, vyear, vIssuedAt;
var vtime = [];
var vday = [];
var vmonth = [];
var vyear = [];

$(document).ready(function(){
	$.ajax({
		type:"GET",
		url: "http://m.weather.gov.ph/agaptest/rainfall_warning.php",
		async: false,
		success: function (a){

			/*vtime = a.result[1][0].Issued_Time;
			vday = a.result[1][0].Day;
			vmonth = a.result[1][0].Month;
			vyear = a.result[1][0].Year;
			vIssuedAt = vtime + ", " + vday+ " " + vmonth + " " + vyear;*/


			for(i=0;i<=a.result.length-1;i++){
				vtime.push(a.result[i][0].Issued_Time);
				vday.push(a.result[i][0].Day);
				vmonth.push(a.result[i][0].Month);
				vyear.push(a.result[i][0].Year);
		
			//console.log(vIssuedAt);


			
				warningnum.push(a.result[i][0].Warning_Number);
				weathersystem.push(a.result[i][0].Weather_System);
				finals.push(a.result[i][0].Final);
				advisory.push(a.result[i][0].Advisory);
				advisory4.push(a.result[i][0].Advisory_4);
				advisory3.push(a.result[i][0].Advisory_3);
				advisory2.push(a.result[i][0].Advisory_2);
				yellowarea.push(a.result[i][0].Yellow_Area);
				orangearea.push(a.result[i][0].Orange_Area);
				redarea.push(a.result[i][0].Red_Area);
				yellowimpact.push(a.result[i][0].Yellow_Impact);
				orangeimpact.push(a.result[i][0].Orange_Impact);
				redimpact.push(a.result[i][0].Red_Impact);
			}
		}	,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
	});
})
 	
function getData(x){
var yellow, red, orange, dstr;

var fin,ad,ad2,ad3,ad4;
var vIssuedAt;
			vIssuedAt = vtime[x] + ", " + vday[x]+ " " + vmonth[x] + " " + vyear[x];
if (advisory[x] != undefined)
	ad = "<p>"+advisory[x]+	"</p>";
else 
	ad = "";

if (advisory2[x] != undefined)
	ad2 = "<p>"+advisory2[x]+	"</p>";
else 
	ad2 = "";

if (advisory3[x] != undefined)
	ad3 = "<p>"+advisory3[x]+	"</p>";
else 
	ad3 = "";

if (advisory4[x] != undefined)
	ad4 = "<p>"+advisory4[x]+	"</p>";
else 
	ad4 = "";






if(finals[x] != undefined)
		 fin= "<p>"+finals[x]+"</p>";
	
else
		fin = "";
	
	
if(yellowarea[x].trim() != "")
	yellow= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/newyellow.png> <h2>"
		+yellowarea[x]+"</h2>	<p>"+yellowimpact[x]+"</p> </li> ";			
else
	yellow ="";

if(orangearea[x].trim() != "")
	orange= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/neworange.png>  <h2>"
		+orangearea[x]+"</h2><p>"+orangeimpact[x]+"</p>  </li>";	
else
	orange ="";

if(redarea[x].trim() != "")
	red= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/newred.png><h2>"
		+redarea[x]+"</h2><p>"+redimpact[x]+"</p>  </li>";		
else
	red ="";

dstr =	"<ul data-role=listview data-inset=false data-icon=false data-divider-theme=b class=ui-listview>"; 
dstr +=	"<li class='ui-li-static ui-body-inherit'> <span>Rainfall Warning No. </span>" + warningnum[x] + " </li> ";
dstr +=	"<li class='ui-li-static ui-body-inherit ui-first-child'><span>Issued at:</span> " + vIssuedAt
+"<br><br><span>Valid until:  </span> 12:00 PM Today</li> ";

dstr += yellow+orange+red+"</ul>" ;

dstr += fin;
dstr += ad+ad2+ad3+ad4;

document.getElementById('inner').innerHTML = dstr;

}