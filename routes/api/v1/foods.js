var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
pry = require('pryjs')

// GET all foods
router.get("/", function(req, res) {
  Food.findAll({
    attributes: ['id', 'name', 'calories']
  })
    .then(foods => {
      if (foods.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(foods));
      }
      else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: 'No food in database'}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
});

// GET food by id
router.get("/:id", function(req, res) {
  Food.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'calories']
  })
    .then(food => {
      if (food != null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(food));
      }
      else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: 'Food does not exist in database'}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
});

// DELETE food by id
router.delete("/:id", function(req, res) {
  Food.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(food => {
    if (food === 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({ message: 'Food does not exist in database'}));
    }
    else {
      res.setHeader("Content-Type", "application/json");
      res.status(204).send({ food });
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
});

// POST food
router.post('/', function(req, res) {
  if (req.body.name && req.body.calories)
    {Food.create( {
      name: req.body.name,
      calories: req.body.calories
    })
    .then(food => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(food));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });}
  else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify("You need to specify name and calories"))
  }
});

module.exports = router;
