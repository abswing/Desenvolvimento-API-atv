let Retiradas = [];
let autoIncrement = 1;


function listarRetiradas() {
    return Retiradas;
}

function registrarRetirada({ clienteID, livroID, dataRetirada, dataDevolucao }){
    Retiradas.push({
        id: autoIncrement++,
        clienteID,
        livroID,
        dataRetirada,
        dataDevolucao,
        dataDevolucaoReal: null
    });
    return Retiradas[Retiradas.length - 1];
}

function listarPorCliente(clienteID) {
    return Retiradas.filter(Retiradas => Retiradas.clienteID === clienteID);
}

function devolverLivro(RetiradaId, dataDevolucaoReal) {
    const retirada = Retiradas.find(retirada => retirada.id === RetiradaId);
    if (retirada && !retirada.dataDevolucaoReal) {
        retirada.dataDevolucaoReal = dataDevolucaoReal;
        return retirada;
    }
    return null;
}

module.exports = {
    listarRetiradas,
    registrarRetirada,
    listarPorCliente,
    devolverLivro,

};

