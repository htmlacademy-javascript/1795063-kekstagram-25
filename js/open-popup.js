import { closePopUp } from './close-popup.js';

const template = document.querySelector('#social__comment').content;
const fragment = document.createDocumentFragment();
const bigPicture = document.querySelector('.big-picture');
const photoDescription = document.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoadButton = bigPicture.querySelector('.comments-loader');
const commentsShown = bigPicture.querySelector('.comments-shown');
const ESC_KEY_CODE = 27;
let count = 0;
let commentToShowFrom = 5;
let commentsLeft;

const closeThisWindow = () => {
  closePopUp();
  count = 0;
  commentToShowFrom = 5;
  commentsLeft = undefined;
};

const createNewComment = (data) => {
  const element = template.cloneNode(true);
  element.querySelector('.social__picture').src = `${data.avatar}`;
  element.querySelector('.social__picture').alt = `${data.name}`;
  element.querySelector('.social__text').textContent = `${data.message}`;
  fragment.appendChild(element);
};

const loadMoreComments = (comments) => {
  commentsLeft = comments.length - commentToShowFrom;
  if (commentsLeft <= 4) {
    for (commentToShowFrom; commentToShowFrom <= comments.length - 1; commentToShowFrom++) {
      createNewComment(comments[commentToShowFrom]);
    }
    commentsShown.textContent = commentToShowFrom;
    commentsList.appendChild(fragment);
    commentsLoadButton.classList.add('hidden');
  } else {
    for (commentToShowFrom; commentToShowFrom <= comments.length - commentsLeft + 4; commentToShowFrom++) {
      createNewComment(comments[commentToShowFrom]);
    }
    commentsShown.textContent = commentToShowFrom;
    commentsLeft = comments.length - commentToShowFrom;
    commentsList.appendChild(fragment);
  }
};

const openBigPicture = (data) => {
  commentsLoadButton.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = `${data.url}`;
  bigPicture.querySelector('.likes-count').textContent = `${data.likes}`;
  bigPicture.querySelector('.comments-count').textContent = `${data.comments.length}`;
  photoDescription.textContent = `${data.description}`;

  commentsList.innerHTML = '';

  if (data.comments.length <= 4) {
    for (let k = 0; k <= data.comments.length - 1; k++) {
      createNewComment(data.comments[k]);
      count = count + 1;
    }
    commentsLoadButton.classList.add('hidden');
  } else {
    for (let k = 0; k <= 4; k++) {
      createNewComment(data.comments[k]);
      count = count + 1;
    }
  }

  commentsShown.textContent = count;

  commentsList.appendChild(fragment);

  const onClickLoadButton = () => loadMoreComments(data.comments);

  commentsLoadButton.addEventListener('click', onClickLoadButton);


  const closeButton = bigPicture.querySelector('#picture-cancel');
  closeButton.addEventListener('click', () => {
    closeThisWindow();
    commentsLoadButton.removeEventListener('click', onClickLoadButton);
  });

  window.addEventListener('keyup', (evt) => {
    evt.preventDefault();
    if (evt.keyCode === ESC_KEY_CODE) {
      commentsLoadButton.removeEventListener('click', onClickLoadButton);
      closeThisWindow();
    }
  });

  bigPicture.classList.remove('hidden');
};

export { openBigPicture, bigPicture, commentToShowFrom };
