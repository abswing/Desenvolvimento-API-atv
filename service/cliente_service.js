const clieteRepository = require('../repository/cliente_repository_bd');

async function listar() {
    try {
        return await clieteRepository.listar();
    } catch (error) {
        throw { id: 500, menssagem: "Erro ao listar clientes!" };
    }
}

async function buscarPorId(id) {
    let cliente;
    try {
        cliente = await clieteRepository.buscarPorId(id);
    } catch (error) {
        console.log("erro SQL: ", error);
        throw { id: 500, menssagem:error.message};
    }
    if(cliente) {
        return cliente;
    } else {
        throw { id: 404, menssagem: "Cliente não encontrado!" };
    }
}

async function inserir(cliente) {
    try {
        let clienteInserido = await clieteRepository.inserir(cliente);
        return clienteInserido;
    } catch (error) {
        console.log("erro SQL: ", error); // <-- Veja o erro real aqui
        throw { id: 400, menssagem: error.message || "Erro ao inserir cliente!" };
    }
}

async function atualizar(id, clienteAtual) {
    if(clienteAtual && clienteAtual.nome && clienteAtual.email) {
        let clienteAtualizado;
        try {
            clienteAtualizado = await clieteRepository.atualizar(id, clienteAtual);
        } catch (error) {
            throw { id: 400, menssagem: "Erro ao atualizar cliente!" };
        }
    }
}

async function deletar(id) {
    let clienteDeletado;
    try {
        clienteDeletado = await clieteRepository.deletar(id);
    } catch (error) {
        throw { id: 500, menssagem: "Erro ao deletar cliente!" };
    }
    if(clienteDeletado) {
        return clienteDeletado;
    } else {
        throw { id: 404, menssagem: "Cliente não encontrado!" };
    }
}

async function pesquisarPorNome(nome){
    let cliente = await clieteRepository.pesquisarPorNome(nome);
    if(cliente) {
        return cliente;
    } else {
        throw { id: 404, msg: "Cliente não encontrado!" }
    }
}

async function pesquisarPorEmail(email) {
    let clientes = await clieteRepository.pesquisarPorEmail(email);
    if(clientes) {
        return clientes;
    } else {
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