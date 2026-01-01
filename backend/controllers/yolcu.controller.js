const yolcuService = require('../services/yolcu.service');

exports.getAll = async (req, res) => {
    try {
        const data = await yolcuService.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        await yolcuService.create(req.body);
        res.send("Yolcu eklendi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        await yolcuService.update(req.params.id, req.body);
        res.send("Yolcu güncellendi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.remove = async (req, res) => {
    try {
        await yolcuService.remove(req.params.id);
        res.send("Yolcu silindi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};
