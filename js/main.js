
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInteger = (min = 0, max = 10000) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractional = (min, max, afterComma = 5) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return -1;
  }
  const randomNumber = Math.random() * (max - min) + min;
  return Number(randomNumber.toFixed(afterComma));
};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

//Функция, возвращающая массив случайной длины из случайных, неповторяющихся значений.
const getRandomArrayLength = (array) => {
  const arrayRandomLength = [];
  let randomVote;
  array.forEach((value) => {
    randomVote = getRandomInteger(0, 1);
    if (randomVote === 1) {
      arrayRandomLength.push(value);
    }
  });
  if (arrayRandomLength.length === 0) {
    arrayRandomLength.push(array[getRandomInteger(0, array.length - 1)])
  }
  return arrayRandomLength;
};

const OFFER_HEADERS = [
  'Only today!',
  'Sale!!!',
  'Best offer!',

];
const TYPES_HOUSES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const LIST_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_HOUSES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const SIMILAR_ADS_COUNT = 10;

const author = {
  avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
};

const location = {
  x: getRandomFractional(35.65000, 35.70000),
  y: getRandomFractional(139.70000, 139.80000),
};

const offer = {
  title: getRandomArrayElement(OFFER_HEADERS),
  adress: location.x + ', ' + location.y,
  type: getRandomArrayElement(TYPES_HOUSES),
  rooms: getRandomInteger(1, 15),
  guests: getRandomInteger(2, 30),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  feauters: getRandomArrayLength(LIST_FEATURES),
  description: getRandomArrayElement(OFFER_HEADERS) + ' Comfortable ' + getRandomArrayElement(TYPES_HOUSES) + ' with ' + getRandomInteger(1, 15) + ' rooms, which can accommodate ' + getRandomInteger(2, 30) + ' guests' + '. At an attractive price: ' + getRandomInteger(),
  photos: getRandomArrayLength(PHOTOS_HOUSES),
};

const createAds = () => {
  return author + offer + location;
};

const similarAdsNearby = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAds());

console.log(similarAdsNearby);
