import { sendData } from './api.js';
import { adForm, resetToDeafaultState, toggleNodesDisabled } from './page-state.js';
import { showSendErrorOrSuccess } from './user-modal.js';
import { showAlert } from './util.js';
import { HomeType } from './common/enums.js'

/* import { typeHousesFilterInput } from './popup.js' */

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const homeTypeToPrice = {
  [HomeType.BUNGALOW]: 0,
  [HomeType.FLAT]: 1000,
  [HomeType.HOUSE]: 5000,
  [HomeType.PALACE]: 10000,
};


const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showSendErrorOrSuccess(true),
      new FormData(evt.target),
    );
  });
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetToDeafaultState(false);
});

// Функция зависимости цены от выбранного типа жилья

const typeHousesInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');

typeHousesInput.addEventListener('input', () => {
  const currentHomeTypePrice = homeTypeToPrice[typeHousesInput.value];
  priceInput.placeholder = currentHomeTypePrice;
  priceInput.min = currentHomeTypePrice;
})

// Функция зависимости времени заезда и выезда

const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

timeInInput.addEventListener('input', () => {
  timeOutInput.value = timeInInput.value;
});

timeOutInput.addEventListener('input', () => {
  timeInInput.value = timeOutInput.value;
});

// Функция зависимости мест от количества комнат


const roomsToGuests = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');

const changeCapacity =  () => {
  const roomGuests = roomsToGuests[roomNumberInput.value];
  const isAllow = roomGuests.includes(Number(capacityInput.value));
  capacityInput.setCustomValidity(isAllow ? '' : 'Cлишком много людей для такого типа помещения.');
};

roomNumberInput.addEventListener('input', () => {
  changeCapacity();
});
capacityInput.addEventListener('input', () => {
  changeCapacity();
});





















/*
const setTypeHousesChange = (cb) => {
  typeHousesInput.addEventListener('input', () => {
    cb();
  })
}

export { setTypeHousesChange }

 */

export { showAlert, setUserFormSubmit }


