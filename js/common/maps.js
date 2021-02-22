import { HomeType } from './enums.js';

const homeTypeToReadable = {
  [HomeType.FLAT]: 'Квартира',
  [HomeType.BUNGALOW]: 'Бунгало',
  [HomeType.HOUSE]: 'Дом',
  [HomeType.PALACE]: 'Дворец',
};

export { homeTypeToReadable };
