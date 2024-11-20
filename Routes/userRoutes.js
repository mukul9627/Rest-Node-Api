// routes/userRoutes.js
const express = require('express');
const { getUsers,getUsersId ,createOrUpdateUser, deleteUser } = require('../controllers/useControllers');
//  console.log({  getUsers,getUsersId ,createOrUpdateUser, updateUser, deleteUser  }); 
// Should log all functions

const router = express.Router();

// Define routes
router.get('/', getUsers); // Correctly passing the getUsers function
router.get('/:id', getUsersId);
router.post('/:id', createOrUpdateUser);
// router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; // Export router
