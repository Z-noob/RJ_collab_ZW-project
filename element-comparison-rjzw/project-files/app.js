import {
    renderTypes,
    renderTypeInfo,
    renderPokesImg,
    renderResult,
    setupPageBasics
  } from './render-functions.js';
  import {
    getTypes,
    getTypeInfo,
    gen4Poke,
    compareIcons
  } from './fetch-functions.js';

export default async function app(appDiv) {
  const {columnLeft, columnRight, rightIconList, leftIconList, rightPokePics, leftPokePics, dynamicForm, compareDiv } = 
  setupPageBasics(appDiv)
  const elemPlaceHolder = [];
  // (**)active with others to hv live compare icon change without clicking submit button
  // const currTypes = ["",""]; //(**)

  // ADDING POKEMON IMAGES ON 'VIEW POKEMON' CLICK
  columnLeft.addEventListener("click", (e) => {
    const viewButton = e.target
    if(viewButton.tagName === 'BUTTON' && viewButton.id === 'view') {
      if (columnLeft.contains(viewButton)) {
      gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(leftPokePics, obj)) 
      } else { gen4Poke(elemPlaceHolder).then((obj) => renderPokesImg(leftIconList, obj))}
    }
  })

  leftPokePics.addEventListener("click", (e) => {
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

  rightPokePics.addEventListener("click", (e) => {
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

  // RENDER ICONS ON LOAD
  getTypes().then((arr) => renderTypes(rightIconList, arr))
  getTypes().then((arr) => renderTypes(leftIconList, arr))


  // RENDER DAMAGE RELATIONS ON CLICK
  rightIconList.addEventListener("click", (e) => {
    e.preventDefault();
    rightPokePics.innerHTML = ""
    const button = e.target;
    const name = button.dataset.iconName;
    elemPlaceHolder.pop();
    elemPlaceHolder.push(`${name}`);
    getTypeInfo(name).then((relations) => {
      renderTypeInfo(columnRight,relations,(name.toUpperCase()));
      // FILL FORM WITH NECESSARY DATA
      const rightVar = relations.doubleDamFrom;
      const newVar = {name : name, array : rightVar}
      // currTypes[1] = newVar; //(**)
      // battle();  //(**)
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
    leftPokePics.innerHTML = ""
    const button = e.target
    const name = button.dataset.iconName;
    elemPlaceHolder.pop()
    elemPlaceHolder.push(`${name}`)
    getTypeInfo(name).then((relations) => {
      renderTypeInfo(columnLeft,relations,(name.toUpperCase()))
      // FILL FORM WITH NECESSARY DATA
      const leftVar = relations.doubleDamFrom;
      const newVar = {name : name, array : leftVar}
      // currTypes[0] = newVar; //(**)
      // battle();  //(**)
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

  //reacts to form submit 
  dynamicForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(dynamicForm)
      const Data = {
        left: formData.get('leftName'),
        right: formData.get('rightName'),
        leftArray: formData.get('leftWeakTo'),
        rightArray: formData.get('rightWeakTo')
      }
      console.log(Data);
      const { left, right, leftArray, rightArray } = Data;
    if (left && right && leftArray && rightArray) {
        if (leftArray.includes(right) && rightArray.includes(left)) {
          const iconEl = document.createElement('img');
          iconEl.src = 'https://www.svgrepo.com/show/19085/equals-symbol.svg'
          renderResult(compareDiv, iconEl);
        } else if (leftArray.includes(right) && !rightArray.includes(left)){
          const iconEl = document.createElement('img');
          iconEl.src = 'https://www.svgrepo.com/show/165906/left-arrow.svg'
          renderResult(compareDiv, iconEl);
        } else if (rightArray.includes(left) && !leftArray.includes(right)) {
          const iconEl = document.createElement('img');
          iconEl.src = 'https://www.svgrepo.com/show/70478/right-arrow.svg'
          renderResult(compareDiv, iconEl);
        } else {
          const iconEl = document.createElement('img');
          iconEl.src = 'https://www.svgrepo.com/show/19085/equals-symbol.svg'
          renderResult(compareDiv, iconEl);
        }
    }
  })

/* //(**)
const battle = () => {
  if(currTypes[0] !== "" && currTypes[1] !== "") {
    if (currTypes[0].array.includes(currTypes[1].name)) {
       renderResult(compareDiv, compareIcons.pointLeft)
    } else if (currTypes[1].array.includes(currTypes[0].name)) {
       renderResult(compareDiv, compareIcons.pointRight)
    } else if (currTypes[1].array.includes(currTypes[0].name) && currTypes[0].array.includes(currTypes[1].name)) {
       renderResult(compareDiv, compareIcons.equal)
    } else {
        renderResult(compareDiv, compareIcons.equal)
    }
  } 
*/ //(**)

};