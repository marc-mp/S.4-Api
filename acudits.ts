
const button: HTMLButtonElement | null = document.querySelector(".btn")
const cardText: HTMLParagraphElement | null = document.querySelector(".card-text")
const btn1: HTMLButtonElement | null = document.querySelector(".btn1");
const btn2: HTMLButtonElement | null = document.querySelector(".btn2");
const btn3: HTMLButtonElement | null = document.querySelector(".btn3");


interface JokeData {
    joke: string;
}

interface chiste {
    joke: string;
    score: number | null;
    date: string;
}

const reportJokes: chiste[] = []


// Función para traer datos de la API
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
            mostrarJoke(data)
            capturarDatosJoke(data)
            console.log(reportJokes)
            

        }
    ) 
    .catch((error) => {
        console.error("Error fetching joke:", error);
    });
}


// Función para crear y mostrar broma (Api) en la cart
function mostrarJoke(data: JokeData): void {
    //validacion cardText por si no existe
    if (!cardText) {
        console.error("card text no se encuentra.");
        return;
    }

    let p: HTMLParagraphElement | null = cardText.querySelector("p");

    // Si el elemento <p> no existe, lo creamos y si existe que es el caso, mostramos la broma en este
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

//botones para capturar score segun boton clickado
btn1?.addEventListener("click", function(){capturarScore(1)});
btn2?.addEventListener("click", function(){capturarScore(2)});
btn3?.addEventListener("click", function(){capturarScore(3)});

// funcion para capturar y agregar al array los datos de la broma actual. ScoreActual por defecto es null ya que es opcional que el usuario lo indique
function capturarDatosJoke(data: JokeData): void {
    let jokeActual = data.joke
    let isoDateActual = new Date().toISOString();
    let scoreActual = null

    let nuevoChiste: chiste = { joke: jokeActual, score: scoreActual, date: isoDateActual };
    reportJokes.push(nuevoChiste)

}

// funcion que actualiza la propiedad score de la broma actual si el usuario valora la broma clicando emoticonos
function capturarScore(num: number): void {
    let scoreActual = num
    console.log(num)
    reportJokes[reportJokes.length-1].score = scoreActual

} 

