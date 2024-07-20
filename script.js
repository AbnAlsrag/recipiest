const viewport = document.getElementById("viewport");
const recipies_nav = document.getElementById("recipies-nav");
const create_recipe_btn = document.getElementById("create-recipe-btn");
const recipies_links = document.getElementsByClassName("recipe-link");
const recipe_name = document.getElementById("recipe_name");
const recipe_data = document.getElementById("recipe_data");

let recipies = JSON.parse(localStorage.getItem("recipies"));

if (recipies == null) {
    recipies = [];
}

for (let i = 0; i < recipies.length; i++) {
    recipies_nav.innerHTML += `<a class="recipe-link" data-id="${i} style="margin-right: 10px;">  ${recipies[i][0]}  </a>`;
}


for (let i = 0; i < recipies_links.length; i++) {
    recipies_links[i].onclick = function() {
        const self = recipies_links[i];
        viewport.innerHTML = `
            <button id="delete-btn">Delete</button>
            <button id="edit-btn">Edit</button>
            <h1>${recipies[i][0]}</h1>
            ${recipies[i][1]}`;
            
        const delete_btn = viewport.querySelector("#delete-btn");
        delete_btn.onclick = function() {
            recipies.splice(i, 1);

            localStorage.setItem("recipies", JSON.stringify(recipies));

            location.reload();
        };

        const edit_btn = viewport.querySelector("#edit-btn");
        edit_btn.onclick = function() {
            viewport.innerHTML = `
                <button id="confirm-btn">Confirm</button>
                <input type="text" name="" id="recipe_name">
                <textarea name="" id="recipe_data"></textarea>
            `;

            const confirm_btn = viewport.querySelector("#confirm-btn");
            const edit_recipe_name = viewport.querySelector("#recipe_name");
            const edit_recipe_data = viewport.querySelector("#recipe_data");

            edit_recipe_name.value = recipies[i][0];
            edit_recipe_data.value = recipies[i][1];

            confirm_btn.onclick = function() {
                recipies[i] = [edit_recipe_name.value, edit_recipe_data.value];

                localStorage.setItem("recipies", JSON.stringify(recipies));

                location.reload();
            };
        };
    };
}

create_recipe_btn.onclick = function() {
    let recipe = [recipe_name.value, recipe_data.value];

    recipies.push(recipe);

    localStorage.setItem("recipies", JSON.stringify(recipies));

    location.reload();
};