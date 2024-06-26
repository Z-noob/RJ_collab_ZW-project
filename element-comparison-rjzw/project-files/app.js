import {

    renderTypes,
    renderTypeInfo,
    renderPokesImg,
    setupPageBasics
  } from './render-functions.js';
  import {
    getTypes,
    getTypeInfo,
    gen4Poke,
  } from './fetch-functions.js';

  export default async function app(appDiv) {
    const { topSection, bottomSection, columnLeft, columnRight, iconList, pokePics} = 
    setupPageBasics(appDiv)
    const elemPlaceHolder = [];

    bottomSection.addEventListener("click", (e) => {
      const viewButton = e.target
      if(viewButton.tagName === 'BUTTON' && viewButton.id === 'view') {
        if (columnLeft.contains(viewButton)) {
        gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(pokePics, obj)) 
       } else { gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(pokePics, obj))}
      }
    })

    bottomSection.addEventListener("click", (e) => {
      const imgButton = e.target
      if(imgButton.tagName === 'IMG' & imgButton.id !== 'view') {
        const button = imgButton.parentNode
        const poke = button.id
        poke[0].toUpperCase()
        const urlToOpen = `https://bulbapedia.bulbagarden.net/wiki/${poke}_(Pokémon)`;
        // https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pokémon)
        window.open(urlToOpen, '_blank');
      }
    })

    getTypes().then((arr) => renderTypes(iconList, arr))
    iconList.addEventListener("click", (e) => {
      e.preventDefault();
      const button = e.target
      const name = button.dataset.iconName;
      elemPlaceHolder.pop()
      elemPlaceHolder.push(`${name}`)
      getTypeInfo(name).then((relations) => renderTypeInfo(columnLeft,relations,(name.toUpperCase())));
    });
  };