const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM bagaj');
    return r.rows;
};

exports.create = async ({ bagaj_no, yolcu_id, agirlik }) => {
    await pool.query(
        'INSERT INTO bagaj VALUES ($1,$2,$3)',
        [bagaj_no, yolcu_id, agirlik]
    );
};

exports.update = async (no, agirlik) => {
    await pool.query(
        'UPDATE bagaj SET agirlik=$1 WHERE bagaj_no=$2',
        [agirlik, no]
    );
};

exports.remove = async (no) => {
    await pool.query('DELETE FROM bagaj WHERE bagaj_no=$1', [no]);
};
