const service = require('../services/havalimani.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        await service.create(req.body);
        res.send("Havalimanı eklendi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        await service.update(req.params.id, req.body);
        res.send("Havalimanı güncellendi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.send("Havalimanı silindi");
    } catch (err) {
        res.status(400).send(err.message);
    }
};
