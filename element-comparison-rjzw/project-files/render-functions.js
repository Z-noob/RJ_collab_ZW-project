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
    `;

    const statusDiv = parentEl.querySelector('#status');
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
