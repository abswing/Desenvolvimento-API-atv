const retiradaService = require('../service/Retirada_service');

function registrarRetirada(req, res) {
    try {
        const { clienteID, livroID } = req.body;
        const retirada = retiradaService.registrarRetirada(clienteID, livroID);
        res.status(201).json(retirada);
    } catch (error) {
        res.status(err).json(err);
    }
}

function devolverLivro(req, res) {
    try {
        const { retiradaID } = req.body;
        const retirada = retiradaService.devolverLivro(retiradaID);
        res.status(200).json(retirada);
    } catch (error) {
        res.status(err).json(err);
    }
}

function listar(req, res) {
    try {
        const retiradas = retiradaRepository.listar();
        res.json(retiradas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registrarRetirada,
    devolverLivro,
    listar
};

