const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

/** Routers leading to the sauce controllers */

router.get('/', auth, saucesCtrl.saucesArray);
router.get('/:id', auth, saucesCtrl.saucesUnique);
router.post('/', auth, multer, saucesCtrl.addSauce);
router.put(':id', auth, multer, saucesCtrl.modifySauce);
router.delete(':id', auth, saucesCtrl.deleteSauce);


module.exports = router;
