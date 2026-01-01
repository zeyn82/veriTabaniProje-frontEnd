const express = require('express');
const router = express.Router();
const controller = require('../controllers/ucus.controller');

router.get('/ucuslar', controller.getAll);
router.get('/ucus-detay', controller.detay);
router.get('/istatistikler', controller.istatistik);
router.get('/ucus-yolculari/:id', controller.cursorYolcular);
router.get('/ucus/:id/pilotlar', controller.pilotlar);
router.get('/ucus/:id/kabinler', controller.kabinler);


module.exports = router;
