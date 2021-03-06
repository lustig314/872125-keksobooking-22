const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_FILE_IDX = 0;
const DEFAULT_PREVIEW_SIZE = '70px 70px';

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview > img');
const fileChooserHousing = document.querySelector('#images');
const previewHousing = document.querySelector('.ad-form__photo');

const setPreview = (input, img, isPreviewHousing = false) => {

  input.addEventListener('change', () => {
    const file = input.files[DEFAULT_FILE_IDX];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (isPreviewHousing) {
          img.style.backgroundImage = `url(${reader.result})`;
          img.style.backgroundSize = DEFAULT_PREVIEW_SIZE;
        } else {
          img.src = reader.result;
        }

      });
      reader.readAsDataURL(file);
    }
  });
}

setPreview(fileChooserAvatar, previewAvatar);
setPreview(fileChooserHousing, previewHousing, true);


export { previewAvatar, previewHousing }
