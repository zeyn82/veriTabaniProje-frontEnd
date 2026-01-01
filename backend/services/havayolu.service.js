const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM havayolu');
    return r.rows;
};

exports.create = async ({ havayolu_id, havayolu_adi }) => {
    await pool.query(
        'INSERT INTO havayolu VALUES ($1,$2)',
        [havayolu_id, havayolu_adi]
    );
};

exports.update = async (id, { havayolu_adi }) => {
    await pool.query(
        'UPDATE havayolu SET havayolu_adi=$1 WHERE havayolu_id=$2',
        [havayolu_adi, id]
    );
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM havayolu WHERE havayolu_id=$1', [id]);
};
