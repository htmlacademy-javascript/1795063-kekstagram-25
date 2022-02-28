import { tags, sliderElement } from './open-editor.js';
import { closeEditorWindow } from './close-popup.js';

const MAX_HASTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 5000;
const uploadForm = document.querySelector('.img-upload__form');
const successTemaplate = document.querySelector('#success').content.querySelector('.success');
const errorTempalte = document.querySelector('#error').content.querySelector('.error');

const getSliderAvailable = () => {
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
  }
};

const getRandomNumberFromRange = function(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkMaxLength = function(str, maxLength) {
  return (str.length <= maxLength);
};

const onValidHashtag = function (tagList) {
  const sepTags = tagList.toLowerCase().split(' ');
  if ((sepTags[sepTags.length - 1]) === '') {
    sepTags.pop();
  }
  const regexp = /^#\w+$/;
  const newSet = new Set(sepTags);
  const startWithHash = (element) => element[0] !== '#';
  const checkMaxHashtagLength = (element) => element.length >= MAX_HASTAG_LENGTH;
  const checkRegexp = (element) => !regexp.test(element);

  if (sepTags.length <= 5) {
    if (newSet.size === sepTags.length) {
      if (sepTags.some(startWithHash)) {
        tags.setCustomValidity('хэштэг должен начинатсья с #!');
        tags.style.outline = 'red 2px solid';
      } else if (sepTags.some(checkRegexp)) {
        tags.setCustomValidity('Неправильный формат хэштега!');
        tags.style.outline = 'red 2px solid';
      } else if (sepTags.some(checkMaxHashtagLength)) {
        tags.setCustomValidity(`Максимальная длина хэштэга ${MAX_HASTAG_LENGTH}!`);
        tags.style.outline = 'red 2px solid';
      } else {
        tags.setCustomValidity('');
        tags.style = '';
      }
    } else {
      tags.setCustomValidity('Удалите повторяющиеся хэштеги!');
    }
  } else if (sepTags.length === 0) {
    tags.setCustomValidity('');
  } else {
    tags.setCustomValidity(`Хэштегов должно быть не больше ${MAX_HASHTAG_NUMBER}!`);
  }

  tags.reportValidity();
};

const showAlert = () => {
  const randomeNumber = getRandomNumberFromRange(1,3);
  const alertContainer = document.createElement('div');
  const alertImg = document.createElement('img');
  alertImg.src = `img/error-img-${randomeNumber}.jpg`;
  alertImg.width = '300';
  alertImg.style.display = 'block';
  alertImg.style.margin = '30vh auto';
  alertContainer.append(alertImg);
  alertContainer.style.top = 0;
  alertContainer.style.backgroundColor = '#000000ad';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '100vw';
  alertContainer.style.height = '100vh';


  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getSuccessMessage = () => {
  closeEditorWindow();
  uploadForm.reset();
  const element = successTemaplate.cloneNode(true);
  element.querySelector('.success__button').addEventListener('click', () => {
    element.remove();
  });
  window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 27) {
      element.remove();
    }
  });
  element.addEventListener('click', () => element.remove());
  document.querySelector('body').appendChild(element);
};

const getErrorMessage = () => {
  closeEditorWindow();
  uploadForm.reset();
  const element = errorTempalte.cloneNode(true);
  element.querySelector('.error__button').addEventListener('click', () => {
    element.remove();
  });
  window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 27) {
      element.remove();
    }
  });
  element.addEventListener('click', () => element.remove());
  document.querySelector('body').appendChild(element);
};

export {
  getRandomNumberFromRange,
  checkMaxLength,
  onValidHashtag,
  showAlert,
  getSliderAvailable,
  getSuccessMessage,
  getErrorMessage,
  MAX_COMMENT_LENGTH,
  uploadForm
};
