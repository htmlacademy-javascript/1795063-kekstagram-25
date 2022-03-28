import { getRandomNumberFromRange } from './utils.js';
import { getMiniatures } from './get-miniatures.js';
import { debounce } from './utils/debounce.js';

const sortImgForm = document.querySelector('.img-filters__form');
const filters = document.querySelectorAll('.img-filters__button');
const TIMEOUT_DELAY = 500;

const removeAllPics = () => {
  const picturesContainer = document.querySelectorAll('.picture');
  picturesContainer.forEach((element) => element.remove());
};

const getRandomPhotos = (data) => {
  const randomPhotosId = new Array;
  while (randomPhotosId.length < 10) {
    const filter = getRandomNumberFromRange(0, (data.length - 1));
    if (randomPhotosId.includes(filter) === false) {
      randomPhotosId.push(filter);
    }
  }
  const randomPhotos = new Array;
  randomPhotosId.forEach((element) => {
    randomPhotos.push(data[element]);
  });
  getMiniatures(randomPhotos);
};

const getDiscussedPhotos = (data) => {
  getMiniatures(data
    .slice()
    .sort((a,b) => a.comments.length - b.comments.length).reverse());
};

const onFilterChange = (filterId, data) => {
  if (filterId === 'filter-random') {
    removeAllPics();
    getRandomPhotos(data);
  } else if (filterId === 'filter-discussed') {
    removeAllPics();
    getDiscussedPhotos(data);
  } else {
    removeAllPics();
    getMiniatures(data);
  }
};

const changeActiveFilter = (chosenFilter) => {
  filters.forEach((element) => {
    if (element.classList.contains('img-filters__button--active')) {
      element.classList.remove('img-filters__button--active');
    }
  });
  document.querySelector(`#${chosenFilter}`).classList.add('img-filters__button--active');
};

const sortImgs = (data) => {
  const handleChange = debounce((evt) => {
    onFilterChange(evt.target.id, data);
  }, TIMEOUT_DELAY);

  sortImgForm.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target.id);
    handleChange(evt);
  });
};

export { sortImgs };
