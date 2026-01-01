const pool = require('../db');

/*
UÇUŞ – TEMEL İŞLEMLER
*/

// Tüm uçuşlar
exports.getAll = async () => {
    const r = await pool.query('SELECT * FROM ucus');
    return r.rows;
};

// View: Detaylı uçuş bilgileri
exports.detay = async () => {
    const r = await pool.query('SELECT * FROM view_ucus_detay');
    return r.rows;
};

// Aggregate View: Havayolu istatistikleri
exports.istatistik = async () => {
    const r = await pool.query('SELECT * FROM view_havayolu_istatistik');
    return r.rows;
};

/*
CURSOR – UÇUŞ YOLCULARI
(BACKEND’DEN GERÇEK CURSOR ÇAĞRISI)
*/

exports.cursorYolcular = async (client, ucusId) => {
    const cur = await client.query(
        'SELECT ucus_yolcular_cursor($1) AS c',
        [ucusId]
    );

    const cursorName = cur.rows[0].c;
    const data = await client.query(`FETCH ALL FROM "${cursorName}"`);
    return data.rows;
};

/*
PİLOT & KABİN GÖREVLİLERİ

*/

// Bu uçuşta görevli pilotlar
exports.getPilotlarByUcus = async (ucusId) => {
    const r = await pool.query(
        `SELECT 
            p.personel_id,
            p.personel_ad,
            p.personel_soyad
         FROM pilot_ucus pu
         JOIN pilot pi ON pu.personel_id = pi.personel_id
         JOIN personel p ON pi.personel_id = p.personel_id
         WHERE pu.ucus_id = $1`,
        [ucusId]
    );
    return r.rows;
};

// Bu uçuşta görevli kabin görevlileri
exports.getKabinlerByUcus = async (ucusId) => {
    const r = await pool.query(
        `SELECT 
            p.personel_id,
            p.personel_ad,
            p.personel_soyad,
            k.deneyim_yili
         FROM kabin_ucus ku
         JOIN kabin k ON ku.personel_id = k.personel_id
         JOIN personel p ON k.personel_id = p.personel_id
         WHERE ku.ucus_id = $1`,
        [ucusId]
    );
    return r.rows;
};
