import { getRandomInteger, getRandomFractional, getRandomArrayElement, getRandomItems } from './util.js';
import { MocksConfig, HomeType } from './common/enums.js';

const createAuthor = () => ({
  avatar: `img/avatars/user0${getRandomInteger(
    MocksConfig.USER.AVATAR.MIN_COUNT,
    MocksConfig.USER.AVATAR.MAX_COUNT)}.png`,
});

const createLocation = () => ({
  x: getRandomFractional(
    MocksConfig.PLACE.LOCATION.X_COORDINATE.MIN_COUNT,
    MocksConfig.PLACE.LOCATION.X_COORDINATE.MAX_COUNT),
  y: getRandomFractional(
    MocksConfig.PLACE.LOCATION.Y_COORDINATE.MIN_COUNT,
    MocksConfig.PLACE.LOCATION.Y_COORDINATE.MAX_COUNT),
});

const createOffer = () => ({
  title: getRandomArrayElement(
    MocksConfig.REQUEST.TITLE.OFFER_HEADERS),
  adress: `x: ${createLocation().x}, y: ${createLocation().y}`,
  type: getRandomArrayElement(Object.values(HomeType)),
  price: getRandomInteger(),
  rooms: getRandomInteger(
    MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MIN_COUNT,
    MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MAX_COUNT),
  guests: getRandomInteger(MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MIN_COUNT,
    MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MAX_COUNT),
  checkin: getRandomArrayElement(MocksConfig.REQUEST.CHECK_TIMES),
  checkout: getRandomArrayElement(MocksConfig.REQUEST.CHECK_TIMES),
  feauters: getRandomItems(MocksConfig.REQUEST.LIST_FEATURES),
  description: getRandomArrayElement(
    MocksConfig.REQUEST.DESCRIPTION),
  photos: getRandomItems(MocksConfig.REQUEST.PHOTOS_HOUSES),
});

const createAd = () => {
  const poolingObjects = {
    author: createAuthor(),
    location: createLocation(),
    offer: createOffer(),
  };
  return poolingObjects;
};

const createAds = (count) => {
  const similarAdsNearby = Array.from(new Array(count), () => createAd());
  return similarAdsNearby;
}

const ads = createAds(MocksConfig.SIMILAR_ADS_COUNT);

export { ads };
