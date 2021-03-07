import { sendData } from './api.js';
import { adForm, resetToDeafaultState } from './page-state.js';
import { showSendErrorOrSuccess } from './user-modal.js'
import { showAlert } from './util.js'
/* import { typeHousesInput } from './popup.js' */

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



/*
const setTypeHousesChange = (cb) => {
  typeHousesInput.addEventListener('input', () => {
    cb();
  })
}


export { setTypeHousesChange }

 */


















export { showAlert, setUserFormSubmit }


