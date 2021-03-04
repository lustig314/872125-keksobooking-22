
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
  const {features} = offer;
  const feautureList = cardElement.querySelector('.popup__features');
  const feautureEl = cardElement.querySelector('.popup__feature');
  const feautureEls = cardElement.querySelectorAll('.popup__feature');

  feautureEls.forEach((value) => {
    feautureList.removeChild(value);
  })

  features.forEach((feauture) => {
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

export { getAdsFeauters, getAdsPhotos, createCustomPopup };
