let weather = {
    "apiKey": "cd15f1258b94312f5095e52787e99ef8",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed.toFixed(1) + " km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

function getImage() {
    fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((data) => {
            let content = data.splice(0, 6);
            let cards = document.querySelector('.photo-cards');

            let key;
            for (key in content) {
                cards.innerHTML += `
        <div class="photo-card">
            <h2>${content[key].title}</h2>
            <img src="${content[key].url}" alt="img" width="150">
        </div>
        `
            }
        });
}

getImage();

function goodDay() {
    fetch("", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
}

goodDay();