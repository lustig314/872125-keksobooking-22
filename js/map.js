/* global L:readonly */
import { activeState } from './page-state.js';
import { createCustomPopup } from './popup.js';
import { getData } from './api.js'
import { showAlert } from './user-form.js';


const DEFAULT_COORDINATES = {
  lat: 35.6895,
  lng: 139.69171,
};

const ROUNDING_COORDINATES = 5;
const SIMILAR_ADS_COUNT = 10;
const localAds = [];


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


const typeHousesFilterInput = document.querySelector('#housing-type');
const pricesFilterInput = document.querySelector('#housing-price');
const roomsFilterInput = document.querySelector('#housing-rooms');
const guestsFilterInput = document.querySelector('#housing-guests');


const priceFilterValues = {
  LOW: 10000,
  HIGH: 50000,
};


const validationTypeToFunction = {
  checkType: function (ad) {
    const valueType = typeHousesFilterInput.value;
    return (ad.offer.type === valueType || valueType === 'any')
  },

  checkPrice: function (ad) {
    const valuePrices = pricesFilterInput.value;
    switch (valuePrices) {
      case 'any':
        return true;
      case 'low': {
        return ad.offer.price <= priceFilterValues.LOW
      }
      case 'middle': {
        return ad.offer.price > priceFilterValues.LOW && ad.offer.price < priceFilterValues.HIGH;
      }
      case 'high': {
        return ad.offer.price >= priceFilterValues.HIGH;
      }
      default:
        return false;
    }
  },

  checkRoomsNumber: function (ad) {
    const valueRooms = roomsFilterInput.value;
    return (ad.offer.rooms === Number(valueRooms) || valueRooms === 'any');
  },
  checkGuestsNumber: function (ad) {
    const valueGuests = guestsFilterInput.value;
    return (ad.offer.rooms === Number(valueGuests) || valueGuests === 'any');
  },

}

const getFilteredAds = (ads) => {
  const filteredAds = ads.filter((adData) => {
    const isSuitable = Object.keys(validationTypeToFunction).every((key) => {
      const currentValidation = validationTypeToFunction[key];

      return currentValidation(adData);
    });

    return isSuitable;
  });

  return filteredAds;
};


const updatePins = () => {
  markers.clearLayers();
  const filteredOffers = getFilteredAds(localAds);
  renderAdsOnMap(filteredOffers);
};

const onChangeForm = () => {
  updatePins();
};

const filterHouses = document.querySelector('.map__filters')

filterHouses.addEventListener('change', onChangeForm);



// Инициализация карты
const initMap = () => {
  getData()
    .then((ads) => {
      localAds.push(...ads);
      renderAdsOnMap(localAds);
      filterHouses.addEventListener('change', onChangeForm);

    })
    .catch(() => {
      showAlert('Данные о похожих объявлениях не были получены')
    })
}





export { setDefaultAddressInput, mainMarker, renderAdsOnMap, DEFAULT_COORDINATES, initMap, localAds };
