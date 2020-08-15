//Setting our variables for the API Key, City Input, and URL
var APIKey = "631af5c78fdde025e0d500219377445c";
var City = "Austin"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + City + "&appid=" + APIKey;

//Temp from K to F

//Running the AJAX call to OpenWeather Map API

$.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(queryURL);
        console.log(response);

        //Temp from K to F
        var Farenheit = (response.main.temp - 273.15) * 1.80 + 32;

        // from UIX Date to Readable Date

        var UnixTimestamp = (response.dt)
        var milliseconds = UnixTimestamp * 1000
        var dateObject = new Date(milliseconds)
            // console.log(dateObject) //console logs day, date, time, and timezone,
        var humanDateFormat = dateObject.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
            // console.log(humanDateFormat)

        //getting the icon

        iconID = response.weather[0].icon


        //Tranfering Data to HTML 
        $(".city-date").text(response.name + " " + humanDateFormat)
        $("#temp").text("Temperature: " + Farenheit.toFixed(2));
        $("#humidity").text("Humidity: " + response.main.humidity + "%")
        $("#windspeed").text("Wind Speed: " + response.wind.speed + "MPH")

        // adding attributes: 
        $(".icon").attr("src", " http://openweathermap.org/img/wn/" + iconID + ".png")

        /* get the UV index and set the text)  nest ajax. use then function that says. pull weather report .then calculatethe UV index*/
        // lat and lon var 
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        console.log(lat)
        console.log(lon)
            //set ajax
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            //adding UV index Text

            $("#UV-index").text("UV Index: " + "" + response.value)
            console.log(response.value)

        })


    })

/* Getting the 5 day forecast*/

// var forecastURL = ""

// $.ajax({
//     url: forecastURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);

//     //creating our forecast elements
//     var cardforecast = $("<section>")
//     var Hforecast = $("<h3>")
//     var Pforecast = $("<p>")

//     //adding class to our forecast elements
//     cardforecast.addClass("card")
//     Hforecast.addClass("forecast-date")
//     Pforecast.addClass("forcast-data")

//     //adding attributes to our forecast elements

//     //adding text to our forecast elements
//     Hforecast.text("")
//     Pforecast.text("")
//         //apending our orecast elements
//     $(".five-day-forecast").append(cardforecast)
//     console.log(cardforecast)

//     console.log(response.list[0].dt_txt)


// });

// //