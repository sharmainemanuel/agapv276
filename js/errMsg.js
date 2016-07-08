function errMsg()	{
new $.nd2Toast({ 
						   message : "Data not Available ", // Required
						   action : { // Optional (Defines the action button on the right)
							 title : "Try Again", // Title of the action button
							 fn : function() { // function that will be triggered when action clicked
								//console.log("Action Button clicked'");
								location.href="main2.html";
							 },
							 color : "red" // optional color of the button (default: 'lime')
						   },
						   ttl : 15000 // optional, time-to-live in ms (default: 3000)
						 });
}
	
