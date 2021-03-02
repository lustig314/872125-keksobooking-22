import { setDefaultAddressInput } from './map.js'
import { mainMarker } from './map.js';
import { coordinatesConfig } from './common/enums.js';
import { showSendSuccess } from './user-modal.js';
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

const activeState = () => {
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
    showSendSuccess();
  }
  adForm.reset();
  mapFilters.reset();
  setDefaultAddressInput();
  mainMarker.setLatLng(
    {
      lat: coordinatesConfig.DEFAULT_COORDINATES.lat,
      lng: coordinatesConfig.DEFAULT_COORDINATES.lng,
    },
  )

}


export { activeState, resetToDeafaultState, adForm};
