import {
    // renderTypes,
    // renderType
  } from './render-functions.js';
  import {
    // getTypes,
    // getType,
  } from './fetch-functions.js';

  export default async function app(appDiv) {
    const bookListEl = document.createElement('header');
    bookListEl.id = 'book-list';
    appDiv.append(bookListEl);
  
    const authorInfoEl = document.createElement('div');
    authorInfoEl.id = 'author-info';
    appDiv.append(authorInfoEl);
  
    const newUserEl = document.createElement('div');
    newUserEl.id = 'new-user';
    appDiv.append(newUserEl);
  
    const newUserFormEl = document.createElement('form');
    newUserFormEl.id = 'new-user-form';
    appDiv.append(newUserFormEl);
  };