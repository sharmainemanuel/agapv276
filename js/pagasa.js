$(document).ready(function(){
	getLocation();  
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
		//	console.log("get location");
    } else { 
        x.innerHTML = "please check your GPS.";
		console.log("error in getting location");
    }
}
});
		








