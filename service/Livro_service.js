const livroRepository = require('../repository/Livro_repository_bd');

async function listar() {
    return await livroRepository.listar();
}

async function inserir(livro) {
    if(livro && livro.nome && livro.categoria && livro.disponivel !== undefined && livro.autor) {
        return await livroRepository.inserir(livro);
    } else {
        throw { id: 400, msg: "Livro sem dados corretos" }
    }
}

async function buscarPorId(id) {
    const livro = await livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    } else {
        throw { id: 404, msg: "Livro não encontrado!" }
    }
}

async function pesquisarPorCategoria(categoria) {
    const livros = await livroRepository.pesquisarPorCategoria(categoria);
    if(livros) {
        return livros;
    } else {
        throw { id: 404, msg: "Nenhum livro encontrado na categoria informada!" }
    }
}

async function pesquisarPorNome(nome) {
    const livros = await livroRepository.pesquisarPorNome(nome);
    if(livros) {
        return livros;
    } else {
        throw { id: 404, msg: "Nenhum livro encontrado com o nome informado!" }
    }
}

async function atualizar(id, livro) {
    if(livro && livro.nome && livro.categoria && livro.disponivel !== undefined && livro.autor) {
        const livroAtualizado = await livroRepository.atualizar(id, livro);
        if(livroAtualizado) {
            return livroAtualizado;
        } else {
            throw {id:404, msg: "Livro não encontrado"};
        }
    } else {
        throw {id:400, msg: "Livro sem dados corretos"};
    }
}

async function deletar(id) {
    const livro = await livroRepository.deletar(id);
    if(livro) {
        return livro;
    } else {
        throw { id: 404, msg: "Livro não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorCategoria,
    pesquisarPorNome
}