const express = require('express');
const router = express.Router();
const controller = require('../controllers/bilet.controller');

router.get('/biletler', controller.getAll);
router.post('/bilet-sat', controller.sat);
router.put('/bilet-guncelle/:no', controller.update);
router.delete('/bilet-sil/:no', controller.remove);

module.exports = router;
