let etatLecteur;

function lecteurPret(event) {
  // event.target = lecteur
  event.target.setVolume(50);
}

function changementLecteur(event) {
  // event.data = état du lecteur
  etatLecteur = event.data;
}

let lecteur;

function onYouTubeIframeAPIReady() {
  lecteur = new YT.Player("video", {
    height: "390",
    width: "640",
    videoId: "M7lc1UVf-VE",
    playerVars: {
      color: "white",
      enablejsapi: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: lecteurPret,
      onStateChange: changementLecteur
    }
  });
}

// Hauteur de la vidéo
const hauteurVideo = $("#video").height();
// Position Y de la vidéo
const posYVideo = $("#video").offset().top;
// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;

// Gestion du défilement
$(window).scroll(function () {
  // Récupération de la valeur du défilement vertical
  const scroll = $(window).scrollTop();

  // Classe permettant l'exécution du CSS
  $("#video").toggleClass(
    "scroll",
    etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
  );
});





      
let carte = L.map('carte', {
  center: [47.2608333, 2.4188888888888886], // Centre de la France
  zoom: 10,
  minZoom: 4,
  maxZoom: 19,
});

// L.geoJSON(cine).addTo(map);

// let myIcon = layer.setIcon({
//   iconUrl: 'my-icon.png',
//   iconSize: [38, 95],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   shadowUrl: 'my-icon-shadow.png',
//   shadowSize: [68, 95],
//   shadowAnchor: [22, 94]
// });


carte.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(carte)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(carte);
}

carte.on('locationfound', onLocationFound);

// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);

// Ajout de l'échelle
L.control.scale().addTo(carte);

// Variable diapo

let compteur = 0;
let timer, elements, slides, slideWidth, text;

window.onload = () => {
  const diapo = document.querySelector(".diapo");
  elements = document.querySelector(".elements");
  slides = Array.from(elements.children);
  slideWidth = diapo.getBoundingClientRect().width;

  let next = document.querySelector("#nav-droite");
  let prev = document.querySelector("#nav-gauche");

  timer = setInterval(slideNext, 4000);

  next.addEventListener("click", slideNext,nomA);
  prev.addEventListener("click", slidePrev,nomA);

  next.addEventListener("mouseover", stopTimer);
  prev.addEventListener("mouseover", stopTimer);
  next.addEventListener("mouseout", startTimer);
  prev.addEventListener("mouseout", startTimer);

  window.addEventListener("resize", () => {
    slideWidth = diapo.getBoundingClientRect().width;
    slideNext();
  })




  const diapoVideo = document.querySelector(".diapoVideo");
  elementsVideo = document.querySelector(".elementsVideo");
  slidesVideo = Array.from(elementsVideo.children);

  let nextVideo = document.querySelector("#nav1");
  let prevVideo = document.querySelector("#nav2");

  timerVideo = setInterval(slideNextVideo, 4000);

  nextVideo.addEventListener("click", slideNextVideo);
  prevVideo.addEventListener("click", slidePrevVideo);

  nextVideo.addEventListener("mouseover", stopTimerVideo);
  prevVideo.addEventListener("mouseover", stopTimerVideo);
  nextVideo.addEventListener("mouseout", startTimerVideo);
  prevVideo.addEventListener("mouseout", startTimerVideo);

  window.addEventListener("resize", () => {
    slideNextVideo();
  }) 
}

function slideNext(){
  compteur ++;
  if(compteur == slides.length){
    compteur = 0;
  }
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
  console.log("test2");
  nomA();
}

function slidePrev(){
  compteur --;
  if(compteur < 0){
    compteur = slides.length -1;
  }
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
  nomA();
  console.log("test")
}

function stopTimer(){
  clearInterval(timer);
}

function startTimer(){
  timer = setInterval(slideNext, 4000);
}

function nomA(){
  switch (compteur){
    case 0:
      text = "Timothée Chalamet: Paul Atreïdes";
      break;
    case 1:
      text = "Rebecca Ferguson: Lady Jessica";
      break;
    case 2:
      text = "Oscar Isaac: Duke Leto Atreïdes";
      break;
    case 3:
      text = "Jason Momoa: Duncan Idaho";
      break;
    case 4:
      text = "Josh Brolin: Gurney Halleck";
      break;
    case 5:
      text = "Chang Chen: Dr. Wellington Yueh";
      break;
    case 6:
      text = "Zendaya: Chani";
      break;
    case 7:
      text = "Javier Bardem: Stilgar";
      break;
    case 8:
      text = "Sharon Duncan-Brewster: Liet Kynes";
      break;
    case 9:
      text = "Stellan Skarsgard: Baron Harkonnen";
      break;
    case 10:
      text = "Dave Bautista: Rabban Harkonnen";
      break;
  }
  document.getElementById("caption").innerHTML = text;
}

//Diapo video 
let compteurVideo = 0;
let timerVideo, elementsVideo, slidesVideo;

function slideNextVideo(){
  compteurVideo ++;
  if(compteurVideo == slidesVideo.length){
    compteurVideo = 0;
  }
  elementsVideo.style.opacity =  "0";
}

function slidePrevVideo(){
  compteurVideo --;
  if(compteurVideo < 0){
    compteurVideo = slidesVideo.length -1;
  }
  elementsVideo.style.opacity = "1";
}

function stopTimerVideo(){
  clearInterval(timerVideo);
}

function startTimerVideo(){
  timerVideo = setInterval(slideNextVideo, 4000);
} 

timerVideo = setInterval(function() {
  for (var i = 0; i < slidesVideo.length; i++) {
    slidesVideo[i].style.opacity = "0";
  }
  compteurVideo = (compteurVideo!= slidesVideo.length - 1) ? compteurVideo + 1 : 0;
  slidesVideo[compteurVideo].style.opacity = 1;
}, 3000);