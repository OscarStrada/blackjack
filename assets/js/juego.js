let deck = [];
let puntosJugador = 0;
let puntosComputadora = 0;
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// Referencias al HTML
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const puntajeJugador = document.querySelector("#puntos-jugador");
const puntajeComputadora = document.querySelector("#puntos-computadora");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let especial of especiales) {
    for (let tipo of tipos) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  //   console.log(deck);
  return deck;
};

crearDeck();

const pedirCarta = (arr) => {
  if (arr.length === 0) throw "No hay cartas en el deck";

  const carta = arr.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return valor === "A" ? 11 : valor <= 10 ? valor * 1 : 10;
};

// Turno computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta(deck);
    puntosComputadora += valorCarta(carta);
    puntajeComputadora.innerText = puntosComputadora;

    // crear carta en el DOM
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) break;
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    puntosComputadora === puntosMinimos
      ? alert("Empate")
      : puntosMinimos > 21
      ? alert("Perdiste =(")
      : puntosComputadora > 21
      ? alert("Felicidades, ganaste")
      : alert("Computadora gana");
  }, 300);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta(deck);
  puntosJugador += valorCarta(carta);
  puntajeJugador.innerText = puntosJugador;

  // crear carta en el DOM
  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, ¡Genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  deck = [];
  crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;

  puntajeJugador.innerText = 0;
  puntajeComputadora.innerText = 0;
  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
