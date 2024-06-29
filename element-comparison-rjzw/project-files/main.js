// import './style.css'
import {
    renderTypes,
    renderTypeInfo,
    renderPokesImg,
  } from './render-functions.js';
  import {
    getTypes,
    getTypeInfo,
    gen4Poke,
    compareIcons
  } from './fetch-functions.js';
import app from './app.js'

const appDiv = document.querySelector('#app');

app(appDiv);


