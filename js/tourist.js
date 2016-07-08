var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[];
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
        url: "http://m.weather.gov.ph/agaptest/tourist.php",
        async: false,
        success: function(myData){
            setTimeout(function(){
            $('#imgLoader').fadeOut();
          vDateIssued = myData.result[0].date;
          for(var i = 0; i < 13; i++){
          arrCityName.push(myData.result[i].city_name);

          //first info
          arrIcon1.push("img/weather-icons/day" + myData.result[i].logo + ".png");
          arrMin1.push(myData.result[i].min);
          arrMax1.push(myData.result[i].max);

          //second info
          arrIcon2.push("img/weather-icons/day" + myData.result[i].logo_2 + ".png");
          arrMin2.push(myData.result[i].min_2);
          arrMax2.push(myData.result[i].max_2);

          //third info
          arrIcon3.push("img/weather-icons/day" + myData.result[i].logo_3 + ".png");
          arrMin3.push(myData.result[i].min_3);
          arrMax3.push(myData.result[i].max_3);

          //fourth info
          arrIcon4.push("img/weather-icons/day" + myData.result[i].logo_4 + ".png");
          arrMin4.push(myData.result[i].min_4);
          arrMax4.push(myData.result[i].max_4);

          //fifth info
          arrIcon5.push("img/weather-icons/day" + myData.result[i].logo_5 + ".png");
          arrMin5.push(myData.result[i].min_5);
          arrMax5.push(myData.result[i].max_5);
        }
        google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));
 }, 500);  
      },
	  error: function (request, textStatus, errorThrown) {
        errMsg();
        console.log(textStatus);
        console.log(errorThrown);
    }
      });
      
    }
});


function initialize(vLat, vLong, vZoom)
{
 var arrLocations =[
    ['Vigan', 17.571552, 120.388743],
    ['Baguio', 16.419990, 120.627217],
    ['Banaue', 16.924258, 121.055828],
    ['Anilao', 14.5523275,121.0159013],
    ['Puerto Galera', 13.501217, 120.951805],
    ['Taal', 14.012419, 120.997691],
    ['Naga', 13.661271, 123.331350],
    ['El Nido', 11.203307, 119.413925],
    ['Boracay', 11.972304, 121.923452],
    ['Bohol', 9.834000, 124.198047],
    ['Cebu', 10.293816, 123.901923],
    ['Camiguin', 9.182305, 124.728511],
    ['Davao',6.994599, 125.269963]
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
  // if(vDateIssued.includes("Today"))
  //   vDateIssued = vDateIssued.replace("Today", "");

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
      var vLayout = "<br /><table border='1'><tr><td colspan='5'><strong>"+arrCityName[i]+"</strong><br /></td></tr>";
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
  //timepart = parts[0].split('\n');
  myDatestring = parts[parts.length -2]+" "+ parts[parts.length -3] +", "+parts[parts.length -1];
  mydate = new Date(myDatestring);
  mydate.setDate(mydate.getDate()+z);
  return arrDay[mydate.getDay()];
}