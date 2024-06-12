var button = document.querySelector(".btn");
var cardText = document.querySelector(".card-text");
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var reportJokes = [];
// Función para traer datos de la API
function traerJoke() {
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    fetch("https://icanhazdadjoke.com/", options)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        mostrarJoke(data);
        capturarDatosJoke(data);
        console.log(reportJokes);
    })
        .catch(function (error) {
        console.error("Error fetching joke:", error);
    });
}
// Función para crear y mostrar broma (Api) en la cart
function mostrarJoke(data) {
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
        p.textContent = data.joke;
        return;
    }
    else {
        p.textContent = data.joke;
    }
}
traerJoke();
//botón para traer una nueva broma al hacer clic
button === null || button === void 0 ? void 0 : button.addEventListener("click", traerJoke);
//botones para capturar score segun boton clickado
btn1 === null || btn1 === void 0 ? void 0 : btn1.addEventListener("click", function () { capturarScore(1); });
btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", function () { capturarScore(2); });
btn3 === null || btn3 === void 0 ? void 0 : btn3.addEventListener("click", function () { capturarScore(3); });
// funcion para capturar y agregar al array los datos de la broma actual. ScoreActual por defecto es null ya que es opcional que el usuario lo indique
function capturarDatosJoke(data) {
    var jokeActual = data.joke;
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
