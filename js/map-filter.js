import { SIMILAR_ADS_COUNT } from './map.js'


const mapFilters = document.querySelector('.map__filters');
const typeHousesFilterInput = mapFilters.querySelector('#housing-type');
const pricesFilterInput = mapFilters.querySelector('#housing-price');
const roomsFilterInput = mapFilters.querySelector('#housing-rooms');
const guestsFilterInput = mapFilters.querySelector('#housing-guests');


const CONTROL_DEFAULT_VALUE = 'any';

const priceTypeToRange = {
  'middle': {
    MIN: 10000,
    MAX: 50000,
  },
  'low': {
    MIN: 0,
    MAX: 10000,
  },
  'high': {
    MIN: 50000,
    MAX: Infinity,
  },
};



const checkIsControlInterrelation = (controlValue, checker) => {
  const isInterrelation = controlValue === CONTROL_DEFAULT_VALUE || checker;

  return isInterrelation;
};

const validationTypeToFunction = {
  checkType(ad) {
    const valueType = typeHousesFilterInput.value;
    return checkIsControlInterrelation(valueType, ad.offer.type === valueType)
  },

  checkPrice(ad) {
    const valuePrices = pricesFilterInput.value;
    const filteringPrice = priceTypeToRange[valuePrices];

    return valuePrices === CONTROL_DEFAULT_VALUE || ad.offer.price > filteringPrice.MIN && ad.offer.price < filteringPrice.MAX

  },

  checkRoomsNumber(ad) {
    const valueRooms = roomsFilterInput.value;
    return checkIsControlInterrelation(valueRooms, ad.offer.rooms === Number(valueRooms))
  },
  checkGuestsNumber(ad) {
    const valueGuests = guestsFilterInput.value;
    return checkIsControlInterrelation(valueGuests, ad.offer.guests === Number(valueGuests))
  },

  checkFeatures(ad) {
    const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
    return Array.from(checkedFeatures).every((checkbox) => {
      return ad.offer.features.includes(checkbox.value);
    });
  },
};

const getFilteredAds = (ads) => {
  const filteredAds = [];
  const validtionFunctionKeys = Object.keys(validationTypeToFunction);
  for (let ad of ads) {
    const isSuitable = validtionFunctionKeys.every((key) => {
      const currentValidation = validationTypeToFunction[key];
      return currentValidation(ad);
    });

    if (isSuitable) {
      filteredAds.push(ad)
    }
    if (filteredAds.length >= SIMILAR_ADS_COUNT) {
      break
    }
  }
  return filteredAds
};

export { getFilteredAds, mapFilters };
