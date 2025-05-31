const clieteRepository = require('../repository/cliente_repository');

function listar() {
    return clieteRepository.listar();
}

function buscarPorId(id) {
    let cliente = clieteRepository.buscarPorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw { id: 404, msg: "Cliente não encontrado!" }
    }
}

function inserir(cliente) {
    let clienteInserido = clieteRepository.inserir(cliente);
    if(clienteInserido) {
        return clienteInserido;
    }
    else {
        throw { id: 400, msg: "Erro ao inserir cliente!" }
    }
}

function atualizar(id, clienteAtual) {
    let clienteAtualizado = clieteRepository.atualizar(id, clienteAtual);
    if(clienteAtualizado) {
        return clienteAtualizado;
    }
    else {
        throw { id: 400, msg: "Erro ao atualizar cliente!" }
    }
}

function deletar(id) {
    let clienteDeletado = clieteRepository.deletar(id);
    if(clienteDeletado) {
        return clienteDeletado;
    }
    else {
        throw { id: 404, msg: "Cliente não encontrado!" }
    }
}

function pesquisarPorNome(nome){
    let cliente = clieteRepository.pesquisarPorNome(nome);
    if(cliente) {
        return cliente;
    }
    else {
        throw { id: 404, msg: "Cliente não encontrado!" }
    }
}

function pesquisarPorEmail(email) {
    let clientes = clieteRepository.pesquisarPorEmail(email);
    if(clientes) {
        return clientes;
    }
    else {
        throw { id: 404, msg: "Cliente não encontrado!" }
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar,
    pesquisarPorNome,
    pesquisarPorEmail
};