const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM ucak');
    return r.rows;
};

exports.create = async ({ ucak_id, model, kapasite, havayolu_id }) => {
    await pool.query(
        'INSERT INTO ucak VALUES ($1,$2,$3,$4)',
        [ucak_id, model, kapasite, havayolu_id]
    );
};

exports.update = async (id, { model, kapasite }) => {
    await pool.query(
        'UPDATE ucak SET model=$1, kapasite=$2 WHERE ucak_id=$3',
        [model, kapasite, id]
    );
};

exports.remove = async (id) => {
    await pool.query('DELETE FROM ucak WHERE ucak_id=$1', [id]);
};
