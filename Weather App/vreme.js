let city = [];

async function actualWeather(){
    let inputValue = document.querySelector("#inputText").value;
    let urlWeather = "http://api.openweathermap.org/data/2.5/weather?q="+inputValue+"&appid=21df164d252d4a6fe5b33d7134af1249";
    let response = await fetch(urlWeather);
    city = await response.json()
    drawWeather()
    document.querySelector("#text1").innerHTML = "Current Weather in " + inputValue;
}

function drawWeather(){
    let icon = "http://openweathermap.org/img/w/"+city.weather[0]["icon"]+".png";
    let str = `
                <div><img src="${icon}"></span></p>
                <div>Description: <span>${city.weather[0]['description']}</span></div>
                <div>Humidity:  <span>${city.main.humidity}</span></div>
                <div>Pressure:  <span>${city.main.pressure}</span></div>
                <div>Current temperature:  <span>${(city.main.temp - 273.15).toString().slice(0,4)+" &#8451;"}</span></div>
                <div>Minimum of the day:  <span>${(city.main.temp_min - 273.15).toString().slice(0,4)+" &#8451;"}</span></div>
                <div>Maximum of the day:  <span>${(city.main.temp_max - 273.15).toString().slice(0,4)+" &#8451;"}</span></div>
                `
    document.querySelector(".details .information").innerHTML = str;
    googleMap();
    
}

function googleMap(){
    let inputValue = document.querySelector("#inputText").value;
    let google = `
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="790" height="200" id="gmap_canvas" 
                src="https://maps.google.com/maps?q=${inputValue}&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
            <a href="https://putlocker-is.org"></a><br>
            <style>.mapouter{position:relative;text-align:right;height:200px;width:790px;}</style>
            <a href="https://google-map-generator.com">google map iframe code</a>
            <style>.gmap_canvas {overflow:hidden;background:none!important;height:200px;width:790px;}</style>
        </div>
    </div>`;
    document.querySelector("#map").innerHTML = google;
}

let forecastData = [];

async function forecast(){
    //sterg informatiile in cazul in care se cauta alt oras sau daca userul da click de doua ori pe buton
    let allDivs = document.querySelectorAll(".dayBox")
    for(let k = 0; k < allDivs.length; k++){
        allDivs[k].innerHTML = "";
    }
    let inputValue = document.querySelector("#inputText").value;
    let response = await fetch("https://api.openweathermap.org/data/2.5/forecast?appid=21df164d252d4a6fe5b33d7134af1249&units=metric&q="+inputValue)
    forecastData = await response.json()

    drawForecast()
    document.querySelector("#text2").innerHTML = "Weather for the following days in " + inputValue;
}

function drawForecast(){
    let list = forecastData.list;
    //NodeList cu toate div-urile pentru fiecare zi diferita
    let allDivs = document.querySelectorAll(".dayBox")
    let indexDiv = 0;
    //data salvata cu care se va compara ziua urmatoare din array
    let dataCurenta = list[0].dt_txt.substr(0,10);
   
    allDivs[indexDiv].innerHTML = `<div class="data">Data : <span>${dataCurenta}</span></div>`

    for(let i = 0; i < list.length; i++){
        let icon = "http://openweathermap.org/img/w/"+list[i]['weather'][0]['icon']+".png";
        let dataLista = list[i].dt_txt.substr(0,10);
     
        if(dataLista === dataCurenta){
            allDivs[indexDiv].innerHTML +=`
                <div><img src="${icon}"></span></div>
                <div>Hour: <span>${list[i].dt_txt.substr(11,5)}</span></div>
                <div>Temperature: <span>${list[i].main.temp +" &#8451;"}</span></div>
                <div class="description">Description: <span>${list[i].weather[0].description}</span></div>`
        }else{
            //daca data este diferita decat cea curenta atunci ne mutam pe urmatorul div
            indexDiv += 1;
            dataCurenta = dataLista;
            allDivs[indexDiv].innerHTML = `<div class="data">Data : <span>${dataCurenta}</span></div>`
            //scad din index, pentru ca vremea de pe pozita [i] nu a fost afisat in html si imi doresc sa fie parcursa din nou si introdusa in noul div
            i--; 
        }
    }
}
