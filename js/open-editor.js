import { closeEditorWindow } from './close-popup.js';
import { onValidHashtag, getSliderAvailable, MAX_COMMENT_LENGTH } from './utils.js';
import { effects } from './effects-list.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const tags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const closeButton = document.querySelector('#upload-cancel');
const scaleInput = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const SCALE_CNANGE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_DEFAULT_VALUE = 100;
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const filters = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
let scaleValue = SCALE_DEFAULT_VALUE; //default value of scale

const setScaleValue = (scale) => {
  scaleInput.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale/100})`;
};

const decreaseScale = () => {
  if ((scaleValue - SCALE_CNANGE_STEP) > 25) {
    scaleValue = scaleValue - SCALE_CNANGE_STEP;
    setScaleValue(scaleValue);
  } else {
    setScaleValue(SCALE_MIN_VALUE);
  }
};

const increaseScale = () => {
  if ((scaleValue + SCALE_CNANGE_STEP) <= 100) {
    scaleValue = scaleValue + SCALE_CNANGE_STEP;
    setScaleValue(scaleValue);
  } else {
    setScaleValue(SCALE_MAX_VALUE);
  }
};

const onFilterChange = (evt) => {
  const chosenFilter = evt.target.value;

  imagePreview.removeAttribute('class');
  if (evt.target.matches('input[type="radio"]') && (chosenFilter === 'none')) {
    imagePreview.removeAttribute('class');
    imagePreview.style.removeProperty('filter');
    document.querySelector('.effect-level').classList.add('hidden');
  } else {
    document.querySelector('.effect-level').classList.remove('hidden');
    imagePreview.classList.add(`${effects[chosenFilter].class}`);
    imagePreview.style.filter = `${effects[chosenFilter].filter}(${effects[chosenFilter].max})`;
    getSliderAvailable();
    noUiSlider.create(sliderElement, {
      range: {
        min : effects[chosenFilter].min,
        max : effects[chosenFilter].max,
      },
      start : effects[chosenFilter].start,
      step : effects[chosenFilter].step,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });
    sliderElement.noUiSlider.on('update', (first, handle, unencoded) => {
      effectValue.value = unencoded[handle];
      imagePreview.style.filter = `${effects[chosenFilter].filter}(${unencoded[handle]}${effects[chosenFilter].unit})`;
    });
  }
};

const onOpenEditor = () => {  //MAIN FUNCTION
  setScaleValue(SCALE_DEFAULT_VALUE);

  scaleSmallerButton.addEventListener('click', decreaseScale);
  scaleBiggerButton.addEventListener('click', increaseScale);

  comment.addEventListener('input', () => {
    if (comment.value.length > MAX_COMMENT_LENGTH) {
      comment.setCustomValidity('Слишком много букв');
    }
    comment.reportValidity();
  });

  tags.addEventListener('input', () => {
    onValidHashtag(tags.value);
  });
  filters.addEventListener('change', onFilterChange);

  document.querySelector('.effect-level').classList.add('hidden');
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');

  closeButton.addEventListener('click', () => {
    closeEditorWindow();
  });
  window.addEventListener('keyup', (evt) => {
    evt.preventDefault();
    if ((evt.target !== tags) && (evt.target !== comment)) {
      if (evt.keyCode === 27) {
        if (((tags === document.activeElement) !== null) || ((comment === document.activeElement) !== null)) {
          closeEditorWindow();
        }
      }
    }
  });

};

export { onOpenEditor, imgUploadOverlay, body, tags, scaleValue, sliderElement, imagePreview };
