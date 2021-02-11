const RANDOM_SEPARATOR = 0.5;
const RANDOM_ITEMS_START_IDX = 0;


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

const getShuffledItems = (items) => {
  const shuffledArray = items.slice().sort(() => Math.random() - RANDOM_SEPARATOR);
  return shuffledArray;
};

const getRandomArrayLength = (items, count) => {
  const randomItems = getShuffledItems(items).slice(RANDOM_ITEMS_START_IDX, count);
  return randomItems;
};








export { getRandomInteger, getRandomFractional, getRandomArrayElement, getRandomArrayLength };
