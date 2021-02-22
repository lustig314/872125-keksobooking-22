import { ads } from './data.js';
import { getRandomArrayElement } from './util.js';

const HomeType = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
};

const homeTypeToReadable = {
  [HomeType.FLAT]: 'Квартира',
  [HomeType.BUNGALOW]: 'Бунгало',
  [HomeType.HOUSE]: 'Дом',
  [HomeType.PALACE]: 'Дворец',
};

const getAdsFeauters = (offer, cardElement) => {
  const {feauters} = offer;
  const feautureList = cardElement.querySelector('.popup__features');
  const feautureEl = cardElement.querySelector('.popup__feature');
  const feautureEls = cardElement.querySelectorAll('.popup__feature');

  feautureEls.forEach((value) => {
    feautureList.removeChild(value);
  })

  feauters.forEach((feauture) => {
    const cloneFeautureEl = feautureEl.cloneNode(true);
    cloneFeautureEl.classList.add(`popup__feature--${feauture}`);
    feautureList.appendChild(cloneFeautureEl);
  });
};

const getAdsPhotos = (offer, cardElement) => {
  const photos = offer.photos;
  const photosList = cardElement.querySelector('.popup__photos');
  const photoEl = cardElement.querySelector('.popup__photo');
  photosList.removeChild(photoEl);
  photos.forEach((photo) => {
    const clonePhotoEl = photoEl.cloneNode(true);
    clonePhotoEl.src = photo;
    photosList.appendChild(clonePhotoEl);
  })
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarCardFragment = document.createDocumentFragment();

ads.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  const randomHouseType = getRandomArrayElement(Object.values(HomeType));
  cardElement.querySelector('.popup__type').textContent = homeTypeToReadable[randomHouseType];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getAdsFeauters(offer, cardElement);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  getAdsPhotos(offer, cardElement);

  similarCardFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarCardFragment);



