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
    const {columnLeft, columnRight, rightIconList, leftIconList, rightPokePics, leftPokePics} = 
    setupPageBasics(appDiv)

    const elemPlaceHolder = [];
    // const sectionButton = bottomSection.querySelector("button")


    // ADDING POKEMON IMAGES ON 'VIEW POKEMON' CLICK
    columnLeft.addEventListener("click", (e) => {
      const viewButton = e.target
      if(viewButton.tagName === 'BUTTON' && viewButton.id === 'view') {
        if (columnLeft.contains(viewButton)) {
        gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(leftPokePics, obj)) 
       } else { gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(leftIconList, obj))}
      }
    })

    columnLeft.addEventListener("click", (e) => {
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
    columnRight.addEventListener("click", (e) => {
      const viewButton = e.target
      if(viewButton.tagName === 'BUTTON' && viewButton.id === 'view') {
        if (columnRight.contains(viewButton)) {
        gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(rightPokePics, obj)) 
       } else { gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(rightPokePics, obj))}
      }
    })

    columnRight.addEventListener("click", (e) => {
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



    // RENDER ICONS ON LOAD
    getTypes().then((arr) => renderTypes(rightIconList, arr))
    getTypes().then((arr) => renderTypes(leftIconList, arr))
    // Render Damage Info on click
    rightIconList.addEventListener("click", (e) => {
      e.preventDefault();
      const button = e.target
      const name = button.dataset.iconName;
      elemPlaceHolder.pop()
      elemPlaceHolder.push(`${name}`)
      getTypeInfo(name).then((relations) => {
        renderTypeInfo(columnRight,relations,(name.toUpperCase()))
        const leftVar = relations.doubleDamFrom
        console.log(leftVar)
      });
    });

    leftIconList.addEventListener("click", (e) => {
      e.preventDefault();
      const button = e.target
      const name = button.dataset.iconName;
      elemPlaceHolder.pop()
      elemPlaceHolder.push(`${name}`)
      getTypeInfo(name).then((relations) => renderTypeInfo(columnLeft,relations,(name.toUpperCase())));
    });
  };