const express = require('express');
const router = express.Router();
const controller = require('../controllers/ucak.controller');

router.get('/ucaklar', controller.getAll);
router.post('/ucak-ekle', controller.create);
router.put('/ucak-guncelle/:id', controller.update);
router.delete('/ucak-sil/:id', controller.remove);

module.exports = router;
