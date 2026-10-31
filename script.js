    const spinner = document.querySelector(".spinner");
    const searchBox = document.querySelector(".searchBox");
    const searchBtn = document.querySelector(".searchBtn");
    const recipeContainer = document.querySelector(".recipe-container");
    const recipeDetailsContent= document.querySelector(".recipe-details-content");
    const recipeCloseBtn= document.querySelector(".recipe-close-btn");
    const favoriteRecipeContainer = document.querySelector(".favorite-recipes-container");
    const favoriteBtn = document.querySelector(".favorite");
    const favoritePopup = document.querySelector(".favorite-popup");
    const favoritePopupCloseBtn = document.querySelector(".favorite-popup-close-btn");
    

    const hidespinner=()=>{
        spinner.style.display = "none";
    };
    const showspinner=()=>{
        spinner.style.display = "block";
    };

    const fetchRecipe = async (query) => {
        showspinner();
        recipeContainer.innerHTML = '<h2>Fetching recipe...</h2>';
        try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
       // console.log(response);
        hidespinner();
        if(response.meals){
            recipeContainer.innerHTML = '';
            response.meals.forEach((meal) => {

            const recipeDiv = document.createElement("div");

            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h3>${meal.strMeal}</h3>

            <p><span>${meal.strArea}</span></p>
            
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            `;
            const favoriteBtn = document.createElement("button");
            favoriteBtn.textContent = "Add to Favorites";
            favoriteBtn.classList.add("colorful-button");
            recipeDiv.appendChild(favoriteBtn);

            const button = document.createElement("button");
            button.textContent = "View Recipe";
            button.classList.add("colorful-button");
            recipeDiv.appendChild(button);
            
            button.addEventListener("click", () => {openRecipePopup(meal)});
            favoriteBtn.addEventListener("click", () => {saveToFavorites(meal)});
            recipeContainer.appendChild(recipeDiv);
        

            recipeContainer.appendChild(recipeDiv);
            });
        }
        else{
            recipeContainer.innerHTML = "<h2>No recipe found.</h2>";
        }
    } catch (error) {
        hidespinner();
        recipeContainer.innerHTML = "<h2>Error fetching recipe. Please try again later.</h2>";
        console.error("Error fetching recipe:", error);
    }
};


    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const searchInput = searchBox.value.trim();
        if (searchInput) {
            fetchRecipe(searchInput);
        }
        else {
            recipeContainer.innerHTML = "<h2>Please enter a search term.</h2>";
        }   

    });

    const openRecipePopup = (meal) => {
        const vedioId= meal.strYoutube.split('=')[1];
        const embedUrl = `https://www.youtube.com/embed/${vedioId}`;
        recipeDetailsContent.innerHTML = `
        <h2 class= "recipename">${meal.strMeal}</h2> 
        <h3>Ingredients</h3>
        <ul class="ingredientlist">${fetchIngredients(meal)}</ul> 
        <div id="imgset">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div id="insset">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        </div>
       <iframe id="videoset"  width="600" height="400" src="${embedUrl}"  frameborder="0" 
       allowfullscreen></iframe>
     `;
        recipeDetailsContent.parentElement.style.display = "block";
    };

const fetchIngredients = (meal) => {
    let ingredientList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;

        }
        else{
            break;
        }
    }
    return ingredientList;
};

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
const saveToFavorites = (meal) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(meal);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavoritesRecipes();
}

favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showFavoritePopup();

})
const showFavoritePopup = () => {
    favoritePopup.style.display = "block";

};

favoritePopupCloseBtn.addEventListener("click", () => {
    favoritePopup.style.display = "none";
});

const displayFavoritesRecipes = () => {
   favoriteRecipeContainer.innerHTML ='';
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // console.log(favorites);
    favorites.forEach((meal) => {
        const recipeDiv = document.createElement("div");

            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h3>${meal.strMeal}</h3>

            <p><span>${meal.strArea}</span></p>
            
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            `;

        const button1= document.createElement("button");
        button1.textContent = "View Recipe";
        button1.classList.add("colorful-button");
        recipeDiv.appendChild(button1);

        const button= document.createElement("button");
        button.textContent = "Remove from Favorites";
        button.classList.add("colorful-button");
        recipeDiv.appendChild(button);

        button1.addEventListener("click", () =>{
            openRecipePopup(meal)
            favoritePopup.style.display="none";
        });

        button.addEventListener("click", () => {
            removeFromFavorites(meal.idMeal);
        });
        favoriteRecipeContainer.appendChild(recipeDiv);
    });
};

const removeFromFavorites = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((meal) => meal.idMeal !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavoritesRecipes();
};

displayFavoritesRecipes();

    // login and signup form toggle
const loginpopup = document.getElementById("login-popup");
const signuppopup = document.getElementById("signup-popup");

const overlay = document.createElement('div')
overlay.classList.add('overlay')
document.body.appendChild(overlay)

window .onload=()=>{
    loginpopup.style.display = "block";
    overlay.style.display = "block";

};

const showsignup = document.getElementById("show-signup");
const showlogin = document.getElementById("show-login");

showsignup.addEventListener("click",()=>{
    loginpopup.style.display = "none";
    signuppopup.style.display = "block";

});

showlogin.addEventListener("click",()=>{
    signuppopup.style.display = "none";
    loginpopup.style.display = "block";

});

const loginform = document.getElementById("login-form");
const signupform = document.getElementById("signup-form");

    signupform.addEventListener("submit",(e)=>{
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user)=> user.username === username);
        if(existingUser){
            alert("Username already exists");
            return;
        }
        const user=[username,password];
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
            alert("Signup successful");
                signuppopup.style.display = "none";
                loginpopup.style.display = "block";
        });

    loginform.addEventListener("submit",(e)=>{
        e.preventDefault();

        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find((user)=> user[0] === username && user[1] === password);
        if(validUser){
            alert("Login successful");
            loginpopup.style.display = "none";
            overlay.style.display = "none";
        }else{
            alert("Invalid username or password");
            return;
        }
    });