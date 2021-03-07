
import { showAlert } from './user-form.js'



const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((ads) => onSuccess(ads))
      } else {
        showAlert('Данные о похожих объявлениях не были получены')
      }
    })
    .catch(() => {
      showAlert('Данные о похожих объявлениях не были получены')
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { sendData, getData };

