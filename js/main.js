
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
const getRandomFractional = (min, max, afterComma) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return -1;
  }
  const randomNumber = Math.random() * (max - min) + min;
  return Number(randomNumber.toFixed(afterComma));
};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length-1)];
};

//Функция, возвращающая массив случайной длины из определенных значений

const getRandomArrayLength = (array) => {
  return
};



const OFFER_HEADERS = [
  'Только сегодня!',
  'Акция!!!',
  'Лучшее предложение!',

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

]

const author = {
  avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
};

const offer = {
  title: getRandomArrayElement(OFFER_HEADERS),
  adress: 'location.x + location.y',
  price: getRandomInteger(),
  type: getRandomArrayElement(TYPES_HOUSES),
  rooms: getRandomInteger(),
  guests: getRandomInteger(),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  feauters:
};
