var button = document.querySelector("button");
var cardText = document.querySelector(".card-text");
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
        console.log(data);
        crearJoke(data);
    })
        .catch(function (error) {
        console.error("Error fetching joke:", error);
    });
}
// Función para crear y añadir una broma al contenedor
function crearJoke(data) {
    //validacion cardText por si es null o undefined
    if (!cardText) {
        console.error("card text se encuentra.");
        return;
    }
    var p = cardText.querySelector("p");
    // Si el elemento <p> no existe, lo creamos
    if (!p) {
        p = document.createElement("p");
        cardText.appendChild(p);
        p.textContent = data.joke;
    }
    else {
        p.textContent = data.joke;
    }
}
traerJoke();
//añadir un evento al botón para traer una nueva broma al hacer clic
button === null || button === void 0 ? void 0 : button.addEventListener("click", traerJoke);
