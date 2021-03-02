import { isEscEvent } from './util.js'

const main = document.querySelector('main');

const showSendError = () => {
  const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error')
  const sendError = sendErrorTemplate.cloneNode(true);
  sendError.style.zIndex = '1000';
  main.appendChild(sendError);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeErrorModal()
    }
  };

  const onPopupMouseClick = () => {
    closeErrorModal();
  };

  const openErrorModal = () => {
    document.addEventListener('click', onPopupMouseClick)
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  const closeErrorModal = () => {
    main.removeChild(sendError);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onPopupMouseClick);
  };
  openErrorModal();

};

const showSendSuccess = () => {
  const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success')
  const sendSuccess = sendSuccessTemplate.cloneNode(true);
  sendSuccess.style.zIndex = '1000';
  main.appendChild(sendSuccess);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeErrorModal()
    }
  };

  const onPopupMouseClick = () => {
    closeErrorModal();
  };

  const openSuccessModal = () => {
    document.addEventListener('click', onPopupMouseClick)
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  const closeErrorModal = () => {
    main.removeChild(sendSuccess);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onPopupMouseClick);
  };

  openSuccessModal()

};



export {showSendError, showSendSuccess}
