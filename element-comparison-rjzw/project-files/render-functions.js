export const setupPageBasics = (parentEl) => {
    parentEl.innerHTML = `

    <header>
        <h1>Element Compare</h1>
    </header>
    <div class="top-section">
        <h3>Choose Two:</h3>
        <div class="images"></div>
    </div>
    <div class="bottom-section">
        <div class="column">
            <div
        </div>
    </div>
    <div id="test"></div>
    `;

    const statusDiv = parentEl.querySelector('#test');
    const usersUl = parentEl.querySelector('#users-list');
    const postsUl = parentEl.querySelector('#posts-list');
    const newUserForm = parentEl.querySelector('#new-user-form');
    const newUserDiv = parentEl.querySelector('#new-user');


    return { statusDiv, usersUl, postsUl, newUserForm, newUserDiv };
}
export const renderTypes = (typesDiv, arr) => {
    let htmlContent = ''
    for (const type of arr){
        htmlContent.innerHTML += `<img src="${type.icon}" alt="Element Icon">`;
    }
    typesDiv.innerHTML = htmlContent;
}

import './style.css'
import {
  getTypes,
  // getType,
  gen4Poke,
} from './fetch-functions.js';

console.log(gen4Poke('water'))

export const viewButton = (pokeDiv) => {
    const viewElem = document.createElement("button")
    buttonElem.id = `view`
    viewElem.textContent = "View Pokémons"

    pokeDiv.append(viewElem)
}

export const renderPokesImg = (pokeDiv, obj) => {

    let index = 0

        console.log("Data:", obj)
        obj.pokeUrl.forEach((id)=> {
        const buttonElem = document.createElement("button")
        const imgElem = document.createElement("img")
        
        imgElem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        buttonElem.setAttribute("type", "button");
        buttonElem.setAttribute("target", "_blank");
        buttonElem.id = `${obj.names[index]}`
        console.log(imgElem.src)
        console.log(obj.names[index])

        index +=1

        buttonElem.append(imgElem)
        pokeDiv.append(buttonElem)
        })
};






