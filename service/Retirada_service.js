const retiradaRepository = require('../repository/Retirada_repository_bd');
const livroRepository = require('../repository/Livro_repository_bd');
const clienteRepository = require('../repository/cliente_repository_bd');

async function registrarRetirada(clienteid, livroid) {
    console.log("Buscando clienteid:", clienteid);
    const cliente = await clienteRepository.buscarPorId(clienteid);
    console.log("Resultado do cliente:", cliente);
    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }

    // verifica se ciente ja tem 3 retiradas ativas
    const retiradasAtivas = await retiradaRepository.listarPorCliente(clienteid);
    if (retiradasAtivas.length >= 3) {
        throw new Error('Cliente já possui 3 retiradas ativas');
    }

    // Verifica se o livro está disponível
    const livro = await livroRepository.buscarPorId(livroid);
    if (!livro || !livro.disponivel) {
        throw new Error('Livro não disponível para retirada');
    }


    // Define a data devolução como 7 dias após a retirada
    const dataRetirada = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataRetirada.getDate() + 7);

    // Registra a retirada
    const retirada = await retiradaRepository.registrarRetirada({
        clienteid: clienteid,
        livroid: livroid,
        dataretirada: dataRetirada,
        datadevolucao: dataDevolucao
    });

    // Marca o livro como indisponível
    await livroRepository.marcarLivroIndisponivel(livroid);

    return retirada;
}

async function devolverLivro(RetiradaId){
    const dataDevolucao = new Date();
    const retirada = await retiradaRepository.devolverLivro(RetiradaId, dataDevolucao);


    if (!retirada) {
        throw new Error('Retirada não encontrada ou já devolvida');
    }

    // Marca o livro como disponível
    await livroRepository.marcarLivroDisponivel(retirada.livroid);

    return retirada;
}

async function listar() {
    return await retiradaRepository.listar();
}

module.exports = {
    registrarRetirada,
    devolverLivro,
    listar
};


