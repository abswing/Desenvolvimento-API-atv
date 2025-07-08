const bd = require('./BD');


async function listar() {
    const livro = await bd.connect();
    const sql = 'SELECT * FROM livro'; 
    const result = await livro.query(sql);
    const listarLivros = result.rows.map(livro => {
        return {
            id: livro.id,
            nome: livro.nome,
            autor: livro.autor,
            categoria: livro.categoria,
            disponivel: livro.disponivel
        }
    });
    livro.release();
    return listarLivros;
}

async function buscarPorId(id) {
    const livro = await bd.connect();
    const sql = 'SELECT * FROM livro WHERE livro.id = $1';
    const value = [id];
    const result = await livro.query(sql, value);
    const livroEncontrado = result.rows[0];
    livro.release();
    if(livroEncontrado) {
        return{
            id: livroEncontrado.id,
            nome: livroEncontrado.nome,
            autor: livroEncontrado.autor,
            categoria: livroEncontrado.categoria,
            disponivel: livroEncontrado.disponivel
        }
    }
    return undefined;
}

async function inserir(livro) {
    const Livro = await bd.connect();
    const sql = 'INSERT INTO livro (nome, autor, categoria, disponivel) VALUES ($1, $2, $3, $4) RETURNING *'; // minúsculo
    const values = [livro.nome, livro.autor, livro.categoria, livro.disponivel];
    const result = await Livro.query(sql, values);
    const novoLivro = result.rows[0];
    Livro.release();
    return (novoLivro);
}


async function atualizar(id, LivroAtual) {
    const sql = 'UPDATE livro SET nome = $1, autor = $2, categoria = $3, disponivel = $4 WHERE id = $5 RETURNING *'; // minúsculo
    const values = [LivroAtual.nome, LivroAtual.autor, LivroAtual.categoria, LivroAtual.disponivel, id];
    const Livro = await bd.connect();
    const result = await Livro.query(sql, values);
    const livroAtualizado = result.rows[0];
    Livro.release();
    return (livroAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM livro WHERE id = $1 RETURNING *'; // minúsculo
    const values = [id];
    const Livro = await bd.connect();
    const result = await Livro.query(sql, values);
    const livroDeletado = result.rows[0];
    Livro.release();
    return (livroDeletado);
}

// async function pesquisarPorCategoria(categoria) {
//     const livro = await bd.connect();
//     const sql = 'SELECT * FROM livro WHERE categoria = $1';
//     const values = [categoria];
//     const result = await livro.query(sql, values);
//     livro.release();
//     return result.rows;
// }

// async function pesquisarPorNome(nome) {
//     const livro = await bd.connect();
//     const sql = 'SELECT * FROM livro WHERE nome = $1';
//     const values = [nome];
//     const result = await livro.query(sql, values);
//     livro.release();
//     return result.rows;
// }

async function marcarLivroDisponivel(livroID) {
    const livro = await buscarPorId(livroID);
    if (livro) {
        const bdConn = await bd.connect();
        const sql = 'UPDATE livro SET disponivel = true WHERE id = $1 RETURNING *';
        const values = [livroID];
        const result = await bdConn.query(sql, values);
        bdConn.release();
        return result.rows[0];
    }
    return null;
}

async function marcarLivroIndisponivel(livroID) {
    const livro = await buscarPorId(livroID);
    if (livro) {
        const bdConn = await bd.connect();
        const sql = 'UPDATE livro SET disponivel = false WHERE id = $1 RETURNING *';
        const values = [livroID];
        const result = await bdConn.query(sql, values);
        bdConn.release();
        return result.rows[0];
    }
    return null;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    // pesquisarPorCategoria,
    // pesquisarPorNome,
    marcarLivroDisponivel,
    marcarLivroIndisponivel
}