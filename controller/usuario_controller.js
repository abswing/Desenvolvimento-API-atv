const usuarioService = require("../service/usuario_service");

function listar(req, res) {
    const email = req.query ?req.query.email :undefined; 
    if(!email) {
        res.json(usuarioService.listar());
    }
    else {
        try {
            res.json(usuarioService.buscarPorEmail(email));
        } catch(err) {
            res.status(err.id).json(err);
        }    
    }
}

function inserir (req, res) {
    let usuario = req.body;
    try { 
        usuarioService.inserir(usuario);
        res.status(201).json(usuario);
    }
    catch(err) {
        console.log(err);
        res.status(err.id).json(err);
    }
}

function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(usuarioService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
}