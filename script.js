//declare DOM variables
let weatherImg = document.getElementById("image")
let weatherTitle = document.querySelector("#weather")
let temperature = document.querySelector("#temperature")
let timeDate = document.getElementById("timedate")
let tomorrow = document.getElementById("tomorrow")
let today = document.getElementById("today")
let day = document.getElementById("day")
let enterCity = document.getElementById("enterCity")
let currentCity = document.getElementById("currentCity")
let userCityInput = document.getElementById("userCity")
let clickPrev = document.getElementById("prev")
let clickNext = document.getElementById("next")
let begin = document.getElementById("begin")
let container = document.getElementById("container")
let modalContainer = document.getElementById("modalContainer")
let cityInput = document.getElementById("cityInput")

getWeather("auckland")
let city
enterCity.addEventListener("click", function submitCity() {
    city = document.getElementById("userCity").value
    currentCity.innerHTML = city.charAt(0).toUpperCase() + city.substr(1)
    userCityInput.value = ""
    console.log(city)
    getWeather(city)
    setTimeButtons()

})

function start(){
    city = document.getElementById("cityInput").value
    currentCity.innerHTML = city.charAt(0).toUpperCase() + city.substr(1)
    userCityInput.value = ""
    console.log(city)
    getWeather(city)
    today.classList.remove("hide")
    container.classList.remove("hide")
    modalContainer.classList.add("hide")    
}


//fetch weather API
async function getWeather(city) {
    console.log(city)
    let weather 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c156947e2c7f0ccb0e2a20fde1d2c577` 
    try {
        let res = await fetch(url)
        
        .then(response => {
            if(response.status == 200){
               return response.json()
            } else {
                alert("ERROR: city cannot be found, displayed weather will be inaccurate. Please enter another city.")
            }
        })
        .then((res) =>{
        weather = res
        })
    } catch(err){
        console.log(err)
    }
    

    let weatherMain = weather.weather.map( el => el.description)
    let icon = weather.weather.map(el => el.icon)
    let temp = Math.round(weather.main.temp)
    weatherMain = weatherMain[0].replace(/^\w/g, weatherMain[0].charAt(0).toUpperCase())

         weatherTitle.innerHTML = weatherMain
         weatherImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
         temperature.innerHTML = `${temp}°`
         timeStamp = weather.dt
         console.log(weather)
         let timezone = weather.timezone
         let timezoneStamp = timeStamp + timezone
         getTimeDate(timeStamp)
         setTimeButtons()
}



//fetch weather for future times
let getFutureWeather = async(time) => {
    let futureWeather
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=c156947e2c7f0ccb0e2a20fde1d2c577`
    try {
        let res = await fetch(url)
        
        .then((res) => {
            if(res.status == 200){
            return res.json()
        } else {
            alert("ERROR: city cannot be found. Please enter another city.")        
        }})

        .then((res) => {
            futureWeather = res
        })
    } 
    
        catch (e) {
        console.log("error")
    }
        let timeWeather = futureWeather.list[time].weather.map(el => el.description)
        let timeWeatherMain = timeWeather[0].replace(/^\w/g, timeWeather[0].charAt(0).toUpperCase())
        let icon = futureWeather.list[time].weather.map(el => el.icon)
        let temp = Math.round(futureWeather.list[(time)].main.temp)
        weatherTitle.innerHTML = timeWeatherMain
        weatherImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
        temperature.innerHTML = `${temp}°`
        timeStamp = futureWeather.list[time].dt
        console.log(futureWeather.list)
    
    getTimeDate(timeStamp)
}

//get time and day
function getTimeDate(timeStamp){
    let unixTimeStamp = timeStamp
    let timedate = new Date(unixTimeStamp * 1000)
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let hours = timedate.getHours()
    let minutes = timedate.getMinutes()
        if(minutes.toString().length < 2){
            minutes = "0" + minutes
                }
     let meridiem 
    if(hours > 12){
        hours = hours - 12
        meridiem = "PM"
    } else {
        meridiem = "AM"
    }
        timeDate.innerHTML = `Weather at approx:<br> ${hours}:${minutes} ${meridiem} ${days[timedate.getDay()]}`
        console.log(timedate)
        console.log(timedate.toString().substr(0, 4) + timedate.toString().substr(16, 5))      
        console.log(timedate)
    }

    //set time buttons

    async function setTimeButtons(){
        let futureWeather
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=c156947e2c7f0ccb0e2a20fde1d2c577`
    try {
        let res = await fetch(url)
        futureWeather = await res.json()
    } catch (error) {
        console.log("error")
    }
        timeStamp = futureWeather.list[0].dt
        let timedate = new Date(timeStamp * 1000)
        let timedate3 = new Date((timeStamp + 10800) * 1000)
        document.getElementById("next3").innerHTML = timedate3.toString().substr(0, 4) + "<br>" + timedate3.toString().substr(16, 5)
        let timedate6 = new Date((timeStamp + 21600) * 1000)
        document.getElementById("next6").innerHTML = timedate6.toString().substr(0, 4) + "<br>" + timedate6.toString().substr(16, 5)
        let timedate9 = new Date((timeStamp + 32400) * 1000)
        document.getElementById("next9").innerHTML = timedate9.toString().substr(0, 4) + "<br>" + timedate9.toString().substr(16, 5)
        let timedate12 = new Date((timeStamp + 43200) * 1000)
        document.getElementById("next12").innerHTML = timedate12.toString().substr(0, 4) + "<br>" + timedate12.toString().substr(16, 5)
        let timedate15 = new Date((timeStamp + 54000) * 1000)
        document.getElementById("next15").innerHTML = timedate15.toString().substr(0, 4) + "<br>" + timedate15.toString().substr(16, 5)
        let timedate18 = new Date((timeStamp + 64800) * 1000)
        document.getElementById("next18").innerHTML = timedate18.toString().substr(0, 4) + "<br>" + timedate18.toString().substr(16, 5)
        let timedate21 = new Date((timeStamp + 75600)* 1000)
        document.getElementById("next21").innerHTML = timedate21.toString().substr(0, 4) + "<br>" + timedate21.toString().substr(16, 5)
        let timedate24 = new Date((timeStamp + 86400) * 1000)
        document.getElementById("next24").innerHTML = timedate24.toString().substr(0, 4) + "<br>" + timedate24.toString().substr(16, 5)
        let timedate27 = new Date((timeStamp + 97200) * 1000)
        document.getElementById("next27").innerHTML = timedate27.toString().substr(0, 4) + "<br>" + timedate27.toString().substr(16, 5)
        let timedate30 = new Date((timeStamp + 108000) * 1000)
        document.getElementById("next30").innerHTML = timedate30.toString().substr(0, 4) + "<br>" + timedate30.toString().substr(16, 5)
        }




function nextDay(){
    tomorrow.classList.add("show")
    today.classList.add("hide")
    clickPrev.classList.remove("hide")
    clickNext.classList.add("hide")
    day.innerHTML = "Tomorrow"
}

function prevDay(){
    tomorrow.classList.remove("show")
    today.classList.remove("hide")
    clickPrev.classList.add("hide")
    clickNext.classList.remove("hide")
    day.innerHTML = "Today"
}

