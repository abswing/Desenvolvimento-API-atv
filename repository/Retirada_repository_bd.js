const bd = require('./BD');

async function listar() {
    const Retirada = await bd.connect();
    const sql = 'SELECT * FROM retirada'; 
    const result = await Retirada.query(sql);
    const listarRetiradas = result.rows.map(retirada => {
        return {
            id: retirada.id,
            clienteid: retirada.clienteid,
            livroid: retirada.livroid,
            dataretirada: retirada.dataretirada,
            datadevolucao: retirada.datadevolucao
        }
    });
    Retirada.release();
    return listarRetiradas;
}

async function buscarPorId(id) {
    const conn = await bd.connect();
    const sql = `SELECT * FROM retirada WHERE id = $1`;
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
}

async function registrarRetirada(retirada) {
    const conn = await bd.connect();
    const sql = `
        INSERT INTO retirada (clienteid, livroid, dataretirada, datadevolucao)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
    const values = [retirada.clienteid, retirada.livroid, retirada.dataretirada, retirada.datadevolucao];
    const result = await conn.query(sql, values);
    conn.release();
    return result.rows[0];
}

async function devolverLivro(id, datadevolucaoreal) {
    const conn = await bd.connect();
    const sql = `
        UPDATE retirada
        SET datadevolucaoreal = $1
        WHERE id = $2
        RETURNING *`;
    const result = await conn.query(sql, [datadevolucaoreal, id]);
    conn.release();
    return result.rows[0];
}

async function listarPorCliente(clienteid) {
    const conn = await bd.connect();
    const sql = `SELECT * FROM retirada WHERE clienteid = $1`;
    const result = await conn.query(sql, [clienteid]);
    conn.release();
    return result.rows;
}

module.exports = {
    listar,
    buscarPorId,
    registrarRetirada,
    devolverLivro,
    listarPorCliente
};