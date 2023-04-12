let submitCity = document.getElementById('city-submit-btn')
let input = document.getElementById("city-input")
let historyList = document.getElementsByClassName("dropdown-menu")[0]
let historyItems = JSON.parse(localStorage.getItem("history")) || []

// display history and delete prev list to avoid duplicating
function displayHistory() {
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild)
    }
    historyItems.forEach(city => {
        let historyItem = document.createElement('li')
        historyItem.textContent = city
        historyItem.classList.add('dropdown-item')
        historyItem.setAttribute("onclick", `setInput('${city}')`)
        historyList.appendChild(historyItem)
    })
}

function setInput(city) {
    input.value = city
}



// handles submitions and makes the api call to get data
function handleSubmit(event) {
    event.preventDefault();
    let city = input.value.trim()
    city = city.toLowerCase()
    if (city !== "") {
        if (historyItems.includes(`${city}`) === false) {
            historyItems.push(city)
            localStorage.setItem('history', JSON.stringify(historyItems))
        }
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f75e10cea0f691b69cc9dce7cec926a9&units=imperial`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=f75e10cea0f691b69cc9dce7cec926a9&units=imperial`)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        console.log(data)
                        //today
                        $('#todayDate').text(`${data.list[0].dt_txt}`)
                        $('#todayIcon').text(`${data.list[0].weather[0].icon}`)
                        $('#todayTemp').text(`${data.list[0].main.temp}`)
                        $('#todayWind').text(`${data.list[0].wind.speed}`)
                        $('#todayHumi').text(`${data.list[0].main.humidity}`)
                        //tom
                        $('#tomDate').text(`${data.list[7].dt_txt}`)
                        $('#tomIcon').text(`${data.list[7].weather[0].icon}`)
                        $('#tomTemp').text(`${data.list[7].main.temp}`)
                        $('#tomWind').text(`${data.list[7].wind.speed}`)
                        $('#tomHumi').text(`${data.list[7].main.humidity}`)
                        //three
                        $('#threeDate').text(`${data.list[15].dt_txt}`)
                        $('#threeIcon').text(`${data.list[15].weather[0].icon}`)
                        $('#threeTemp').text(`${data.list[15].main.temp}`)
                        $('#threeWind').text(`${data.list[15].wind.speed}`)
                        $('#threeHumi').text(`${data.list[15].main.humidity}`)
                        //four
                        $('#fourDate').text(`${data.list[23].dt_txt}`)
                        $('#fourIcon').text(`${data.list[23].weather[0].icon}`)
                        $('#fourTemp').text(`${data.list[23].main.temp}`)
                        $('#fourWind').text(`${data.list[23].wind.speed}`)
                        $('#fourHumi').text(`${data.list[23].main.humidity}`)
                        //five
                        $('#fiveDate').text(`${data.list[31].dt_txt}`)
                        $('#fiveIcon').text(`${data.list[31].weather[0].icon}`)
                        $('#fiveTemp').text(`${data.list[31].main.temp}`)
                        $('#fiveWind').text(`${data.list[31].wind.speed}`)
                        $('#fiveHumi').text(`${data.list[31].main.humidity}`)
                        //six
                        $('#sixDate').text(`${data.list[39].dt_txt}`)
                        $('#sixIcon').text(`${data.list[39].weather[0].icon}`)
                        $('#sixTemp').text(`${data.list[39].main.temp}`)
                        $('#sixWind').text(`${data.list[39].wind.speed}`)
                        $('#sixHumi').text(`${data.list[39].main.humidity}`)
                    })
                displayHistory()
            })
        input.value = ""
    }
}



submitCity.addEventListener("click", handleSubmit)
$('.dropdown-toggle').on("click", displayHistory)
