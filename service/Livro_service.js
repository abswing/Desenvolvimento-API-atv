const livroRepository = require('../repository/Livro_repository')

function listar() {
    return livroRepository.listar();
}

function inserir(livro) {
    if(livro && livro.nome 
        && livro.categoria && livro.disponivel !== undefined
        && livro.autor) {
            return livroRepository.inserir(livro);
    }
    else {
        throw { id: 400, msg: "Livro sem dados corretos"}
    }
}

function buscarPorId(id) {
    let livro = livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw { id: 404, msg: "Livro não encontrado!" }
    }
}

function pesquisarPorCategoria(categoria) {
    let livros = livroRepository.pesquisarPorCategoria(categoria);
    if(livros) {
        return livros;
    }
    else {
        throw { id: 404, msg: "Nenhum livro encontrado na categoria informada!" }
    }
}

function pesquisarPorNome(nome) {
    let livros = livroRepository.pesquisarPorNome(nome);
    if(livros) {
        return livros;
    }
    else {
        throw { id: 404, msg: "Nenhum livro encontrado com o nome informado!" }
    }
}


function atualizar(id, livro) {
    if(livro && livro.nome && livro.categoria 
        && livro.disponivel !== undefined
        && livro.autor) {
            
        const livroAtualizado = livroRepository.atualizar(id, livro);
        if(livroAtualizado) {
            return livroAtualizado;
        }        
        else {
            throw {id:404, msg: "Livro não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Livro sem dados corretos"};
    }
}

function deletar(id) {
    let livro = livroRepository.deletar(id);
    if(livro) {
        return livro;
    }
    else {
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