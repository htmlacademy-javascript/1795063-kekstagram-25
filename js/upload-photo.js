import {onOpenEditor} from './open-editor.js';
import {imagePreview} from './open-editor.js';

const uploadButton = document.querySelector('#upload-file');

uploadButton.addEventListener('change', () => {
  const [file] = uploadButton.files;
  if (file) {
    imagePreview.src = URL.createObjectURL(file);
    onOpenEditor();
  }
});
