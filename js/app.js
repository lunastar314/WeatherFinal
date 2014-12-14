$(document).ready(function() {

    $("#owl-example").owlCarousel();
    
    $(window).on("orientationchange",function()
    {
     if(window.orientation == 0)
       {$('#portrait').removeClass("hidden");
            $('#landscape').addClass("hidden");
       }
     else 
       {$('#landscape').removeClass("hidden");
            $('#portrait').addClass("hidden");} 
    });

    var apiKey = '9dd895f2e791fb8329d7d7f729d1e016';
    var apiURL = 'https://api.forecast.io/forecast/' + apiKey;
    var defaultLat = '40.8264';
    var defaultLng = '-73.8786';

    // Request the user's Latitude/Longitude
    if (Modernizr.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        $('#error').text("Unable to find location")
           }

    //Received a Latitude/Longitude from the browser
    function success(position) 
    {
        console.log(position);
        getWeatherWithPos(position.coords.latitude, position.coords.longitude);
    }

    //Unable to find a Latitude/Longitude
    function error(error) {
        console.log(error);
        getWeatherWithPos(defaultLat, defaultLng);
    }

    //Request weather from forecast.io with a Latitude/Longitude
    function getWeatherWithPos(lat, lng) {
        //Construct the url to request
        apiURL += "/" + lat + ',' + lng;
        console.log(apiURL);

        //Make a request to forecast.io
        $.ajax({
            url: apiURL,
            type: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            success: function(response) {
                //The request succeeded
                console.log(response);
                parseWeather(response);
                $('#loader').remove();
            },
            error: function(xhr, status) {
                console.log(status);
                $('#loader').remove();
                $('#error').removeClass("hidden");
                showError();
            }
        });
    }


    // Parse and use the weather values from the forecast.io JSON


    function parseWeather(data) {
        var week = data.daily.data;

        $('#temp').text("Now " + (Math.round(data.currently.apparentTemperature)));
        $('#temp').addClass('degrees');
        $('#sum').text(data.currently.summary);
        $('#temp2').text(Math.round(week[1].temperatureMin));
        $('#temp2').addClass('degrees');
        $('#sum2').text(week[1].summary);
        $('#temp3').text(Math.round(week[2].temperatureMin));
        $('#temp3').addClass('degrees');
        $('#sum3').text(week[2].summary);

        console.log(week);
        var today = data.currently.apparentTemperature;
        var tomorrow = data.daily.data[1];
        var dayAfterTomorrow = data.daily.data[2];
        console.log(tomorrow.temperatureMin);

        console.log(today);
        var imageFile = parseIcon(data.currently.icon);
        console.log("condition: " + data.currently.icon);
        console.log("image file: " + imageFile);

        $('<img>').attr("src", "images/" + imageFile).appendTo('#wrapper');
        console.log(today.icon);

        var image = parseIcon(week[1].icon);
        $('<img>').attr("src", "images/" + image).appendTo('#wrapper2');

        var image = parseIcon(week[2].icon);
        $('<img>').attr("src", "images/" + image).appendTo('#wrapper3');
    
    

         var timeStamp = data.currently.time;
            console.log(timeStamp);
         var d = new Date();
            console.log(d);
            d.setTime(timeStamp*1000);
            console.log(d.setTime);
            var time = [ d.getHours(), d.getMinutes(), d.getSeconds() ];
            var suffix = ( time[0] < 12 ) ? "AM" : "PM";
            time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
            time[0] = time[0] || 12;
   
            $('#t').text(d.getUTCHours() + suffix);
            $('#hour1').text(Math.round(data.hourly.data[0].temperature));
            $('#hour2').text(Math.round(data.hourly.data[1].temperature));
            $('#hour3').text(Math.round(data.hourly.data[2].temperature));
            $('#hour4').text(Math.round(data.hourly.data[3].temperature));
            $('#hour5').text(Math.round(data.hourly.data[4].temperature));
            $('#hour6').text(Math.round(data.hourly.data[5].temperature));
            $('#hour7').text(Math.round(data.hourly.data[6].temperature));
            $('#hour8').text(Math.round(data.hourly.data[7].temperature));
            $('#hour9').text(Math.round(data.hourly.data[8].temperature));
            $('#hour10').text(Math.round(data.hourly.data[9].temperature));
            $('#hour11').text(Math.round(data.hourly.data[10].temperature));
            $('#hour12').text(Math.round(data.hourly.data[11].temperature));
            $('#hour13').text(Math.round(data.hourly.data[12].temperature));
            $('#hour14').text(Math.round(data.hourly.data[13].temperature));
            $('#hour15').text(Math.round(data.hourly.data[14].temperature));
            $('#hour16').text(Math.round(data.hourly.data[15].temperature));
            $('#hour17').text(Math.round(data.hourly.data[16].temperature));
            $('#hour18').text(Math.round(data.hourly.data[17].temperature));
            $('#hour19').text(Math.round(data.hourly.data[18].temperature));
            $('#hour20').text(Math.round(data.hourly.data[19].temperature));
            $('#hour21').text(Math.round(data.hourly.data[20].temperature));
            $('#hour22').text(Math.round(data.hourly.data[21].temperature));
            $('#hour23').text(Math.round(data.hourly.data[22].temperature));
            $('#hour24').text(Math.round(data.hourly.data[23].temperature));


    }

    function parseIcon(icon) {
        switch (icon) {

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
                var img = "rainyNight.jpg";
                break;

            case "snow":
                var img = "snowyDay.jpg"
            case "sleet":
                var img = "snowyNight.jpg";

                break;

                break;
            default:
                "#d86b93";
                break;
        }
        return img;
    }


    // Show an error if we can't access the weather
    function showError() {
        $('#temp').text('Uh-Oh! Style Weather is currently unavailable.');
        $('body').css('background-color', 'rgb(236,93,183');
    }
}
);