import { bigPicture } from './open-popup.js';
import { imgUploadOverlay, body, imagePreview } from './open-editor.js';
import { getSliderAvailable } from './utils.js';

const closePopUp = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeEditorWindow = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  getSliderAvailable();
  imagePreview.removeAttribute('class');
  imagePreview.removeAttribute('style');
  document.querySelector('#effect-none').checked = true;
  document.querySelector('#upload-file').value = '';
};

export { closePopUp, closeEditorWindow };
