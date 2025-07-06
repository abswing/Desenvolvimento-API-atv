const retiradaService = require('../service/Retirada_service');

async function registrarRetirada(req, res) {
    try {
        const { clienteid, livroid } = req.body;
        const retirada = await retiradaService.registrarRetirada(clienteid, livroid);
        res.status(201).json(retirada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function devolverLivro(req, res) {
    try {
        const { retiradaID } = req.body;
        const retirada = await retiradaService.devolverLivro(retiradaID);
        res.status(200).json(retirada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listar(req, res) {
    try {
        res.json(await retiradaService.listar());
    } catch (err) {
        console.log(err);
        // Se err.id não estiver definido, assume-se que é um erro interno do servidor
        res.status(err.id || 500).json(err);
    }
}

module.exports = {
    registrarRetirada,
    devolverLivro,
    listar
};

