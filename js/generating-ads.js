import { ads } from './data.js';
import { createAuthor } from './data.js';
import { createOffer } from './data.js';



const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarCardFragment = document.createDocumentFragment();

ads.forEach(() => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = createAuthor().avatar;
  cardElement.querySelector('.popup__title').textContent = createOffer().title;
  cardElement.querySelector('.popup__text--address').textContent = createOffer().adress;
  cardElement.querySelector('.popup__text--price').textContent = `${createOffer().price} ₽/ночь`;
  const defineHome = (typeHome) => {
    switch(typeHome) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Вид жилища не определён.';
    }
  };
  cardElement.querySelector('.popup__type').textContent = defineHome(createOffer().type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${createOffer().rooms} комнаты для ${createOffer().guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${createOffer().checkin}, выезд до ${createOffer().checkout}`;

  const createOfferList = (list) => {
    const feautureArray = createOffer().feauters;

    for (let i  = list.children.length - 1; i > 0; i--) {
      const child = list.children[i];
      for (let j = 0; j < feautureArray.length; j++) {
        if (child.classList.contains(`popup__feature--${feautureArray[j]}`)) {
          child.parentElement.removeChild(child);
        }
      }
    }
  };
  const offerList = cardElement.querySelector('.popup__features');
  createOfferList(offerList);
  cardElement.querySelector('.popup__description').textContent = createOffer().description;

  const photosArray = createOffer().photos;
  const photosList = cardElement.querySelector('.popup__photos');
  const photoEl = cardElement.querySelector('.popup__photo');
  photosList.removeChild(photoEl);

  for (let i = 0; i < photosArray.length; i++) {
    const clonePhotoEl = photoEl.cloneNode(true);
    clonePhotoEl.setAttribute('src', photosArray[i]);
    photosList.appendChild(clonePhotoEl);
  }

  similarCardFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarCardFragment);



