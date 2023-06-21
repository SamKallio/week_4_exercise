if (document.readyState !== "loading") {
  console.log("Document is ready");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after waiting!");
  });
}

let ingredientsList = [];
let instructionsList = [];

const inputName = document.getElementById("name-text");
const inputImage = document.getElementById("image-input");
const ingredientButton = document.getElementById("add-ingredient");
const instructionButton = document.getElementById("add-instruction");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", submitRecipe);
ingredientButton.addEventListener("click", addIngredient);
instructionButton.addEventListener("click", addInstruction);

function addIngredient() {
  const ingredientText = document.getElementById("ingredients-text");
  ingredientsList.push(ingredientText.value);
  console.log("Current ingredients: " + ingredientsList);
}

function addInstruction() {
  const instructionsText = document.getElementById("instructions-text");
  instructionsList.push(instructionsText.value);
  console.log("Current instructions: " + instructionsList);
}

function submitRecipe() {
  if (inputImage.value) {
    let newForm = new FormData();
    for (let index = 0; index < inputImage.files.length; index++) {
      newForm.append("images", inputImage.files[index]);
      console.log(newForm);
    }

    //Submit image if there is image
    fetch("http://localhost:3000/images", {
      method: "POST",
      body: newForm,
    })
      .then((response) => response.text())
      .then((data) => console.log(data));
  }

  if (
    ingredientsList.length < 1 ||
    instructionsList.length < 1 ||
    inputName.value === ""
  ) {
    console.log("You haven't filled all the fields yet");
    return;
  }
  const newRecipe = {
    name: inputName.value,
    ingredients: ingredientsList,
    instructions: instructionsList,
  };

  fetch("http://localhost:3000/recipe/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        displayRecipe(data);
      } else {
        console.log("Something went wrong when trying to fetch recipe!");
      }
    });

  clearFields();
}

function initializeCode() {
  const clearImages = document.getElementById("image-input");
  clearImages.value = "";
}

function displayRecipe(recipe) {
  const recipeName = document.createElement("h1");
  const ingredientTitle = document.createElement("h4");
  const recipeIngredients = document.createElement("ul");
  const instructionTitle = document.createElement("h4");
  const recipeInstructions = document.createElement("ul");
  const viewRecipe = document.getElementById("view-recipe");

  viewRecipe.textContent = "";

  recipeInstructions.style.listStyle = "decimal";

  recipeName.innerText = recipe.name;
  ingredientTitle.innerText = "Ingredients";
  instructionTitle.innerText = "Instructions";

  viewRecipe.append(recipeName);
  viewRecipe.append(ingredientTitle);
  viewRecipe.append(recipeIngredients);
  viewRecipe.append(instructionTitle);
  viewRecipe.append(recipeInstructions);

  for (let index = 0; index < recipe.instructions.length; index++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(recipe.instructions[index]));
    recipeInstructions.appendChild(li);
    li.style.listStyle = "decimal";
  }
  for (let index = 0; index < recipe.ingredients.length; index++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(recipe.ingredients[index]));
    recipeIngredients.appendChild(li);
  }
}

function clearFields() {
  //Clears lists
  instructionsList = [];
  ingredientsList = [];

  //Clear name
  inputName.value = "";

  //Clear textareas
  const textBoxes = document.querySelectorAll("textarea");
  textBoxes.forEach((element) => {
    element.value = "";
  });
}
