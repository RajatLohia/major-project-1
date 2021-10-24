const express = require('express');

const router= express.Router();
const homeController = require('../controllers/home_controller');

// router.get('/',homeController.auth);
router.use('/users',require('./users'));
//to load the basic page of our app
router.get('/',homeController.auth);
router.get('/home',homeController.home);
//route for creating a task
router.post('/create-todo', homeController.createe);
router.post('/create-category', homeController.createcategory);
router.post('/create-mycategory', homeController.createmycategory);
//route for deleting a task
router.use('/delete-todo/',homeController.delete);

//exporting the router to main index file
module.exports = router;

