import './style.css'
import {
  getTypes,
  // getType,
} from './fetch-functions.js';
import {
  renderTypes,
  // renderType
} from './render-functions.js';
import app from './app'

const appDiv = document.querySelector('#app');
app(appDiv);

// getTypes();