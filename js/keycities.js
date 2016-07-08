var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[]; arrWindStr=[], arrWindDir=[];
var arrIcon1=[], arrMin1=[], arrMax1=[];
var arrIcon2=[], arrMin2=[], arrMax2=[];
var arrIcon3=[], arrMin3=[], arrMax3=[];
var arrIcon4=[], arrMin4=[], arrMax4=[];
var arrIcon5=[], arrMin5=[], arrMax5=[];
var vDateIssued;
var arrDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


$(document).ready(function()
{
    //var scrheight = screen.height - (screen.height * .5);
    document.getElementById('map-canvas').style.width="100%";
    document.getElementById('map-canvas').style.height="100%"; //scrheight + "px";
    if (!navigator.geolocation) 
    {
      console.log("error in getting location");
    } else {
      // Philippines 12.330240, 122.231560
      vLat = 12.330240; vLong = 122.231560;
      
      
      $.ajax({
        type: "GET",
        url: "http://m.weather.gov.ph/agaptest/outlook.php",
        async: false,
        success: function(myData){
          vDateIssued = myData.result.data[0].date;
          for(var i = 0; i < 16; i++){
          arrCityName.push(myData.result.data[i].cityName);
          arrWindStr.push(myData.result.data[i].windStr);
          arrWindDir.push(myData.result.data[i].windDir);

          //first info
          arrIcon1.push("img/weather-icons/day" + myData.result.data[i].day1.logo + ".png");
          arrMin1.push(myData.result.data[i].day1.min);
          arrMax1.push(myData.result.data[i].day1.max);

          //second info
          arrIcon2.push("img/weather-icons/day" + myData.result.data[i].day2.logo + ".png");
          arrMin2.push(myData.result.data[i].day2.min);
          arrMax2.push(myData.result.data[i].day2.max);

          //third info
          arrIcon3.push("img/weather-icons/day" + myData.result.data[i].day3.logo + ".png");
          arrMin3.push(myData.result.data[i].day3.min);
          arrMax3.push(myData.result.data[i].day3.max);

          //fourth info
          arrIcon4.push("img/weather-icons/day" + myData.result.data[i].day4.logo + ".png");
          arrMin4.push(myData.result.data[i].day4.min);
          arrMax4.push(myData.result.data[i].day4.max);

          //fifth info
          arrIcon5.push("img/weather-icons/day" + myData.result.data[i].day5.logo + ".png");
          arrMin5.push(myData.result.data[i].day5.min);
          arrMax5.push(myData.result.data[i].day5.max);
          
        }},  error: function (request, textStatus, errorThrown) {
       errMsg();
        console.log(textStatus);
        console.log(errorThrown);
    }
		
		
		
      });
	  if(vDateIssued == undefined)
	  {
		  
		  errMsg();
	  }
	  else{
	    google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));	  
	  }
  
    }
});


function initialize(vLat, vLong, vZoom)
{
 var arrLocations =[
    ['Zamboanga', 6.920318, 122.086241],
    ['Metro Davao', 7.098048, 125.610844],
    ['Valencia City', 7.865434, 125.169273],
    ['Cagayan De Oro', 8.456392, 124.627907],
    ['Tacloban City', 11.255724, 124.950940],
    ['Metro Cebu', 10.308863, 123.915028],
    ['Iloilo City', 10.720089, 122.560381],
    ['Puerto Princesa', 9.9474401,118.5145237],
    ['Legazpi City', 13.1212078,123.6330866],
    ['Lipa City', 13.944612,121.0981374],
    ['Tagaytay City', 14.11722,120.8988919],
    ['Olongapo City', 14.882156,120.2759178],
    ['Baguio City', 16.3995547,120.5537555],
    ['Laoag City', 18.1981728,120.5276349],
    ['Tuguegarao City', 17.6022296,121.6894235],
    ['Metro Manila', 14.599598, 120.984797]
  ];
  vImageURL = "img/weather-icons/partly_cloudy_skies.png";
  var myMapStyle = setMyMapStyle();
  var mapReference = new google.maps.StyledMapType(myMapStyle, {name: "Styled Map"});
  var mapOptions = 
    {
      zoom: vZoom,
      center: new google.maps.LatLng(vLat, vLong),
      //mapTypeId: google.maps.MapTypeId.HYBRID,
      disableDefaultUI: true,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]}
    };
  var positionstring;
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.mapTypes.set("map_style", mapReference);
  map.setMapTypeId("map_style");
  

  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  document.getElementById("issueddate").innerHTML = "<p>Date Issued: "+vDateIssued+"</p>";

  for(i=0; i<arrLocations.length; i++)
  {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(arrLocations[i][1], arrLocations[i][2]),
      map:map,
      icon: arrIcon1[i]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      var vLayout = "<br /><table border='1'><tr><td colspan='5'><strong>"+arrCityName[i]+"</strong><br />Wind Strength: "+arrWindStr[i]+"<br />Wind Direction: "+arrWindDir[i]+"</td></tr>";
      vLayout += "<tr><td><span><strong>"+displayDay(0)+"</strong></span><br /><img src="+arrIcon1[i]+"><br /><span>"+arrMin1[i]+" - "+arrMax1[i]+"&degC</span></td>";
      vLayout += "<td><span><strong>"+displayDay(1)+"</strong></span><br /><img src="+arrIcon2[i]+"><br /><span>"+arrMin2[i]+" - "+arrMax2[i]+"&degC</span></td>";
      vLayout += "<td><span><strong>"+displayDay(2)+"</strong></span><br /><img src="+arrIcon3[i]+"><br /><span>"+arrMin3[i]+" - "+arrMax3[i]+"&degC</span></td>";
      vLayout += "<td><span><strong>"+displayDay(3)+"</strong></span><br /><img src="+arrIcon4[i]+"><br /><span>"+arrMin4[i]+" - "+arrMax4[i]+"&degC</span></td>";
      vLayout += "<td><span><strong>"+displayDay(4)+"</strong></span><br /><img src="+arrIcon5[i]+"><br /><span>"+arrMin5[i]+" - "+arrMax5[i]+"&degC</span></td></tr></table>";
      vLayout += "<p style='text-align:right !important; text-color:gray; font-size:small; font-style: italic'>Date Issued: "+vDateIssued+"</p>";
      infowindow.setContent(vLayout);
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
}

function displayDay(z){
  var parts, timepart;
  parts = vDateIssued.split(' ');
  timepart = parts[0].split('\n');
  myDatestring = parts[1]+" "+ timepart[1] +", "+parts[2];
  mydate = new Date(myDatestring);
  mydate.setDate(mydate.getDate()+z);
  return arrDay[mydate.getDay()];
}