const express = require('express');
const router = express.Router();
const {
  getPasswords,
  getByType,
  createPassword,
  updatePassword,
  deletePassword,
  getDeletedPasswords,
  restorePassword,
  permanentlyDeletePassword,
} = require('../controllers/passwordController');


router.get('/deleted/all', getDeletedPasswords);
router.get('/type/:type', getByType);


router.get('/', getPasswords);


router.post('/', createPassword);


router.put('/restore/:id', restorePassword);
router.delete('/permanent/:id', permanentlyDeletePassword);


router.put('/:id', updatePassword);
router.delete('/:id', deletePassword);

module.exports = router;