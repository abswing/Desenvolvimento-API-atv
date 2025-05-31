let listarCliente = [];
let autoIncrement = 1;

function listar() {
    return listarCliente;
}

function buscarPorId(id) {
    return (listarCliente.find(
        function(cliente) {
            return (cliente.id == id);
        }
    ));
}

function inserir(cliente) {
    if(!cliente || !cliente.nome || !cliente.email) {
        return undefined;
    }
    cliente.id = autoIncrement++;
    listarCliente.push(cliente);
    return cliente;
}

function buscarIndicePorId(id) {
    return listarCliente.findIndex((cliente) => cliente.id === id);
}   

function atualizar(id, clienteAtual) {
    if(!clienteAtual || !clienteAtual.nome || !clienteAtual.email) {
        return undefined;
    }

    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        clienteAtual.id = id;  
        listarCliente[indice] = clienteAtual;
        return listarCliente[indice];
    }
}

function deletar(id) {
    let indiceCliente = buscarIndicePorId(id);    
    if(indiceCliente >= 0) {
        return listarCliente.splice(indiceCliente, 1)[0];
    }
}

function pesquisarPorEmail(email) {
    return listarCliente.filter((cliente) => cliente.email === email);
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar,
    pesquisarPorEmail
};