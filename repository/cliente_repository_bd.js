const bd = require('./BD');

async function listar() {
    const Cliente = await bd.connect();
    const sql = 'SELECT * FROM cliente'; 
    const result = await Cliente.query(sql);
    const listarCliente = result.rows.map(cliente => {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email
        }
    });
    Cliente.release();
    return listarCliente;
}

async function buscarPorId(id) {
    const Cliente = await bd.connect();
    const sql = 'SELECT * FROM cliente WHERE cliente.id = $1'; // minúsculo
    const value = [id];
    const result = await Cliente.query(sql, value);
    const clienteEncontrado = result.rows[0];
    Cliente.release();
    if(clienteEncontrado) {
        return{
            id: clienteEncontrado.id,
            nome: clienteEncontrado.nome,
            email: clienteEncontrado.email
        }
    }
    return undefined;
}

async function inserir(cliente) {
    const Cliente = await bd.connect();
    const sql = 'INSERT INTO cliente (nome, email) VALUES ($1, $2) RETURNING *'; // minúsculo
    const values = [cliente.nome, cliente.email];
    const result = await Cliente.query(sql, values);
    const novoCliente = result.rows[0];
    Cliente.release();
    return (novoCliente);
}

async function atualizar(id, clienteAtual) {
    const sql = 'UPDATE cliente SET nome = $1, email = $2 WHERE id = $3 RETURNING *'; // minúsculo
    const values = [clienteAtual.nome, clienteAtual.email, id];
    const Cliente = await bd.connect();
    const result = await Cliente.query(sql, values);
    const clienteAtualizado = result.rows[0];
    Cliente.release();
    return (clienteAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM cliente WHERE id = $1 RETURNING *'; // minúsculo
    const values = [id];
    const Cliente = await bd.connect();
    const result = await Cliente.query(sql, values);
    const clienteDeletado = result.rows[0];
    Cliente.release();
    return (clienteDeletado);
}

function pesquisarPorEmail(email) {
    const sql = 'SELECT * FROM cliente WHERE email = $1'; // minúsculo
    const values = [email];
    return bd.connect().then(Cliente => {
        return Cliente.query(sql, values).then(result => {
            Cliente.release();
            return result.rows.map(cliente => {
                return {
                    id: cliente.id,
                    nome: cliente.nome,
                    email: cliente.email
                }
            });
        });
    });
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar,
    pesquisarPorEmail
};