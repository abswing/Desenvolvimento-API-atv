const livroService = require("../service/livro_service")

async function listar(req, res) {
    try {
        res.json(await livroService.listar());
    } 
    catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}


async function inserir(req, res) {
    let livro = req.body;
    console.log("Inserindo livro:", livro);
    try {
        const novoLivro = await livroService.inserir(livro);
        res.status(201).json(novoLivro);
    } catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

// async function pesquisarPorCategoria(req, res) {
//     const categoria = req.params.categoria;
//     try {
//         res.json(await livroService.pesquisarPorCategoria(categoria));
//     } catch(err) {
//         res.status(err.id || 500).json(err);
//     }
// }

// async function pesquisarPorNome(req, res) {
//     const nome = req.params.nome;
//     try {
//         res.json(await livroService.pesquisarPorNome(nome));
//     } catch(err) {
//         res.status(err.id || 500).json(err);
//     }
// }

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const livroComId = await livroService.buscarPorId(id);
        res.json(livroComId);
    } 
    catch (err) {
        res.status(err.id || 500).json(err);
    }
}

async function atualizar(req, res) {
    let livroAtual = req.body;
    const id = +req.params.id;
    try {
        const livroAtualizado = await livroService.atualizar(id, livroAtual);
        res.json(livroAtualizado);
    } 
    catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const livroDeletado = await livroService.deletar(id);
        res.json(livroDeletado);
    } 
    catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    // pesquisarPorCategoria,
    // pesquisarPorNome
}