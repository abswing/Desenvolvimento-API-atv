const clienteService = require("../service/cliente_service");
const clienteRepository = require("../repository/cliente_repository");

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


function deletar(req, res) {
    const id = parseInt(req.params.id);
    const clienteRemovido = clienteRepository.deletar(id);
    if (clienteRemovido) {
        res.status(204).send(); // No Content
    } else {
        res.status(404).json({ msg: "Cliente não encontrado" });
    }
}

function atualizar(req, res) {
    const id = parseInt(req.params.id);
    const clienteAtualizado = clienteRepository.atualizar(id, req.body);
    if (clienteAtualizado) {
        res.json(clienteAtualizado);
    } else {
        res.status(404).json({ msg: "Cliente não encontrado" });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    deletar,
    atualizar
};