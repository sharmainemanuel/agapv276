var mvalue = 0, vdate=[], wcat=[], wnum=[], ttype=[], tcname=[], tcnum=[];
var incradar=[], vloc=[], fcst=[], fcstval=[], seacon=[], tcradius=[], vextent=[];

$(document).ready(function(){
	$.ajax({
		type:"GET",
		url: "http://m.weather.gov.ph/agaptest/iws.php",
		//url: "iws.json",
		async: false,
		success: function(dt){
			setTimeout(function(){
				$('#imgLoader').fadeOut();
				
				if(dt.result.length<2)
					$('.selectoption').attr('style', 'display:none');

				for(var a=0; a<dt.result.length;a++){
					wcat.push(dt.result[a].warning_category);
					wnum.push(dt.result[a].warning_number);
					vdate.push(dt.result[a].date);
					ttype.push(dt.result[a].tc_type);
					vloc.push(dt.result[a].location_latlng);
					fcst.push(dt.result[a].fcst);
					fcstval.push(dt.result[a].fcst_value);
					seacon.push(dt.result[a].sea_condition);
					tcradius.push(dt.result[a].tc_radius);
					vextent.push(dt.result[a].extent);

					if (dt.result[a].int_tc_name == "" || dt.result[a].int_tc_name == undefined)
						tcname.push("NONE");
					else
						tcname.push(dt.result[a].int_tc_name);

					if (dt.result[a].int_tc_indicator == "" || dt.result[a].int_tc_indicator == undefined)
						tcnum.push("NONE");	
					else
						tcnum.push(dt.result[a].int_tc_indicator);

					if (dt.result[a].includes_radar == "" || dt.result[a].includes_radar == undefined)
						incradar.push("NONE");
					else
						incradar.push(dt.result[a].includes_radar);
					

					var htmlcontent	="<option value=";
					htmlcontent+=(a==0)?(a+1)+" selected>":(a+1)+">";
				    htmlcontent+=ttype[a] + " " + tcname[a];
				    htmlcontent+="</option>";
				    $("#weatheroptions").append(htmlcontent);
				}
				viewnow(0);
			});
		}
	});
});

function viewnow(b){
	var mystring = "<ul data-role=listview data-inset=false data-icon=false data-divider-theme=b class=ui-listview>";
	mystring += "<li class='ui-li-static ui-body-inherit ui-first-child'><span><strong>Warning Category: </span></strong>"+wcat[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Warning Number:</strong> "+wnum[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Tropical Type: </strong>"+ttype[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Tropical International Name: </strong>"+tcname[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Tropical Number: </strong>"+tcnum[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Includes Radar: </strong>"+incradar[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Location(lat, lon): </strong>"+vloc[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Forecast Value: </strong>"+fcstval[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Sea Condition: </strong>"+seacon[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Tropical Radius: </strong>"+tcradius[b]+" </li>";
	mystring += "<li class='ui-li-static ui-body-inherit'><strong> Extent: </strong>"+vextent[b]+" </li></ul>";
	document.getElementById("inner").innerHTML = mystring;
}
