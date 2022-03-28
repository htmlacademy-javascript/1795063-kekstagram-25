import './upload-photo.js';
import { closeEditorWindow } from './close-popup.js';
import { getMiniatures } from './get-miniatures.js';
import { getData, setUserFormSubmit } from './api.js';
import { sortImgs } from './change-filter.js';

getData((data) => {
  getMiniatures(data);
  sortImgs(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
});

setUserFormSubmit(closeEditorWindow);
