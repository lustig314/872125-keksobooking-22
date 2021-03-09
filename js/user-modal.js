import { isEscEvent } from './util.js'

const main = document.querySelector('main');

const showSendErrorOrSuccess = (error) => {
  const isError = error;
  const errorOrSuccess = () => {
    if (isError) {
      const sendTemplate = document.querySelector('#error').content.querySelector('.error')
      return sendTemplate
    }
    const sendTemplate = document.querySelector('#success').content.querySelector('.success')
    return sendTemplate;
  }

  const send = errorOrSuccess().cloneNode(true);
  send.style.zIndex = '1000';
  main.appendChild(send);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal()
    }
  };

  const onPopupMouseClick = () => {
    closeModal();
  };

  const openModal = () => {
    document.addEventListener('click', onPopupMouseClick)
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  const closeModal = () => {
    main.removeChild(send);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onPopupMouseClick);
  };
  openModal();

};


export { showSendErrorOrSuccess }
