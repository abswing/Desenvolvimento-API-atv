const clienteService = require("../service/cliente_service");

function listar(req, res) {
    const email = req.query ? req.query.email : undefined; 
    if(!email) {
        res.json(clienteService.listar());
    } else {
        try {
            res.json(clienteService.pesquisarPorEmail(email));
            // pesquisarPorEmail é o método que busca clientes por email
        } catch(err) {
            res.status(err.id).json(err);
        }    
    }
}

function inserir(req, res) {
    let cliente = req.body;
    try { 
        clienteService.inserir(cliente);
        res.status(201).json(cliente);
    } catch(err) {
        console.log(err);
        res.status(err.id).json(err);
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        res.json(clienteService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
};