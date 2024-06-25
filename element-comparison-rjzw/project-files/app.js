import {
    renderTypes,
    // renderTypeInfo
    setupPageBasics
  } from './render-functions.js';
  import {
    getTypes,
    // getTypeInfo,
  } from './fetch-functions.js';

  export default async function app(appDiv) {
    const { columnLeft,columnRight,topSection,bottomSection, iconList } = setupPageBasics(appDiv);
    getTypes().then((arr) => renderTypes(iconList, arr))
    
  };