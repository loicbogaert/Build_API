const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

/** Routers leading to the sauce controllers */

router.get('/', saucesCtrl.saucesArray);
router.get('/:id', saucesCtrl.saucesUnique);
router.post('/', multer, saucesCtrl.addSauce);
router.put(':id', multer, saucesCtrl.modifySauce);
router.delete(':id', saucesCtrl.deleteSauce);


module.exports = router;
