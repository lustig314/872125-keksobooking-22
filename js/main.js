
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomInteger();

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFractional = (min, max, afterComma) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return -1;
  }
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterComma);
};
getRandomFractional();
