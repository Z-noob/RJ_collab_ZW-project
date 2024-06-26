import './style.css'
import {
  getTypes,
  // getType,
  gen4Poke
} from './fetch-functions.js';
import {
  renderTypes,
  // renderType,
  renderPokesImg,
  viewButton
} from './render-functions.js';
import app from './app'

const appDiv = document.querySelector('#app');
app(appDiv);

// getTypes();
