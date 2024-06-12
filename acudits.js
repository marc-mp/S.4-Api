var button = document.querySelector("button");
var cardText = document.querySelector(".card-text");
var reportJokes = [];
// Función para traer una broma de la API
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
        mostrarJoke(data);
        capturarJoke(data);
        capturarIsoDate();
    })
        .catch(function (error) {
        console.error("Error fetching joke:", error);
    });
}
// Función para crear y añadir una broma al contenedor
function mostrarJoke(data) {
    //validacion cardText por si es null o undefined
    if (!cardText) {
        console.error("card text no se encuentra.");
        return;
    }
    var p = cardText.querySelector("p");
    // Si el elemento <p> no existe, lo creamos 
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
// botones para function asignar score
// document.getElementById("btn").addEventListener("click", traerJoke): 
// document.getElementById("btn1").addEventListener("click", capturarDatos)
// document.getElementById("btn2").addEventListener("click", capturarDatos)
// document.getElementById("btn3").addEventListener("click", capturarDatos)
function capturarJoke(data) {
    reportJokes.push(data.joke);
    console.log(reportJokes);
}
function capturarIsoDate() {
    var isoDate = new Date().toISOString();
    console.log(isoDate);
    reportJokes.push(isoDate);
    console.log(reportJokes);
}
