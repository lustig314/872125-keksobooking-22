
import { HomeType } from './common/enums.js';

const homeTypeToReadable = {
  [HomeType.FLAT]: 'Квартира',
  [HomeType.BUNGALOW]: 'Бунгало',
  [HomeType.HOUSE]: 'Дом',
  [HomeType.PALACE]: 'Дворец',
};


const getAdsFeauters = (offer, cardElement) => {
  const {features} = offer;
  const feautureList = cardElement.querySelector('.popup__features');
  const feautureEl = cardElement.querySelector('.popup__feature');
  const feautureEls = cardElement.querySelectorAll('.popup__feature');
  feautureEls.forEach((value) => {
    feautureList.removeChild(value);
  });


  if (features.length !== 0) {
    features.forEach((feature) => {
      const cloneFeautureEl = feautureEl.cloneNode(true);
      cloneFeautureEl.classList.add(`popup__feature--${feature}`);
      feautureList.appendChild(cloneFeautureEl);
    });
  } else {
    feautureList.hidden = true;
  }

};

const getAdsPhotos = (offer, cardElement) => {
  const photos = offer.photos;
  const photosList = cardElement.querySelector('.popup__photos');
  const photoEl = cardElement.querySelector('.popup__photo');
  photosList.removeChild(photoEl);

  if (photos.length !== 0) {
    photos.forEach((photo) => {
      const clonePhotoEl = photoEl.cloneNode(true);
      clonePhotoEl.src = photo;
      photosList.appendChild(clonePhotoEl);
    });
  } else {
    photosList.hidden = true;
  }
};

const createCustomPopup = (author, offer) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const avatar = popupElement.querySelector('.popup__avatar');
  const title = popupElement.querySelector('.popup__title');
  const address = popupElement.querySelector('.popup__text--address');
  const price = popupElement.querySelector('.popup__text--price');
  const type = popupElement.querySelector('.popup__type');
  const capacity = popupElement.querySelector('.popup__text--capacity');
  const time = popupElement.querySelector('.popup__text--time');
  const description = popupElement.querySelector('.popup__description')
  avatar.src = author.avatar;
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = homeTypeToReadable[offer.type];
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getAdsFeauters(offer, popupElement);
  description.textContent = offer.description;
  getAdsPhotos(offer, popupElement);

  if (!author.avatar) {
    avatar.hidden = true;
  }

  if (!offer.title) {
    title.hidden = true;
  }

  if (!offer.address) {
    address.hidden = true;
  }

  if (!offer.price && offer.price !== 0) {
    price.hidden = true;
  }

  if (!offer.type) {
    type.hidden = true;
  }

  if (!offer.rooms && !offer.guests && offer.rooms !== 0 && offer.guests !== 0) {
    capacity.hidden = true;
  }

  if (!offer.checkin && !offer.checkout) {
    time.hidden = true;
  }

  if (!offer.description) {
    description.hidden = true;
  }

  return popupElement;
};

export { getAdsFeauters, getAdsPhotos, createCustomPopup };
