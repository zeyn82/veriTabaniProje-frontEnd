const service = require('../services/bilet.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.sat = async (req, res) => {
    try {
        await service.sat(req.body);
        res.send("Bilet başarıyla satıldı");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        await service.update(req.params.no, req.body.koltuk_no);
        res.send("Bilet güncellendi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.no);
        res.send("Bilet silindi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};
