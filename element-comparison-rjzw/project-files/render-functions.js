export const setupPageBasics = (parentEl) => {
    parentEl.innerHTML = `
    <header>
        <h1>Element Compare</h1>
    </header>
    <section class="top-section">
        <h2>Choose Two:</h2>
    </section>
    <section class="bottom-section">
        <div class="column">
            <ul class="leftImages"></ul>
            <div id="leftRelations"></div>
            <div class="leftPokePics"></div>
        </div> 

        <div class="column">
            <ul class="rightImages"></ul>
            <div id="rightRelations"></div>
            <div class="rightPokePics" ></div>
            </div>
        </section>
        <button type="submit" id="submit-button">Lets Battle!</button>
    `;

    const bottomSection = parentEl.querySelector('.bottom-section');
    const leftIconList = bottomSection.querySelector("ul.leftImages");
    const rightIconList = bottomSection.querySelector("ul.rightImages")
    const columnLeft = bottomSection.querySelector('#leftRelations')
    const columnRight = bottomSection.querySelector('#rightRelations')
    const leftPokePics = bottomSection.querySelector('.leftPokePics')
    const rightPokePics = bottomSection.querySelector('.rightPokePics')
    return { columnLeft, columnRight, rightIconList, leftIconList, rightPokePics,leftPokePics};
}

// Render icons on page load
export const renderTypes = (typesDiv, arr) => {
    let htmlContent = ''
    for (const type of arr){
        htmlContent += `
        <li>
            <img id="iconsList" data-icon-name="${type.name}" src="${type.icon}" alt="Element Icon"></img>
        </li>`
    }
    typesDiv.innerHTML = htmlContent;
}

export const renderPokesImg = (pokeDiv, obj) => {
    pokeDiv.innerHTML = '';
    const divElem = document.createElement("div")
    divElem.innerHTML = "";

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
        divElem.append(buttonElem)
        })

        pokeDiv.append(divElem)
};

// Render type damage relations on icon click
export const renderTypeInfo = (relationsDiv, obj, str) => {
    relationsDiv.innerHTML = "";
    let doubleDamFromStr = '', doubleDamToStr = '', halfDamToStr = '', halfDamFromStr = '';
    for(const key in obj){
        if (key === "doubleDamTo"){
            doubleDamToStr += obj[key].join(", ")
        } else if (key === "doubleDamFrom") {
            doubleDamFromStr += obj[key].join(", ")
        } else if (key === "halfDamFrom") {
            halfDamFromStr += obj[key].join(", ")
        } else if (key === "halfDamTo") {
            halfDamToStr += obj[key].join(", ")
        };
    };
    const p1 = doubleDamToStr, p2 = halfDamToStr, p3 = doubleDamFromStr, p4 = halfDamFromStr;
    relationsDiv.innerHTML = `
    <img src="${obj.icon}" alt="${str} icon"></img>
    <p>${str}</p>
    <p>Outgoing Damage -</p>
    <p>Super Effective: ${p1}</p>
    <p>Ineffective: ${p2}</p>
    <p>Incoming Damage - </p>
    <p>Super Effective: ${p3}</p>
    <p>Ineffective: ${p4}</p>
    <button id="view"> View Pokemon </button>
    `;
};

