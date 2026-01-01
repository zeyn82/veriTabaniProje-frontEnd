const express = require('express');
const router = express.Router();
const controller = require('../controllers/bagaj.controller');

router.get('/bagajlar', controller.getAll);
router.post('/bagaj-ekle', controller.create);
router.put('/bagaj-guncelle/:no', controller.update);
router.delete('/bagaj-sil/:no', controller.remove);

module.exports = router;
