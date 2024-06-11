
const button = document.querySelector("button")
const cardText = document.querySelector(".card-text")


// Definimos la interfaz para el tipo de datos de la broma
interface JokeData {
    joke: string;
}

// Función para traer una broma de la API
function traerJoke() : void {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    
    fetch("https://icanhazdadjoke.com/", options)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            crearJoke(data)
        }
    ) 
    .catch((error) => {
        console.error("Error fetching joke:", error);
    });
}


// Función para crear y añadir una broma al contenedor
function crearJoke(data: JokeData): void {
    //validacion cardText por si es null o undefined
    if (!cardText) {
        console.error("card text se encuentra.");
        return;
    }

    let p: HTMLParagraphElement | null = cardText.querySelector("p");

    // Si el elemento <p> no existe, lo creamos
    if (!p) {
        p = document.createElement("p");
        cardText.appendChild(p);
        p.textContent = data.joke;

    }else {
        p.textContent = data.joke;
    }

}

traerJoke()

//añadir un evento al botón para traer una nueva broma al hacer clic
button?.addEventListener("click", traerJoke);


