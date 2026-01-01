const express = require('express');
const router = express.Router();
const controller = require('../controllers/havalimani.controller');

router.get('/havalimanlari', controller.getAll);
router.post('/havalimani-ekle', controller.create);
router.put('/havalimani-guncelle/:id', controller.update);
router.delete('/havalimani-sil/:id', controller.remove);

module.exports = router;
