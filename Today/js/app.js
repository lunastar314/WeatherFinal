$(document).ready(function(){

	var apiKey = '9dd895f2e791fb8329d7d7f729d1e016';
	var apiURL = 'https://api.forecast.io/forecast/' + apiKey;
	var defaultLat = '40.8264';
	var defaultLng = '-73.8786';
	
	// Request the user's Latitude/Longitude
	if (Modernizr.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error);
		}
		else {
			//Prompt User
		}
		
		//Received a Latitude/Longitude from the browser
		function success(position) {
			console.log(position);
			getWeatherWithPos(position.coords.latitude,position.coords.longitude);
		}
		
		//Unable to find a Latitude/Longitude
		function error(error) {
			console.log(error);
			getWeatherWithPos(defaultLat, defaultLng);
		}
		
		//Request weather from forecast.io with a Latitude/Longitude
		function getWeatherWithPos(lat,lng) {
			//Construct the url to request
			apiURL += "/" + lat + ',' +  lng;
			console.log(apiURL);
			
			//Make a request to forecast.io
			$.ajax({
					url: apiURL,
					type: "GET",
					crossDomain: true,
					dataType: 'jsonp',
					success: function (response) {
					//The request succeeded
					console.log(response);
					parseWeather(response);
					$('#loader').remove();
					},
					error: function (xhr, status) {
						console.log(status);
						showError();
					}
			});
		}
	

	// Parse and use the weather values from the forecast.io JSON
	

	function parseWeather(data) 
	{
		$('#temp').text("Now " +(Math.round(data.currently.apparentTemperature)));
		$('#temp').addClass('degrees');
		$('#sum').text(data.currently.summary);
	
		var today = data.currently.apparentTemperature;
		var imageFile= parseIcon(data.currently.icon);
		console.log("condition: "+ data.currently.icon);
		console.log("image file: " + imageFile);

		 $('<img>').attr("src", "images/"+ imageFile).appendTo('#wrapper');
		// var img= $('<img>');
		// img.attr("src","images/" + imageFile);
		// img.appendTo('#icon');
		console.log(today.icon);
	}
	
	 function parseIcon(icon)
	 {
	    	switch(icon) 
	    	{
	    		case "cloudy":
	    		case "wind":
    			case "partly-cloudy-day":	
                	   var img = "partly-cloudy-day.jpg";
			
				break;

			case "cloudy":
			case "partly-cloudy-night":	
                	   var img = "partly-cloudy-night.jpg";

	               		 break;
    			case "rain":
                	  var img = "rainyDay.jpg";

	               		 break;
    			case "snow":
			case "sleet":
        	           var img = "snowyDay.jpg";
                	
				break;
    			default: "#d86b93";
    				break;	
		}
		return img;
    	}


	// Show an error if we can't access the weather
	function showError()
	{
		$('#temp').text('Uh-Oh! Style Weather is currently unavailable.');
		$('body').css('background-color','rgb(236,93,183');	
	}

});
