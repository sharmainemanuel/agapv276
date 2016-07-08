var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[], arrIcon=[], arrMinTemp=[], arrMaxTemp=[];
var initialposition, currentLat, currentLon;
var marker;

$(document).ready(function()
{
    //var scrheight = screen.height - (screen.height * .5);
    document.getElementById('map-canvas').style.width="100%";
    document.getElementById('map-canvas').style.height="100%"; //scrheight + "px";
    if (!navigator.geolocation) 
    {
      console.log("error in getting location");
    } else {

      //vLat = 12.330240; vLong = 122.231560;

      console.log(vLat + ", " + vLong);
      google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 7));
      
	  navigator.geolocation.getCurrentPosition(function(position){
	  	vLat=position.coords.latitude; currentLat=vLat;
	  	vLong=position.coords.longitude; currentLon=vLong;
	  	console.log(vLat + ", " + vLong);
	  	initialposition = new google.maps.LatLng(vLat, vLong);
	  	console.log("initial" + initialposition);
	   	map.setCenter(initialposition);map.setZoom(7);
      marker = new google.maps.Marker({position: new google.maps.LatLng(currentLat, currentLon), map:map, icon:"img/man.png"});
	  marker.setAnimation(google.maps.Animation.BOUNCE);
      marker.setMap(map);
	  });
    }
});


function initialize(vLat, vLong, vZoom)
{

  var myMapStyle = setMyMapStyle();
  var mapReference = new google.maps.StyledMapType(myMapStyle, {name: "Styled Map"});
  var mapOptions = 
    {
      zoom: vZoom,
      center: new google.maps.LatLng(vLat, vLong),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      /*disableDefaultUI: true,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]}*/
    };
  var positionstring;
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.mapTypes.set("map_style", mapReference);
  map.setMapTypeId("map_style");

  var kmzLayer = new google.maps.KmlLayer('http://publicalert.pagasa.dost.gov.ph/file/track.kmz',{preserveViewport:true});
  kmzLayer.setMap(map);


}