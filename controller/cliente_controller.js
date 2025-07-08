const clienteService = require("../service/cliente_service");

async function listar(req, res) {
    try {
        res.json(await clienteService.listar());
    } 
    catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

async function inserir(req, res) {
    let cliente = req.body;
    console.log("Inserindo cliente:", cliente);
    try {
        const novoCliente = await clienteService.inserir(cliente);
        res.status(201).json(novoCliente);
    } catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const clienteComId = await clienteService.buscarPorId(id);
        res.json(clienteComId);
    } 
    catch (err) {
        res.status(err.id || 500).json(err);
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const clienteDeletado = await clienteService.deletar(id);
        res.json(clienteDeletado);
    } 
    catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

async function atualizar(req, res) {
    let clienteAtual = req.body;
    const id = +req.params.id;
    try {
        const clienteAtualizado = await clienteService.atualizar(id, clienteAtual);
        res.json(clienteAtualizado);
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
    deletar,
    atualizar
};