export const setupPageBasics = (parentEl) => {
    parentEl.innerHTML = `
    <header>
        <h1>Element Compare</h1>
    </header>
    <section class="top-section">
        <h2>Choose Two:</h2>
        <ul class="images"></ul>
    </section>
    <section class="bottom-section">
        <div class="column" id="left"></div>
        <div class="column" id="right"></div>
    </section>
    `;

    const topSection = parentEl.querySelector('.top-section');
    const bottomSection = parentEl.querySelector('.bottom-section');
    const iconList = topSection.querySelector("ul")
    const columnLeft = bottomSection.querySelector('#left')
    const columnRight = bottomSection.querySelector('#right')
    return { topSection, bottomSection, columnLeft, columnRight, iconList};
}

// Render icons on page load
export const renderTypes = (typesDiv, arr) => {
    let htmlContent = ''
    for (const type of arr){
        htmlContent += `
        <li>
            <img data-icon-name="${type.name}" src="${type.icon}" alt="Element Icon"></img>
        </li>`
    }
    typesDiv.innerHTML = htmlContent;
}

// Render type damage relations on icon click
export const renderTypeInfo = (relationsDiv, obj, str) => {
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
    <p>${str}</p>
    <p>Outgoing Damage -</p>
    <p>Effective: ${p1}</p>
    <p>Ineffective: ${p2}</p>
    <p>Incoming Damage - </p>
    <p>Effective: ${p3}</p>
    <p>Ineffective: ${p4}</p>
    <button> View Pokemon </button>
    `;
};