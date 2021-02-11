import { getRandomInteger, getRandomFractional, getRandomArrayElement, getRandomArrayLength } from './util.js';

const MocksConfig = {
  USER: {
    AVATAR: {
      MIN_COUNT: 1,
      MAX_COUNT: 8,
    },
  },

  PLACE: {
    LOCATION: {
      X_COORDINATE: {
        MIN_COUNT: 35.65000,
        MAX_COUNT: 35.70000,
      },
      Y_COORDINATE: {
        MIN_COUNT: 139.70000,
        MAX_COUNT: 139.80000,
      },
    },
  },

  REQUEST: {
    TITLE: {
      OFFER_HEADERS: [
        'Only today!',
        'Sale!!!',
        'Best offer!',
      ],
    },
    TYPE: {
      TYPES_HOUSES: [
        'palace',
        'flat',
        'house',
        'bungalow',
      ],
    },
    ROOMS: {
      ROOMS_COUNT: {
        MIN_COUNT: 1,
        MAX_COUNT: 15,
      },
    },
    GUESTS: {
      GUESTS_COUNT: {
        MIN_COUNT: 2,
        MAX_COUNT: 30,
      },
    },
    CHECK_TIMES: [
      '12:00',
      '13:00',
      '14:00',
    ],
    LIST_FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    PHOTOS_HOUSES: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
  },

  SIMILAR_ADS_COUNT: 10,
}


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
  adress: createLocation(),
  type: getRandomArrayElement(
    MocksConfig.REQUEST.TYPE.TYPES_HOUSES),
  rooms: getRandomInteger(
    MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MIN_COUNT,
    MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MAX_COUNT),
  guests: getRandomInteger(MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MIN_COUNT,
    MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MAX_COUNT),
  checkin: getRandomArrayElement(MocksConfig.REQUEST.CHECK_TIMES),
  checkout: getRandomArrayElement(MocksConfig.REQUEST.CHECK_TIMES),
  feauters: getRandomArrayLength(MocksConfig.REQUEST.LIST_FEATURES),
  description: `${getRandomArrayElement(MocksConfig.REQUEST.TITLE.OFFER_HEADERS)} Comfortable ${getRandomArrayElement(MocksConfig.REQUEST.TYPE.TYPES_HOUSES)} with ${getRandomInteger(MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MIN_COUNT, MocksConfig.REQUEST.ROOMS.ROOMS_COUNT.MAX_COUNT)} rooms, which can accommodate ${getRandomInteger(MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MIN_COUNT,MocksConfig.REQUEST.GUESTS.GUESTS_COUNT.MAX_COUNT)} guests. At an attractive price: ${getRandomInteger()}.`,
  photos: getRandomArrayLength(MocksConfig.REQUEST.PHOTOS_HOUSES),
});


const createAd = () => {
  const poolingObjects = {
    author: createAuthor(),
    location: createLocation(),
    offer: createOffer(),
  };
  return poolingObjects;
};

const similarAdsNearby = new Array(MocksConfig.SIMILAR_ADS_COUNT).fill(null).map(() => createAd());


console.log(similarAdsNearby);



