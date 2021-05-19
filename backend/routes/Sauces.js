const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/database');
const multer = require('../middleware/multer-config');

router.get('/', saucesCtrl.saucesArray);
router.get('/:id', saucesCtrl.saucesUnique);
router.post('/', multer, saucesCtrl.addSauce);
router.put(':id', multer, saucesCtrl.modifySauce);
router.delete(':id', saucesCtrl.deleteSauce);


module.exports = router;
