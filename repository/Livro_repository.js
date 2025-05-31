let listaLivro = [];
let autoIncrement = 1;

function listar() {
    return listaLivro;
}

function buscarPorId(id) {
    /*for(let produto of listaProdutos){
        if(produto.id == id) {
            return produto;
        }
    }*/
    return (listaLivro.find(
        function(livro) {
            return (livro.id == id);
        }
    ));
}

function inserir(Livro) {
    if(!Livro || !Livro.nome || !Livro.autor || !Livro.categoria || !Livro.disponivel == undefined) {
            return;
    }

    Livro.id = autoIncrement++;
    listaLivro.push(Livro);
    return Livro;
}

function buscarIndicePorId(id) {
    return listaLivro.findIndex((Livro) => Livro.id === id);
}

function atualizar(id, LivroAtual) {
    if(!LivroAtual || !LivroAtual.nome || !LivroAtual.autor || !LivroAtual.categoria || !LivroAtual.disponivel== undefined) {
            return;
    }

    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        LivroAtual.id = id;  
        listaLivro[indice] = LivroAtual;
        return listaLivro[indice];
    }
}

function deletar(id) {
    let indiceLivro = buscarIndicePorId(id);    
    if(indiceLivro >= 0) {
        return listaLivro.splice(indiceLivro, 1)[0];
    }
}

function pesquisarPorCategoria(categoria) {
    return listaLivro.filter( (Livro) => Livro.categoria == categoria )
}

function pesquisarPorNome(nome) {
    return listaLivro.filter ( (Livro) => {
        const LivroNomeUp = Livro.nome.toUpperCase();
        const nomeUp = nome.toUpperCase();
        return (LivroNomeUp.search(nomeUp) >= 0);
    })
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorCategoria,
    pesquisarPorNome
}