const sideMenu = document.querySelector(".side-menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".x-mark");

hamburgerIcon.addEventListener("mouseover", function () {
  sideMenu.style.display = "block";
});

closeIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
});

const categoryUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

async function fetchCategories() {
  try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function displayCategories(categories) {
  const categoriesDiv = document.getElementById("category-container");
  categories.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.setAttribute("class", "category-item");
    categoryElement.innerHTML = `
      <img src="${category.strCategoryThumb}" alt="${category.strCategory}" data-category="${category.strCategory}">
      <span class="category">${category.strCategory}</span>
    `;

    categoriesDiv.appendChild(categoryElement);

    categoryElement.addEventListener("click", function () {
      localStorage.setItem("selectedCategory", category.strCategory);
      localStorage.setItem(
        "categoryDescription",
        category.strCategoryDescription
      );
      window.location.href = "meals.html";
    });
  });
}

fetchCategories();
