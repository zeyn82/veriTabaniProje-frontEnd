const pool = require('../db');
const service = require('../services/ucus.service');

// Tüm uçuşlar
exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// View: uçuş detayları
exports.detay = async (req, res) => {
    try {
        const data = await service.detay();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Aggregate: istatistik
exports.istatistik = async (req, res) => {
    try {
        const data = await service.istatistik();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//  GERÇEK CURSOR (transaction controller’da)
exports.cursorYolcular = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const data = await service.cursorYolcular(
            client,
            req.params.id
        );

        await client.query('COMMIT');
        res.json(data);
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).send(err.message);
    } finally {
        client.release();
    }
};

//  Bu uçuşta görevli pilotlar
exports.pilotlar = async (req, res) => {
    try {
        const data = await service.getPilotlarByUcus(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//  Bu uçuşta görevli kabin görevlileri
exports.kabinler = async (req, res) => {
    try {
        const data = await service.getKabinlerByUcus(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Bu uçuşta görevli pilotlar
exports.pilotlar = async (req, res) => {
    try {
        const data = await service.getPilotlarByUcus(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Bu uçuşta görevli kabin görevlileri
exports.kabinler = async (req, res) => {
    try {
        const data = await service.getKabinlerByUcus(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
