$('#output').hide()

function print(message) {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = message;
  }

function buildList(arr) {
var listHTML = "<ul>";
    for(var i=0;i<arr.length;i++) {
    listHTML += "<li>" + arr[i] + "</li>";
    }
listHTML += "</ul>";
listHTML += "<button class='btn btn-primary' id='reset'>Change City</button>"
return listHTML.fontsize(4);
}

$('#midForm').on('submit', function(e){
    var city = $("#city").val().toLowerCase();
    var state = $("#state").val().toLowerCase();
    var country = $("#country").val().toLowerCase();
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=30d66dc81194d98d47af61ff65c4eae7`;
    e.preventDefault();
    $(this).hide("fast")
    $.getJSON(url).then(function(data) {
        
        var res = [data.main.temp, data.main.temp_max, data.main.temp_min,
        data.main.feels_like, data.main.humidity];

        var selected = $("#list-of-options").find("option:selected").val();

        if (selected == "1") {
            res[0] = "Current Temp: " + parseInt(1.8*(res[0] - 273.15) + 32) + " F";
            res[1] = "HI: " + parseInt(1.8*(res[1] - 273.15) + 32) + " F";
            res[2] = "LOW: " + parseInt(1.8*(res[2] - 273.15) + 32) + " F";
            res[3] = "Feels Like: " + parseInt(1.8*(res[3] - 273.15) + 32) + " F";
            res[4] = "Humidity: " + res[4] + "%"
        }
        else if (selected == "2") {
            res[0] = "Current Temp: " + parseInt(res[0] - 273.15) + " C";
            res[1] = "HI: " + parseInt(res[1] - 273.15) + " C";
            res[2] = "LOW: " + parseInt(res[2] - 273.15) + " C";
            res[3] = "Feels Like: " + parseInt(res[3] - 273.15) + " C";
            res[4] = "Humidity: " + res[4] + "%";
        }
        else {
            res[0] = ("Current Temp: " + res[0] + " K");
            res[1] = "HI: " + res[1] + " K";
            res[2] = "LOW: " + res[2] + " K";
            res[3] = "Feels Like: " + res[3] + " K";
            res[4] = "Humidity: " + res[4] + "%";
        }

        print(`<h1>${city}</h1>` +
        buildList(res))

        $("#output").show("fast")

        $( "#reset" ).click(function() {
            location.reload();
        });
        
    });
});




