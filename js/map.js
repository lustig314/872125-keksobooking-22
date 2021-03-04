/* global L:readonly */
import { activeState } from './page-state.js';
import { createCustomPopup } from './popup.js';

const coordinatesConfig = {
  DEFAULT_COORDINATES: {
    lat: 35.6895,
    lng: 139.69171,
  },
  ROUNDING_COORDINATES: 5,
};

//Инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: coordinatesConfig.DEFAULT_COORDINATES.lat,
    lng: coordinatesConfig.DEFAULT_COORDINATES.lng,
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
    lat: coordinatesConfig.DEFAULT_COORDINATES.lat,
    lng: coordinatesConfig.DEFAULT_COORDINATES.lng,
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
const markerLatitude = mainMarker._latlng.lat;
const markerLongitude = mainMarker._latlng.lng;
const setDefaultAddressInput = () => {
  return addressInput.value = `${markerLatitude.toFixed(coordinatesConfig.ROUNDING_COORDINATES)},
  ${markerLongitude.toFixed(coordinatesConfig.ROUNDING_COORDINATES)}`
}
setDefaultAddressInput();

mainMarker.on('move', (evt) => {
  const latitude = evt.latlng.lat
  const longitude = evt.latlng.lng
  addressInput.value = `${latitude.toFixed(coordinatesConfig.ROUNDING_COORDINATES)}, ${longitude.toFixed(coordinatesConfig.ROUNDING_COORDINATES)}`
});

// Добавление обычных меток с попапами похожих объявлений

const renderAdsOnMap = (ads) => {
  ads.forEach(({location, offer, author}) => {
    const secondaryPinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const secondaryMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: secondaryPinIcon,
      },
    );
    secondaryMarker
      .addTo(map)
      .bindPopup(
        createCustomPopup(author, offer),
      )
  })
}


export { setDefaultAddressInput, mainMarker, renderAdsOnMap, coordinatesConfig  }
