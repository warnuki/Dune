
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

// VIDEO YOUTUBE
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

//Carrousel

// Variable globale
let index = 0;

// Gestion des événements
$('span').click(function () {
  // Récupération index
  let indexN = $('span').index(this);

  // Renouveller l'image
  $('img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);

  // Mettre à jour l'index
index = indexN;
});