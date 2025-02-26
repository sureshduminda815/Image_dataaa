const { log } = require("console");
const db = require("../models");
const Vacancy = db.vacancies;

// Add a new vacancy
const create = (req, res) => {

  console.log("_-------------");
  if (!req.body.text) {
    res.status(400).send({ message: "Text cannot be empty!" });
    return;
  }

  const vacancy = {
    text: req.body.text,
  };

  Vacancy.create(vacancy)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating vacancy.",
      });
    });
};

// Get all vacancies
const findAllin = (req, res) => {

  console.log("=+++++++++++++++++++++==================");
  
  Vacancy.findAll({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving vacancies.",
      });
    });
};

// Update a vacancy
const updated = (req, res) => {
  const id = req.params.id;

  Vacancy.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vacancy updated successfully." });
      } else {
        res.send({ message: `Cannot update vacancy with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating vacancy with id=${id}.`,
      });
    });
};

// Delete a vacancy
const deleted = (req, res) => {
  const id = req.params.id;

  Vacancy.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Vacancy deleted successfully." });
      } else {
        res.send({ message: `Cannot delete vacancy with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting vacancy with id=${id}.`,
      });
    });
};


module.exports = {
  deleted, updated,findAllin,create
 

}