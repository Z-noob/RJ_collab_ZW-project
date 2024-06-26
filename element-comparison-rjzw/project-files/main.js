import './style.css'
import {
    renderTypes,
    renderTypeInfo,
    renderPokesImg,
  } from './render-functions.js';
  import {
    getTypes,
    getType,
    gen4Poke,
  } from './fetch-functions.js';
import app from './app'

const appDiv = document.querySelector('#app');

app(appDiv);


