
// Неактивное состояние формы
const adForm = document.querySelector('.ad-form');
const adFormFile = adForm.querySelector('#avatar')
const adFormElements = adForm.querySelectorAll('.ad-form__element')
adForm.classList.add('ad-form--disabled');
adFormFile.setAttribute('disabled', 'disabled');
adFormElements.forEach((element) => {
  element.setAttribute('disabled', 'disabled');
});

// Неактивное состояние фильтра
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter')
const mapFeature = mapFilters.querySelector('#housing-features')
mapFilters.classList.add('map__filters--disabled');
mapFilter.forEach((filter) => {
  filter.setAttribute('disabled', 'disabled');
});
mapFeature.setAttribute('disabled', 'disabled');

const activeState = () => {
  // Активное состояние формы
  adForm.classList.remove('ad-form--disabled');
  adFormFile.removeAttribute('disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  // Активное состояние фильтра
  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  mapFeature.removeAttribute('disabled');
}

export { activeState };
