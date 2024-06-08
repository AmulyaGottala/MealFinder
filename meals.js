document.addEventListener("DOMContentLoaded", () => {
  const selectedCategory = localStorage.getItem("selectedCategory");
  const categoryDescription = localStorage.getItem("categoryDescription");
  displayCategoryDescription(categoryDescription, selectedCategory);
  fetchMeals(selectedCategory);
});

async function fetchMeals(category) {
  try {
    const mealResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const mealData = await mealResponse.json();
    displayMeals(mealData.meals);
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function displayCategoryDescription(description, selectedCategory) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class", "category-description");
  descriptionDiv.innerHTML = `
  <div class="description">
 <h3>${selectedCategory}</h3>
  <p >${description}</p>
  </div>
  <div class="meal-heading">
  <h3>MEALS</h3>
  <hr/>
  </div>`;
  const mealsContainer = document.getElementById("meals-container");
  console.log(mealsContainer);

  mealsContainer.insertBefore(descriptionDiv, mealsContainer.firstChild);
}

function displayMeals(meals) {
  const mealsDiv = document.getElementById("meals-container");
  meals.forEach((meal) => {
    const mealElement = document.createElement("div");
    mealElement.setAttribute("class", "meal-item");
    mealElement.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <span class="meal">${meal.strMeal}</span>
      `;
    mealsDiv.appendChild(mealElement);
  });
}

const sideMenu = document.querySelector(".side-menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".x-mark");

hamburgerIcon.addEventListener("mouseover", function () {
  sideMenu.style.display = "block";
});

closeIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
});
