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
        historyList.appendChild(historyItem)
    })
}
// handles submitions and makes the api call to get data
function handleSubmit(event) {
    let city = input.value.trim()
    event.preventDefault()
    if (city !== "") {
        historyItems.push(city)
        localStorage.setItem('history', JSON.stringify(historyItems))
        city = city.toLowerCase()
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f75e10cea0f691b69cc9dce7cec926a9`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=f75e10cea0f691b69cc9dce7cec926a9`)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        console.log(data)
                    })
                displayHistory()
            })
        input.value = ""
    }
}



submitCity.addEventListener("click", handleSubmit)
