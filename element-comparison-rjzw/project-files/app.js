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
  const {columnLeft, columnRight, rightIconList, leftIconList, rightPokePics, leftPokePics, dynamicForm} = 
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


  // RENDER DAMAGE RELATIONS ON CLICK
  rightIconList.addEventListener("click", (e) => {
    e.preventDefault();
    const button = e.target;
    const name = button.dataset.iconName;
    elemPlaceHolder.pop();
    elemPlaceHolder.push(`${name}`);
    getTypeInfo(name).then((relations) => {
      renderTypeInfo(columnRight,relations,(name.toUpperCase()));

      // FILL FORM WITH NECESSARY DATA
      const rightVar = relations.doubleDamFrom;
      const newVar = {name : name, array : rightVar}
      let rightNameInput = dynamicForm.querySelector('input[name="rightName"]');
      let rightWeakToInput = dynamicForm.querySelector('input[name="rightWeakTo"]');
      if (!rightNameInput) {
        rightNameInput = document.createElement('input');
        rightNameInput.type = 'hidden';
        rightNameInput.name = 'rightName';
        dynamicForm.appendChild(rightNameInput);
      };
      if (!rightWeakToInput) {
        rightWeakToInput = document.createElement('input');
        rightWeakToInput.type = 'hidden';
        rightWeakToInput.name = 'rightWeakTo';
        dynamicForm.appendChild(rightWeakToInput);
      };
      rightNameInput.value = newVar.name;
      rightWeakToInput.value = newVar.array; // No need to JSON.stringify
      rightNameInput.required = true;
      rightWeakToInput.required = true;
    });
  });

  leftIconList.addEventListener("click", (e) => {
    e.preventDefault();
    const button = e.target
    const name = button.dataset.iconName;
    elemPlaceHolder.pop()
    elemPlaceHolder.push(`${name}`)
    getTypeInfo(name).then((relations) => {
      renderTypeInfo(columnLeft,relations,(name.toUpperCase()))

      // FILL FORM WITH NECESSARY DATA
      const leftVar = relations.doubleDamFrom;
      const newVar = {name : name, array : leftVar}
      let leftNameInput = dynamicForm.querySelector('input[name="leftName"]');
      let leftWeakToInput = dynamicForm.querySelector('input[name="leftWeakTo"]');
      if (!leftNameInput) {
        leftNameInput = document.createElement('input');
        leftNameInput.type = 'hidden';
        leftNameInput.name = 'leftName';
        dynamicForm.appendChild(leftNameInput);
      };
      if (!leftWeakToInput) {
        leftWeakToInput = document.createElement('input');
        leftWeakToInput.type = 'hidden';
        leftWeakToInput.name = 'leftWeakTo';
        dynamicForm.appendChild(leftWeakToInput);
      };
      leftNameInput.value = newVar.name;
      leftWeakToInput.value = newVar.array; // No need to JSON.stringify
      leftNameInput.required = true;
      leftWeakToInput.required = true;
    });
  });
};