import {openBigPicture} from './open-popup.js';

const getMiniatures = (library) => {
  const pictures = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < library.length; i++) {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = `${library[i].url}`;
    element.querySelector('.picture__info').querySelector('.picture__comments').textContent = `${library[i].comments.length}`;
    element.querySelector('.picture__info').querySelector('.picture__likes').textContent = `${library[i].likes}`;
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(library[i]);});
    fragment.appendChild(element);
  }
  pictures.appendChild(fragment);
};

export { getMiniatures };
