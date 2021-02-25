/* global L:readonly */
import { activeState } from './page-state.js';
import { ads } from './data.js';
import { createCustomPopup } from './generating-popups.js'

const ROUNDING_COORDINATES = 5;

//Инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Кастомная иконка главной метки
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Добавление главной метки
const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

// Передача координат от главной метки в поле формы
const addressInput = document.querySelector('#address');
addressInput.setAttribute('readonly', 'readonly');
const defaultLatitude = mainMarker._latlng.lat;
const defaultLongitude = mainMarker._latlng.lng;
addressInput.value = `${defaultLatitude.toFixed(ROUNDING_COORDINATES)}, ${defaultLongitude.toFixed(ROUNDING_COORDINATES)}`

mainMarker.on('move', (evt) => {
  const latitude = evt.latlng.lat
  const longitude = evt.latlng.lng
  addressInput.value = `${latitude.toFixed(ROUNDING_COORDINATES)}, ${longitude.toFixed(ROUNDING_COORDINATES)}`
});

// Добавление обычных меток с попапами похожих объявлений
ads.forEach(({location, offer, author}) => {
  const secondaryPinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const secondaryMarker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: secondaryPinIcon,
    },
  )
  secondaryMarker
    .addTo(map)
    .bindPopup(
      createCustomPopup(author, offer),
    )
})


