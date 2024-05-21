const songs = [
  {
    src: "./assets/dona-da-porsche.mp3",
    name: "Dono da Porsche - MC Reino",
    fundo: "./assets/fundo-da-musica-dono-da-porsche.png",
    autor: "MC Reino",
    titulo: "Dono da Porsche",
    corDeFundo: "linear-gradient(to bottom, #0f0d13,#db0000)"
  },
  {
    src: "./assets/toda-suada.mp3",
    name: "Toda Suada - MC Reino",
    fundo: "./assets/fundo-da-musica-toda-suada.png",
    autor: "MC Reino",
    titulo: "Toda Suada",
    corDeFundo: "linear-gradient(to bottom, #ADFF2F,#FF0000)"
  },
  {
    src: "./assets/bm-do-reino.mp3",
    name: "BMW do Reino - MC Reino",
    fundo: "./assets/fundo-da-musica-bm-do-reino.png",
    autor: "MC Reino",
    titulo: "BMW do Reino",
    corDeFundo: "linear-gradient(to bottom, #FF0000,#4F4F4F)"
  },
];

const music = new Audio();
const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");

let interval;
let currentSongIndex = 0;

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

music.addEventListener('loadedmetadata', function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});

function play() {
  buttonPlay.classList.add('hide');
  buttonPause.classList.remove('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.remove('hide');
  buttonPause.classList.add('hide');
  music.pause();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length; 
  loadSong(currentSongIndex); 
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; 
  loadSong(currentSongIndex); 
}

function loadSong(index) {
  const song = songs[index];
  music.src = song.src;
  music.load();
  play();

const fundoMusica = document.getElementById("fundo");
fundoMusica.src = song.fundo;

const tituloMusica = document.querySelector('.desc-musica p');
const autorMusica = document.querySelector('.desc-musica span');
autorMusica.textContent = song.autor;
tituloMusica.textContent = song.titulo;

const cardPlayer = document.querySelector('.card-player');
cardPlayer.style.background = song.corDeFundo;

 fundoMusica.style.maxWidth = "100%";
}

buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
document.getElementById('nextButton').addEventListener('click', nextSong);
document.getElementById('prevButton').addEventListener('click', prevSong);

loadSong(currentSongIndex);

