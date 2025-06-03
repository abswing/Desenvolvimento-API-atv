const express  = require('express');
const router = express.Router();

const retiradaController = require('../controller/Retirada_controller');

router.post('/', retiradaController.registrarRetirada);
router.post('/:id', retiradaController.devolverLivro);
router.get('/', retiradaController.listar);

module.exports = router;    
