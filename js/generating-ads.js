import { ads } from './data.js';
import { createAuthor } from './data.js';
import { createOffer } from './data.js';
import { MocksConfig } from './data.js';


const HomeType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

/* const homeTypeToReadable = {
  [HomeType.FLAT]: 'Квартира',
  [HomeType.BUNGALOW]: 'Бунгало',
  [HomeType.HOUSE]: 'Дом',
  [HomeType.PALACE]: 'Дворец',
}
 */



const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarCardFragment = document.createDocumentFragment();

ads.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
/*   const defineHome = (typeHome) => {
    if (typeHome === ) */

/*     switch(typeHome) {
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
*/
  cardElement.querySelector('.popup__type').textContent =  HomeType[offer.type];

  /* cardElement.querySelector('.popup__type').textContent = defineHome(createOffer().type); */
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const createOfferList = (list) => {
    const feautureArray = offer.feauters;

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
  cardElement.querySelector('.popup__description').textContent = offer.description;

  const photosArray = offer.photos;
  const photosList = cardElement.querySelector('.popup__photos');
  const photoEl = cardElement.querySelector('.popup__photo');
  photosList.removeChild(photoEl);

  photosArray.forEach((_, index, array) => {
    const clonePhotoEl = photoEl.cloneNode(true);
    clonePhotoEl.setAttribute('src', array[index]);
    photosList.appendChild(clonePhotoEl);
  })


  
  /* for (let i = 0; i < photosArray.length; i++) {
    const clonePhotoEl = photoEl.cloneNode(true);
    clonePhotoEl.setAttribute('src', photosArray[i]);
    photosList.appendChild(clonePhotoEl);
  }
 */
  similarCardFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarCardFragment);



