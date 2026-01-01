const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM yolcu');
    return r.rows;
};

exports.create = async ({ yolcu_id, yolcu_ad, yolcu_soyad, telefon }) => {
    await pool.query(
        'INSERT INTO yolcu VALUES ($1,$2,$3,$4)',
        [yolcu_id, yolcu_ad, yolcu_soyad, telefon]
    );
};

exports.update = async (id, { yolcu_ad, yolcu_soyad, telefon }) => {
    await pool.query(
        'UPDATE yolcu SET yolcu_ad=$1, yolcu_soyad=$2, telefon=$3 WHERE yolcu_id=$4',
        [yolcu_ad, yolcu_soyad, telefon, id]
    );
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM yolcu WHERE yolcu_id=$1', [id]);
};
