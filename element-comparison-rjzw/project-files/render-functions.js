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
export const renderTypes = (typesDiv, arr) => {
    let htmlContent = ''
    for (const type of arr){
        htmlContent += `
        <li>
            <img src="${type.icon}" alt="Element Icon"></img>
        </li>`
    }
    typesDiv.innerHTML = htmlContent;
}


// export const renderTypeInfo = ()