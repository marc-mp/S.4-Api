
const button: HTMLButtonElement | null = document.querySelector("button")
const cardText: HTMLParagraphElement | null = document.querySelector(".card-text")

const reportJokes: Object[] = []

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
            mostrarJoke(data)
            capturarJoke(data)
            capturarIsoDate()

        }
    ) 
    .catch((error) => {
        console.error("Error fetching joke:", error);
    });
}


// Función para crear y añadir una broma al contenedor
function mostrarJoke(data: JokeData): void {
    //validacion cardText por si es null o undefined
    if (!cardText) {
        console.error("card text no se encuentra.");
        return;
    }

    let p: HTMLParagraphElement | null = cardText.querySelector("p");

    // Si el elemento <p> no existe, lo creamos 
    if (!p) {
        p = document.createElement("p");
        cardText.appendChild(p);
        p.textContent = data.joke;
        return;

    
    }else {
        p.textContent = data.joke;
    }

}

traerJoke()

//botón para traer una nueva broma al hacer clic
button?.addEventListener("click", traerJoke);

// botones para function asignar score
// document.getElementById("btn").addEventListener("click", traerJoke): 
// document.getElementById("btn1").addEventListener("click", capturarDatos)
// document.getElementById("btn2").addEventListener("click", capturarDatos)
// document.getElementById("btn3").addEventListener("click", capturarDatos)



function capturarJoke(data: JokeData): void {
    reportJokes.push(data.joke)
    console.log(reportJokes)
}

function capturarIsoDate(){
    const isoDate = new Date().toISOString();
    console.log(isoDate)
    reportJokes.push(isoDate)
    console.log(reportJokes)
}

