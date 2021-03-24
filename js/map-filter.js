
const mapFilters = document.querySelector('.map__filters');
const typeHousesFilterInput = mapFilters.querySelector('#housing-type');
const pricesFilterInput = mapFilters.querySelector('#housing-price');
const roomsFilterInput = mapFilters.querySelector('#housing-rooms');
const guestsFilterInput = mapFilters.querySelector('#housing-guests');

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

const CONTROL_DEFAULT_VALUE = 'any';




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
    if (valuePrices === CONTROL_DEFAULT_VALUE) {
      return true;
    }

    return ad.offer.price > priceTypeToRange[valuePrices].MIN && ad.offer.price < priceTypeToRange[valuePrices].MAX
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
    let count = 0;
    checkedFeatures.forEach((feature) => {
      if (ad.offer.features.includes(feature.value))
        count++;
    })

    return count === checkedFeatures.length;
  },
}

const getFilteredAds = (ads) => {
  const filteredAds = ads.filter((adData) => {
    const isSuitable = Object.keys(validationTypeToFunction).every((key) => {
      const currentValidation = validationTypeToFunction[key];
      return currentValidation(adData);
    });

    return isSuitable;
  });

  return filteredAds;
};


export {getFilteredAds, mapFilters}
