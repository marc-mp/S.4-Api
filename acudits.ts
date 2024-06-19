
const button: HTMLButtonElement | null = document.querySelector(".btn")
const cardText: HTMLParagraphElement | null = document.querySelector(".card-text")
const btn1: HTMLButtonElement | null = document.querySelector(".btn1");
const btn2: HTMLButtonElement | null = document.querySelector(".btn2");
const btn3: HTMLButtonElement | null = document.querySelector(".btn3");

interface JokeData {
    joke: string;
    value: string
}

interface chiste {
    joke: string;
    score: number | null;
    date: string;
}

const reportJokes: chiste[] = []

//botón para traer una nuevo chiste al hacer clic (como se alimenta de 2 Apis, llama a la funcion randomApi para que escoja el chiste aleatoriamente de una o otra APi)
button?.addEventListener("click", randomApi);
//botones para capturar score segun boton clickado
btn1?.addEventListener("click", function(){capturarScore(1)});
btn2?.addEventListener("click", function(){capturarScore(2)});
btn3?.addEventListener("click", function(){capturarScore(3)});


// Función para traer datos de la API dadJokes
function getApiDadJoke() : void {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    
    fetch("https://icanhazdadjoke.com/", options)
        .then((res) => res.json())
        .then(data => {
            mostrarApiJoke(data)
            capturarDatosJoke(data)
            console.log(reportJokes)
        }
    ) 
    .catch((error) => {
        console.error("Error fetching joke:", error);
    });
}

// Función para crear y mostrar broma (Api) en la cart
function mostrarApiJoke(data: JokeData): void {
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
        p.textContent = data.joke || data.value;
        return;
        
    }else {
        p.textContent = data.joke || data.value;
    }

}

getApiDadJoke()

// funcion para capturar y agregar al array "reportJokes" los datos de la broma actual. ScoreActual por defecto es null ya que es opcional que el usuario lo indique
function capturarDatosJoke(data: JokeData): void {
    let jokeActual =""
    if (data.joke){
        jokeActual = data.joke 
    }else if(data.value){
        jokeActual = data.value
    }
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

// Función para traer datos de la API joke ChuckNorris
function getApiChuckNorris() : void {
    
    fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then(data => {
            mostrarApiJoke(data)
            capturarDatosJoke(data)
            console.log(reportJokes)
        }
    ) 
    
    .catch((error) => {
        console.error("Error fetching chuckNorrisjoke:", error);
    });
}

// funcion para escojer la API del siguiente chiste a mostrar
function randomApi(){
    let numRandom = Math.floor(Math.random() * 100);
    if(numRandom % 2 == 0){
        getApiDadJoke()
    }else{
        getApiChuckNorris()
    }
}


//API TIEMPO
interface WeatherData {
    name: string;
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      main: string
      icon: any
    }[];
  }


// Función para traer datos de la API openWeather
function getApiTiempo(): void {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=f81f5b7cafe98a091b11b0ef311fed77")
    .then((res) => res.json())
    .then(data => {
        mostrarTiempo(data)
    }) 

    .catch((error) => {
        console.error("Error fetching openWeather", error);
    });
}

getApiTiempo()

// Función para mostrar datos de la API openWeather
function mostrarTiempo(dataTiempo: WeatherData): void {
    let tempContainer = document.querySelector("#temp-container")
    let temp = document.createElement("h5")
    //la tempertura de la APi es en grados Kelvin y la pasamos a Celsius
    let tempKelvin = dataTiempo.main.temp
    let tempCelsius = tempKelvin - 273.15
    temp.textContent = tempCelsius.toFixed(0) + "ºC" 
    tempContainer?.append(temp)

    let iconContainer = document.querySelector("#weatherIcon-container")
    let weatherDetails = dataTiempo.weather[0]
    let iconCode = weatherDetails.icon
    const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`
    let imageIcon = document.createElement("img")
    imageIcon.src = urlIcon
    iconContainer?.append(imageIcon)
}






