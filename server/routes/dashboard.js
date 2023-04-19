const express=require('express');
const router=express.Router();
const dashboardController=require('../controllers/dashboardController');
const {isLoggedIn} =require('../middleware/checkAuth')
router.get('/dashboard',isLoggedIn,dashboardController.dashboard);
router.get('/dashboard/item/:id',isLoggedIn,dashboardController.viewNote);
router.patch('/dashboard/item/:id',isLoggedIn,dashboardController.updateNote);
router.delete('/dashboard/item/:id',isLoggedIn,dashboardController.deleteNote);
router.get('/dashboard/add',isLoggedIn,dashboardController.addNote);
router.post('/dashboard/add',isLoggedIn,dashboardController.submitNewNote);
router.post('/dashboard/search',isLoggedIn,dashboardController.submitSearch);
//router.get('/dashboard/deleteAll',isLoggedIn,dashboardController.deleteAll);
// router.get('/dashboard/search',isLoggedIn,dashboardController.search);
module.exports=router;