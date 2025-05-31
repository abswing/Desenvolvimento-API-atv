const livroService = require("../service/livro_service")

function listar(req, res) {
    res.json(livroService.listar());
    // res.status(200).json(livroService.listar()); //mesma coisa
}

function inserir (req, res) {
    let livro = req.body;
    try { 
        livroService.inserir(livro);
        res.status(201).json(livro);
    }
    catch(err) {
        res.status(err.id).json(err);
    }
}

function pesquisarPorCategoria(req, res) {
    const categoria = req.params.categoria;
    try {
        res.json(livroService.pesquisarPorCategoria(categoria));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

function pesquisarPorNome(req, res) {
    const nome = req.params.nome;
    try {
        res.json(livroService.pesquisarPorNome(nome));
    } catch(err) {
        res.status(err.id).json(err);
    }

}
function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(livroService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

function atualizar(req, res) {

    const id = +req.params.id;
    let livro = req.body;
    try{
        res.json(livroService.atualizar(id, livro));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    //
    try {
        res.json(livroService.deletar(id));
        // res.status(204).send(); //nao retorna nada
    } catch(err) {
        res.status(err.id).json(err);
        // res.status(204).send(); //nao retorna nada
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