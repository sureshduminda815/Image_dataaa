// import controllers review, products
const productController = require('../controllers/productController.js')
const vacancyController = require("../controllers/vacancyController.js");


// router
const router = require('express').Router()
const path = require('path');
const express = require('express');
// use routers
router.post('/addProduct', productController.upload, productController.addProduct)
router.delete('/delete/:id',productController.deleteProduct)
router.post('/login', productController.login)
router.get('/allProducts', productController.getAllProducts)
router.post('/signUp', productController.signUp)
router.post('/chat', productController.chat)
router.get('/published', productController.getPublishedProduct)
router.get('/sent', productController.sent)
router.use('/images', express.static(path.join(__dirname, '../Images')));
router.get('/getPricing', productController.getPricing);




//////////////////////////////////////////////////////////////



// Create a new vacancy
router.post("/", vacancyController.create);

// Retrieve all vacancies
router.get("/", vacancyController.findAllin);

// Update a vacancy by ID
router.put("/:id", vacancyController.updated);

// Delete a vacancy by ID
router.delete("/:id", vacancyController.deleted);

/////////////////////////////////////////////////////////////



router.post("/image", productController.upload, productController.create);
router.get("/image", productController.findAll);
router.put("/image/:id", productController.update);
router.delete("/image/:id", productController.deleted);




router.put('/editPricing/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the plan ID from the URL
    const updatedPlan = req.body; // Get the updated plan data from the request body

    // Find the plan by ID and update it
    const [updated] = await db.pricings.update(updatedPlan, {
      where: { id },
    });

    if (updated) {
      const updatedPlanData = await db.pricings.findByPk(id);
      res.status(200).json({ message: 'Plan updated successfully', data: updatedPlanData });
    } else {
      res.status(404).json({ message: 'Plan not found' });
    }
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// const fs = require('fs');
// const db = require('../models/index.js');
// router.get('/images', (req, res) => {
//   console.log("_______________________________")
//   const filepath = path.join(__dirname, '../Images');
//   if (fs.existsSync(filepath)) {
//     res.sendFile(filepath)
//   }







// Products router
router.get('/:id', productController.getOneProduct)




module.exports = router