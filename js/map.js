/* global L:readonly */
import { setActiveState } from './page-state.js';
import { createCustomPopup } from './popup.js';
import { makeRequest } from './api.js'
import { showAlert } from './user-form.js';
import { getFilteredAds, mapFilters } from './map-filter.js'
import { debounce } from './util.js';
import { UrlAddress, HttpMethod } from './common/enums.js';

const DEFAULT_COORDINATES = {
  lat: 35.6895,
  lng: 139.69171,
};

const MAP_SRC = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ROUNDING_COORDINATES = 5;
const SIMILAR_ADS_COUNT = 10;
const DEBOUNCED_TIME = 500;

const localAds = [];


//Инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 12);

L.tileLayer(
  MAP_SRC,
  {
    attribution: MAP_COPYRIGHT,
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

const markers = L.layerGroup().addTo(map);

// Рендер меток на карту
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


const updatePins = () => {
  markers.clearLayers();
  const filteredOffers = getFilteredAds(localAds);
  renderAdsOnMap(filteredOffers);
};

const onChangeForm = () => {
  updatePins()
};

// Инициализация карты
const initMap = () => {
  makeRequest({
    url: UrlAddress.GET_URL,
    method: HttpMethod.GET,
    onSuccess: (ads) => {
      localAds.push(...ads);
      renderAdsOnMap(localAds);
      mapFilters.addEventListener('change', debounce(onChangeForm, DEBOUNCED_TIME));
    },
    onFail: () => {
      showAlert('Данные о похожих объявлениях не были получены')
    },
  })
}

export { setDefaultAddressInput, mainMarker, renderAdsOnMap, DEFAULT_COORDINATES, initMap, updatePins, SIMILAR_ADS_COUNT };
