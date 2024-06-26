import './style.css'
import {
  getTypes,
  getTypeInfo,
} from './fetch-functions.js';
import {
  renderTypes,
  renderTypeInfo
} from './render-functions.js';
import app from './app'

const appDiv = document.querySelector('#app');
app(appDiv);