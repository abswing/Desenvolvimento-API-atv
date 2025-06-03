const express = require('express');
const router = express.Router();
const clienteController = require('../controller/cliente_controller');

router.get('/', clienteController.listar);
router.post('/', clienteController.inserir);
router.get('/:id', clienteController.buscarPorId);
router.delete('/:id', clienteController.deletar);
router.put('/:id', clienteController.atualizar);

module.exports = router;