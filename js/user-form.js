import { adForm, resetToDeafaultState } from './page-state.js'


const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://22.javascript.pages.academy/keksobooking', {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess());
  });
};


setUserFormSubmit(resetToDeafaultState);
