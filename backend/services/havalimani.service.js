const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM havalimani');
    return r.rows;
};

exports.create = async ({ havalimani_id, havalimani_adi, sehir }) => {
    await pool.query(
        'INSERT INTO havalimani VALUES ($1,$2,$3)',
        [havalimani_id, havalimani_adi, sehir]
    );
};

exports.update = async (id, { havalimani_adi, sehir }) => {
    await pool.query(
        'UPDATE havalimani SET havalimani_adi=$1, sehir=$2 WHERE havalimani_id=$3',
        [havalimani_adi, sehir, id]
    );
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM havalimani WHERE havalimani_id=$1', [id]);
};
