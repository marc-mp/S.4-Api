var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
// funcion para escojer la API del siguiente chiste a mostrar
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
    return __awaiter(this, void 0, void 0, function () {
        var response, dataTiempo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=f81f5b7cafe98a091b11b0ef311fed77")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    dataTiempo = _a.sent();
                    console.log(dataTiempo);
                    mostrarTiempo(dataTiempo);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getApiTiempo();
// Función para mostrar datos de la API openWeather
function mostrarTiempo(dataTiempo) {
    var tempContainer = document.querySelector("#temp-container");
    var temp = document.createElement("h5");
    var tempKelvin = dataTiempo.main.temp;
    console.log(tempKelvin);
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
    // let city = document.createElement("h2")
    // city.textContent = dataTiempo.name
    // resultsContainer?.append(city)
    // let description = document.createElement("p")
    // description.textContent = weatherDetails.description
    // resultsContainer?.append(description)
    // const wind = document.createElement("p")
    // wind.textContent = "wind:" +" "+ dataTiempo.wind.speed + "m/s" 
    // resultsContainer?.append(wind)
}
