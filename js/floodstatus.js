$(document).ready(function(){viewnow()});

  function viewnow(){
    var a=document.getElementById("damlist").value; 
    var v_url = 'http://m.weather.gov.ph/agaptest/test.php?mdata=' + a

        document.getElementById("vdate").innerHTML = "";
        document.getElementById("vtime").innerHTML = "";
        document.getElementById("vwaterlevel").innerHTML = "";  
        document.getElementById("vwldeviation").innerHTML = "";
        document.getElementById("vfshwl").innerHTML = "";  
        document.getElementById("vfswhldeviation").innerHTML = "";
        document.getElementById("vrcelevation").innerHTML = "";
        document.getElementById("vrcdeviation").innerHTML = "";
        document.getElementById("verr").innerHTML = "";
        document.getElementById("vgate").innerHTML = "";

    $(function(){
      $.ajax({
      url: v_url,
      dataType:'JSON',
      data:{},

      type:'POST',
      success:function(data){
        console.log(data);
        document.getElementById("vdate").innerHTML = "<strong>Date: </strong>" + data[0].fldobservedate;
        document.getElementById("vtime").innerHTML = "<strong>Time: </strong>" + data[0].fldobservedtime;
        document.getElementById("vwaterlevel").innerHTML = "<strong>Water Level: </strong>" + data[0].fldrwl  + "m";
        document.getElementById("vwldeviation").innerHTML = "<strong>Water Level Deviation: </strong>" + data[0].fldwaterdeviation;
        if(data[0].fldfloodseason == 1){
          document.getElementById("vfshwl").innerHTML = "<strong>FSHWL: </strong>" + data[0].fldfshwl  + "m";
          document.getElementById("vfswhldeviation").innerHTML = "<strong>FSHWL Deviation: </strong>" + data[0].fldfshwdeviation + "m";
        } else {
          document.getElementById("vfshwl").innerHTML = "<strong>NSHWL: </strong>" + data[0].fldfshwl  + "m";
          document.getElementById("vfswhldeviation").innerHTML = "<strong>NSHWL Deviation: </strong>" + data[0].fldfshwdeviation + "m";
        }
        document.getElementById("vrcelevation").innerHTML = "<strong>Rule Curve Elevation: </strong>" + data[0].fldrulecurveelevation + "m";
        document.getElementById("vrcdeviation").innerHTML = "<strong>Rule Curve Deviation: </strong>" + data[0].fldrulecurvedeviation + "m";
        document.getElementById("verr").innerHTML = "<strong>Estimated RR: </strong>" + data[0].fldfswlrramount;
        document.getElementById("vgate").innerHTML = "<strong>Gate Opening (m): </strong>" + data[0].fldgateopening;
      }	,  error: function (request, textStatus, errorThrown) {

		errMsg();	
        console.log(textStatus);
        console.log(errorThrown);
    }
    })
  })}
