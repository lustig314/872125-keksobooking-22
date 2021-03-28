import { setDefaultAddressInput, mainMarker, DEFAULT_COORDINATES, updatePins } from './map.js'
import { showSendErrorOrSuccess } from './user-modal.js';


const DEFAULT_PRICE_PALCEHOLDER = '1000';

// Неактивное состояние формы
const adForm = document.querySelector('.ad-form');
const adFormFile = adForm.querySelector('#avatar');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const toggleNodesDisabled = (nodes, isDisabled) => {
  nodes.forEach((node) => {
    node.disabled = isDisabled;
  });
};
adForm.classList.add('ad-form--disabled');
adFormFile.disabled = true;
toggleNodesDisabled(adFormElements, true);

// Неактивное состояние фильтра
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeature = mapFilters.querySelector('#housing-features');
mapFilters.classList.add('map__filters--disabled');
toggleNodesDisabled(mapFilter, true);
mapFeature.disabled = true;

const setActiveState = () => {
  // Активное состояние формы
  adForm.classList.remove('ad-form--disabled');
  adFormFile.disabled = false;
  toggleNodesDisabled(adFormElements, false);

  // Активное состояние фильтра
  mapFilters.classList.remove('map__filters--disabled');
  toggleNodesDisabled(mapFilter, false);
  mapFeature.disabled = false;
};

// Исходное состояние формы

const resetToDeafaultState = (isShowSend = true) => {
  if (isShowSend) {
    showSendErrorOrSuccess(false);
  }
  adForm.reset();
  const priceInput = adForm.querySelector('#price');
  priceInput.placeholder = DEFAULT_PRICE_PALCEHOLDER;
  mapFilters.reset();
  updatePins();
  setDefaultAddressInput();
  mainMarker.setLatLng(
    {
      lat: DEFAULT_COORDINATES.lat,
      lng: DEFAULT_COORDINATES.lng,
    },
  )

}


export { setActiveState, resetToDeafaultState, toggleNodesDisabled, adForm };
