//Setting our variables for the API Key, City Input, and URL
var APIKey = "631af5c78fdde025e0d500219377445c";
var City = ["moscow"];
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + City + "&appid=" + APIKey;



//Calling the City
function displayWeatherData() {
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(queryURL);
            console.log(response);

            //Temp from K to F
            var Farenheit = (response.main.temp - 273.15) * 1.80 + 32;

            // from UIX Date to Readable Date

            var UnixTimestamp = (response.dt)
            var milliseconds = UnixTimestamp * 1000
            var dateObject = new Date(milliseconds)
                //console logs day, date, time, and timezone,
            var humanDateFormat = dateObject.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })

            //getting the icon

            iconID = response.weather[0].icon


            //Tranfering Data to HTML 
            $(".city-date").text(response.name + " " + humanDateFormat)
            $("#temp").text("Temperature: " + Farenheit.toFixed(2) + " °F");
            $("#humidity").text("Humidity: " + response.main.humidity + " %")
            $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH")
            $("#UV-index").text("UV Index: ")

            // adding attributes: 
            $(".icon").attr("src", " https://openweathermap.org/img/wn/" + iconID + ".png")

            /* get the UV index and set the text)  nest ajax. use then function that says. pull weather report .then calculatethe UV index*/
            // lat and lon var 
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            console.log(lat)
            console.log(lon)
                //set UV index ajax
            $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);

                    //adding UV index Text
                    var colorIndex = $("<p>")
                    colorIndex.addClass("data")
                    colorIndex.attr("id", "uv-index")


                    $(colorIndex).text(response.value)
                    $("#current-city").append(colorIndex)
                    console.log(response.value)

                    var uvValue = response.value
                        // CSS attributes to index value
                    if (uvValue < "3") {
                        colorIndex.attr("style", "background-color:green")
                    }
                    if (uvValue >= "3" && uvValue <= "5.99") {
                        colorIndex.attr("style", "background-color: gold")
                    }
                    if (uvValue >= "6" && uvValue <= "7.99") {
                        colorIndex.attr("style", "background-color: orange")
                    }
                    if (uvValue >= "8" && uvValue <= "10.99") {
                        colorIndex.attr("style", "background-color: red")
                    }
                    if (uvValue === "11" || uvValue > "11") {
                        colorIndex.attr("style", "background-color:Indigo")
                    }
                })
                /* Getting the 5 day forecast*/
            var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                for (var i = 0; i < 5; i++) {
                    //creating our forecast elements
                    var cardforecast = $("<section>")
                    var Headerforecast = $("<h3>")
                    var icon = $("<img>")
                    var tempforecast = $("<p>")
                    var humidforecast = $("<p>")


                    //adding class to our forecast elements
                    cardforecast.addClass("card")
                    Headerforecast.addClass("forecast-date")
                    icon.addClass("forecast-icon")
                    tempforecast.addClass("forcast-temp")
                    humidforecast.addClass("forecast-humidity")

                    // adding attributes to our forecast elements
                    icon.attr("src", " https://openweathermap.org/img/wn/" + iconID + ".png")

                    //changing data to readable data
                    UnixTimestamp = (response.daily[i].dt)
                    milliseconds = UnixTimestamp * 1000
                    dateObject = new Date(milliseconds)
                    humanDateFormat = dateObject.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
                    Farenheit = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
                    console.log(Farenheit)
                        //adding text to our forecast elements
                    Headerforecast.text(humanDateFormat)
                    tempforecast.text("Temp: " + Farenheit.toPrecision(4) + " °F")
                    humidforecast.text("Humidity: " + response.daily[i].humidity + "%")



                    //apending our forecast elements
                    $(".five-day-forecast").append(cardforecast)
                    $(cardforecast).append(Headerforecast)
                    $(cardforecast).append(icon)
                    $(cardforecast).append(tempforecast)
                    $(cardforecast).append(humidforecast)
                }
            });


        })
}

// rendering buttons from search box and results history

function renderSearch() {
    $(".searchBtn").on("click", function() {
        event.preventDefault();
        // adding results section
        var result = $("<p>")
        result.addClass("results")


        // adding p element to results sections

        //appending elements

        $(".form").append(result)
        console.log("clicky")

    })
}

renderSearch();
displayWeatherData();