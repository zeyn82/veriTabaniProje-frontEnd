const pool = require('../db');

exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM bilet');
    return r.rows;
};

exports.sat = async ({ bilet_no, koltuk_no, ucus_id, yolcu_id }) => {
    await pool.query(
        'CALL bilet_sat($1,$2,$3,$4)',
        [bilet_no, koltuk_no, ucus_id, yolcu_id]
    );
};

exports.update = async (no, koltuk_no) => {
    await pool.query(
        'UPDATE bilet SET koltuk_no=$1 WHERE bilet_no=$2',
        [koltuk_no, no]
    );
};

exports.remove = async (no) => {
    await pool.query('DELETE FROM bilet WHERE bilet_no=$1', [no]);
};
