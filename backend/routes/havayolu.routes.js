const express = require('express');
const router = express.Router();
const controller = require('../controllers/havayolu.controller');

router.get('/havayollari', controller.getAll);
router.post('/havayolu-ekle', controller.create);
router.put('/havayolu-guncelle/:id', controller.update);
router.delete('/havayolu-sil/:id', controller.remove);

module.exports = router;
