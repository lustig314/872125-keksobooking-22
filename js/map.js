/* global L:readonly */
import { activeState } from './page-state.js';
import { createCustomPopup } from './popup.js';
import { getData } from './api.js'
import { showAlert } from './user-form.js';
import { getFilteredAds } from './map-filter.js';

const DEFAULT_COORDINATES = {
  lat: 35.6895,
  lng: 139.69171,
};

const ROUNDING_COORDINATES = 5;
const SIMILAR_ADS_COUNT = 10;
const localAds = []


//Инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
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
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
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
  return addressInput.value = `${markerLatitude.toFixed(ROUNDING_COORDINATES)}, ${markerLongitude.toFixed(ROUNDING_COORDINATES)}`
};
setDefaultAddressInput();

mainMarker.on('move', (evt) => {
  const latitude = evt.latlng.lat
  const longitude = evt.latlng.lng
  addressInput.value = `${latitude.toFixed(ROUNDING_COORDINATES)}, ${longitude.toFixed(ROUNDING_COORDINATES)}`
});

// Добавление обычных меток с попапами похожих объявлений
const markers = L.layerGroup().addTo(map);

const renderAdsOnMap = (ads) => {
  ads
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach(({location, offer, author}) => {
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
        .addTo(markers)
        .bindPopup(
          createCustomPopup(author, offer),
        )
    })
};

const initMap = () => {
  getData()
    .then((ads) => {
      localAds.push(...ads);
      const filteredAds = getFilteredAds(localAds)
      renderAdsOnMap(filteredAds)
    })
    .catch(() => {
      showAlert('Данные о похожих объявлениях не были получены')
    })
}

const typeHousesFilterInput = document.querySelector('#housing-type');

typeHousesFilterInput.addEventListener('change', ({target}) => {
  const filteredAds = getFilteredAds(localAds, target.value);

  if (target.value === 'any') {
    renderAdsOnMap(localAds)
  } else {
    markers.clearLayers();
    renderAdsOnMap(filteredAds);
  }

})

export { setDefaultAddressInput, mainMarker, renderAdsOnMap, DEFAULT_COORDINATES, initMap };
