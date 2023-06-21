var express = require("express");
var router = express.Router();

// [
//   {
//     "name": "Pizza",
//     "instructions": ["Cook first bro"],
//     "ingredients": ["Potato"]
//   }
// ]

const recipes = [
  {
    name: "Pizza",
    instructions: ["Cook first", "Then serve"],
    ingredients: ["Cheese", "Tomatoes", "Basil"],
  },
];

router.get("/:food", function (req, res) {
  console.log(req.params.food);
  const getFood = recipes.find((food) => food.name === req.params.food);
  console.log(getFood);
  res.send(getFood);
});

router.post("/", (req, res) => {
  recipes.push(req.body);
  const getFood = recipes.find((food) => food.name === req.body.name);

  if (getFood) {
    res.json(getFood);
    console.log("Works");
  } else {
    res.send(req.body);
  }
});

module.exports = router;
