import {onOpenEditor} from './open-editor.js';

const uploadButton = document.querySelector('#upload-file');

uploadButton.addEventListener('change', onOpenEditor);
