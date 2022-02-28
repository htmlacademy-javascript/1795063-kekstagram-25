import { showAlert, uploadForm, getErrorMessage, getSuccessMessage } from './utils.js';

const getData = (onSuccess) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => showAlert());
};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    ) .then((response) => {
      if (response.ok) {
        onSuccess(getSuccessMessage());
      } else {
        getErrorMessage();
      }
    },
    )
      .catch((err) => showAlert(err));
  });
};

export { setUserFormSubmit, getData };
