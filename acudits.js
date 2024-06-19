var button = document.querySelector(".btn");
var cardText = document.querySelector(".card-text");
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var reportJokes = [];
//botón para traer una nuevo chiste al hacer clic (como se alimenta de 2 Apis, llama a la funcion randomApi para que escoja el chiste aleatoriamente de una o otra APi)
button === null || button === void 0 ? void 0 : button.addEventListener("click", randomApi);
//botones para capturar score segun boton clickado
btn1 === null || btn1 === void 0 ? void 0 : btn1.addEventListener("click", function () { capturarScore(1); });
btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", function () { capturarScore(2); });
btn3 === null || btn3 === void 0 ? void 0 : btn3.addEventListener("click", function () { capturarScore(3); });
// Función para traer datos de la API dadJokes
function getApiDadJoke() {
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    fetch("https://icanhazdadjoke.com/", options)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        mostrarApiJoke(data);
        capturarDatosJoke(data);
        console.log(reportJokes);
    })
        .catch(function (error) {
        console.error("Error fetching joke:", error);
    });
}
// Función para crear y mostrar broma (Api) en la cart
function mostrarApiJoke(data) {
    //validacion cardText por si no existe
    if (!cardText) {
        console.error("card text no se encuentra.");
        return;
    }
    var p = cardText.querySelector("p");
    // Si el elemento <p> no existe, lo creamos y si existe que es el caso, mostramos la broma en este
    if (!p) {
        p = document.createElement("p");
        cardText.appendChild(p);
        p.textContent = data.joke || data.value;
        return;
    }
    else {
        p.textContent = data.joke || data.value;
    }
}
getApiDadJoke();
// funcion para capturar y agregar al array "reportJokes" los datos de la broma actual. ScoreActual por defecto es null ya que es opcional que el usuario lo indique
function capturarDatosJoke(data) {
    var jokeActual = "";
    if (data.joke) {
        jokeActual = data.joke;
    }
    else if (data.value) {
        jokeActual = data.value;
    }
    var isoDateActual = new Date().toISOString();
    var scoreActual = null;
    var nuevoChiste = { joke: jokeActual, score: scoreActual, date: isoDateActual };
    reportJokes.push(nuevoChiste);
}
// funcion que actualiza la propiedad score de la broma actual si el usuario valora la broma clicando emoticonos
function capturarScore(num) {
    var scoreActual = num;
    console.log(num);
    reportJokes[reportJokes.length - 1].score = scoreActual;
}
// Función para traer datos de la API joke ChuckNorris
function getApiChuckNorris() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        mostrarApiJoke(data);
        capturarDatosJoke(data);
        console.log(reportJokes);
    })
        .catch(function (error) {
        console.error("Error fetching chuckNorrisjoke:", error);
    });
}
// funcion para escojer la API del siguiente chiste a mostrar ( numeros aleatorios : pares = dadJOkes impares= ChuckNorris)
function randomApi() {
    var numRandom = Math.floor(Math.random() * 100);
    if (numRandom % 2 == 0) {
        getApiDadJoke();
    }
    else {
        getApiChuckNorris();
    }
}
// Función para traer datos de la API openWeather
function getApiTiempo() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=f81f5b7cafe98a091b11b0ef311fed77")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        mostrarTiempo(data);
    })
        .catch(function (error) {
        console.error("Error fetching openWeather", error);
    });
}
getApiTiempo();
// Función para mostrar datos de la API openWeather
function mostrarTiempo(dataTiempo) {
    var tempContainer = document.querySelector("#temp-container");
    var temp = document.createElement("h5");
    //la tempertura de la APi es en grados Kelvin y la pasamos a Celsius
    var tempKelvin = dataTiempo.main.temp;
    var tempCelsius = tempKelvin - 273.15;
    temp.textContent = tempCelsius.toFixed(0) + "ºC";
    tempContainer === null || tempContainer === void 0 ? void 0 : tempContainer.append(temp);
    var iconContainer = document.querySelector("#weatherIcon-container");
    var weatherDetails = dataTiempo.weather[0];
    var iconCode = weatherDetails.icon;
    var urlIcon = "https://openweathermap.org/img/wn/".concat(iconCode, ".png");
    var imageIcon = document.createElement("img");
    imageIcon.src = urlIcon;
    iconContainer === null || iconContainer === void 0 ? void 0 : iconContainer.append(imageIcon);
}
