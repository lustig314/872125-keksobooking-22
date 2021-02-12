const RANDOM_INTEGER = {
  MIN_COUNT: 0,
  MAX_COUNT: 10000,
};
const SIGN_AFTER_COMMA = 5;
const DEFAULT_RETURN = -1;
const RANDOM_SEPARATOR = 0.5;
const RANDOM_ITEMS_START_IDX = 0;


// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInteger = (min = RANDOM_INTEGER.MIN_COUNT, max = RANDOM_INTEGER.MAX_COUNT) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return DEFAULT_RETURN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractional = (min, max, afterComma = SIGN_AFTER_COMMA) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return DEFAULT_RETURN;
  }
  const randomNumber = Math.random() * (max - min) + min;
  return Number(randomNumber.toFixed(afterComma));
};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

//Функция, возвращающая массив случайной длины из случайных, неповторяющихся значений.

const getShuffledItems = (items) => {
  const shuffledArray = items.slice().sort(() => Math.random() - RANDOM_SEPARATOR);
  return shuffledArray;
};

const getRandomArrayLength = (items) => {
  const randomItems = getShuffledItems(items).slice(getRandomInteger(RANDOM_ITEMS_START_IDX, items.length - 1));
  return randomItems;
};

export { getRandomInteger, getRandomFractional, getRandomArrayElement, getRandomArrayLength };
