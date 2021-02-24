/* global L:readonly */
import { activeState } from './page-state.js';
import { ads } from './data.js';
import { homeTypeToReadable } from './common/maps.js';
import { getAdsPhotos } from './generating-ads.js';
import { getAdsFeauters } from './generating-ads.js';

const ROUNDING_COORDINATES = 5;

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

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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

const createCustomPopup = (author, offer) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.adress;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = homeTypeToReadable[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getAdsFeauters(offer, popupElement);
  popupElement.querySelector('.popup__description').textContent = offer.description;
  getAdsPhotos(offer, popupElement);
  return popupElement;
};

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


