
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
}

function slideNext(){
  compteur ++;
  if(compteur == slides.length){
    compteur = 0;
  }
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;

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

