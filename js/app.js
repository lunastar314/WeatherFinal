$(document).ready(function() {

    $("#owl-example").owlCarousel();
 
    $(window).on("orientationchange", function() {
        if (window.orientation == 0) {
            $('#portrait').removeClass("hidden");
            $('#landscape').addClass("hidden");
        } else {
            $('#landscape').removeClass("hidden");
            $('#portrait').addClass("hidden");
        }
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
    
        

        var timeStamp = data.hourly.data[0].time;
        console.log(timeStamp);
        var d = new Date();
        console.log(d);
        d.setTime(timeStamp * 1000);
        console.log(d.setTime);

        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour1').text(times[0] + suffix);

        timeStamp = data.hourly.data[1].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour2').text(times[0] + suffix);

        timeStamp = data.hourly.data[2].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour3').text(times[0] + suffix);

        timeStamp = data.hourly.data[3].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour4').text(times[0] + suffix);

        timeStamp = data.hourly.data[4].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour5').text(times[0] + suffix);

        timeStamp = data.hourly.data[5].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour6').text(times[0] + suffix);

        timeStamp = data.hourly.data[6].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour7').text(times[0] + suffix);

        timeStamp = data.hourly.data[7].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour8').text(times[0] + suffix);

        timeStamp = data.hourly.data[8].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour9').text(times[0] + suffix);

        timeStamp = data.hourly.data[9].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour10').text(times[0] + suffix);

        timeStamp = data.hourly.data[10].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour11').text(times[0] + suffix);

        timeStamp = data.hourly.data[11].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour12').text(times[0] + suffix);

        timeStamp = data.hourly.data[12].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour13').text(times[0] + suffix);

        timeStamp = data.hourly.data[13].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour14').text(times[0] + suffix);

        timeStamp = data.hourly.data[14].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour15').text(times[0] + suffix);

        timeStamp = data.hourly.data[15].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour16').text(times[0] + suffix);

        timeStamp = data.hourly.data[16].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour17').text(times[0] + suffix);

        timeStamp = data.hourly.data[17].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour18').text(times[0] + suffix);

        timeStamp = data.hourly.data[18].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour19').text(times[0] + suffix);

        timeStamp = data.hourly.data[19].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour20').text(times[0] + suffix);

        timeStamp = data.hourly.data[20].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour21').text(times[0] + suffix);

        timeStamp = data.hourly.data[21].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour22').text(times[0] + suffix);

        timeStamp = data.hourly.data[22].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour23').text(times[0] + suffix);

        timeStamp = data.hourly.data[23].time;
        d = new Date();
        d.setTime(timeStamp * 1000);
        var times = [d.getHours(), d.getMinutes()];
        console.log(times);
        var suffix = (times[0] < 12) ? "AM" : "PM";
        times[0] = (times[0] < 12) ? times[0] : times[0] - 12;
        console.log(times[0])
        times[0] = times[0] || 12;
        console.log(times[0])
        $('#hour24').text(times[0] + suffix);


         
    }

    function parseIcon(icon) {
        switch (icon) {

            case "wind":
            case "clear-day":
            case "partly-cloudy-day":
                var img = "partly-cloudy-day.jpg";
                break;

            case "cloudy":
            case "clear-night":
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