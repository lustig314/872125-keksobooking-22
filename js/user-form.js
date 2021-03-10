import { sendData } from './api.js';
import { adForm, resetToDeafaultState } from './page-state.js';
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

// Валидация поля заголовка

const titleInput = adForm.querySelector('#title')

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Функция зависимости мест от количества комнат

const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const capacityOptions = capacityInput.querySelectorAll('option');

const removeDisabled = (elements) => {
  elements.forEach((currentElement) => {
    currentElement.removeAttribute('disabled');
  });
}

const addDisabled = (element) => element.setAttribute('disabled', 'disabled');

roomNumberInput.addEventListener('input', () => {
  const roomNumberValue = roomNumberInput.value;

  if (roomNumberValue === '1') {
    removeDisabled(capacityOptions);
    addDisabled(capacityOptions[0]);
    addDisabled(capacityOptions[1]);
    addDisabled(capacityOptions[3]);
  } else if (roomNumberValue === '2') {
    removeDisabled(capacityOptions);
    addDisabled(capacityOptions[0]);
    addDisabled(capacityOptions[3]);
  } else if (roomNumberValue === '3') {
    removeDisabled(capacityOptions);
    addDisabled(capacityOptions[3]);
  } else {
    removeDisabled(capacityOptions);
    capacityInput.value = '0';
    addDisabled(capacityOptions[0]);
    addDisabled(capacityOptions[1]);
    addDisabled(capacityOptions[2]);
  }
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


