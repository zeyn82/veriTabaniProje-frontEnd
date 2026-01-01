const express = require('express');
const router = express.Router();
const yolcuController = require('../controllers/yolcu.controller');

router.get('/yolcular', yolcuController.getAll);
router.post('/yolcu-ekle', yolcuController.create);
router.put('/yolcu-guncelle/:id', yolcuController.update);
router.delete('/yolcu-sil/:id', yolcuController.remove);

module.exports = router;
