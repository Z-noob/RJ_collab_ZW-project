import {

    renderTypes,
    renderTypeInfo,
    renderPokesImg,
    setupPageBasics
  } from './render-functions.js';
  import {
    getTypes,
    getType,
    gen4Poke,
  } from './fetch-functions.js';

  export default async function app(appDiv) {
    const { topSection, bottomSection, columnLeft, columnRight, iconList} = 
    setupPageBasics(appDiv)

    // pokeDiv(statusDiv)
    gen4Poke("water").then((obj) => renderPokesImg(statusDiv, obj))

    // const genActive = parentEl.querySelector('#view')
    // genActive.addEventListener("click", (e) => {
    //   const viewButton = e.target
    //   if(imgButton.tagName === 'BUTTON' && imgButton.id === 'view') {
    //     gen4Poke().then((obj) => renderPokesImg(statusDiv, obj))
    //   }
    // })

    // statusDiv.addEventListener("click", (e) => {
    //   const imgButton = e.target
    //   if(imgButton.tagName === 'BUTTON') {
    //     const poke = imgButton.id
    //     poke[0].toUpperCase()
    //     const urlToOpen = `https://bulbapedia.bulbagarden.net/wiki/${poke}_(Pokémon)`;
    //     // https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pokémon)
    //     window.open(urlToOpen, '_blank');
    //   }
    // })
    getTypes().then((arr) => renderTypes(iconList, arr))
    iconList.addEventListener("click", (e) => {
      e.preventDefault();
      const button = e.target
      const name = button.dataset.iconName;
      getTypeInfo(name).then((relations) => renderTypeInfo(columnLeft,relations,(name.toUpperCase())));
    });
  };