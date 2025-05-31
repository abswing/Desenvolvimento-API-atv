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

module.exports = {
    registrarRetirada,
    devolverLivro
};  

