import { showAlert, uploadForm, getErrorMessage, getSuccessMessage } from './utils.js';
import { closeEditorWindow } from './close-popup.js';

const URL_PATH = 'https://25.javascript.pages.academy/kekstagram';
const uploadSubmit = document.querySelector('#upload-submit');

const getData = (onSuccess) => {
  fetch(
    `${URL_PATH}/data`,
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
    uploadSubmit.setAttribute('disabled', true);
    evt.preventDefault();


    const formData = new FormData(evt.target);

    fetch(
      URL_PATH,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess(getSuccessMessage());
          uploadSubmit.setAttribute('disabled', false);
        } else {
          getErrorMessage();
        }
      },
      )
      .catch((err) => {
        closeEditorWindow();
        showAlert(err);
      });
  });
};

export { setUserFormSubmit, getData};
