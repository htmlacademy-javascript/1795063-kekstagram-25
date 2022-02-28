import { getRandomNumberFromRange } from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Дима',
  'Вика',
  'Артём',
  'Владимир',
  'Андрей',
  'Диана',
  'Анастасия',
  'Надежда',
  'Сергей',
  'Виктор',
  'Ирина',
  'Саша',
  'Мария',
];


const idMin = 1;
const idMax = 200;
const avatarIdMin = 1;
const avatarIdMax = 6;
const messageNumberMin = 1; //1
const messageNumberMax = 3; //3
const messageIndexMin = 0;
const messageIndexMax = 5;
const nameIndexMin = 0;
const nameIndexMax = 12;
const likesMin = 15;
const likesMax = 200;

const getPhotoComments = (index) => {
  const seconds = new Date().getTime();
  return {
    id: (index + getRandomNumberFromRange(idMin, idMax) + seconds),
    avatar: `img/avatar-${getRandomNumberFromRange(avatarIdMin, avatarIdMax)}.svg`,
    message: MESSAGES[getRandomNumberFromRange(messageIndexMin, messageIndexMax)],
    name: NAMES[getRandomNumberFromRange(nameIndexMin, nameIndexMax)],
  };
};

const getPhotoInfo = (index) => {
  const comments = new Array(getRandomNumberFromRange(messageNumberMin, messageNumberMax)).fill(null).map(() => getPhotoComments(index)); //item

  return {
    id: index+1,
    url: `photos/${index + 1}.jpg`,
    description: `Очень интересная фотография ${index + 1}!`,
    likes: getRandomNumberFromRange(likesMin, likesMax),
    comments,
  };
};

export { getPhotoInfo, getPhotoComments };
