import { sendData } from './api.js';
import { adForm, resetToDeafaultState } from './page-state.js';
import { showSendErrorOrSuccess } from './user-modal.js'

const showAlert = (message) => {
  const map = document.querySelector('#map-canvas')
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 40px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  map.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => resetToDeafaultState(false));


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

export { showAlert, setUserFormSubmit }


