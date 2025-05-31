const livroRepository = require("./Livro_repository.js");

//Cenário de sucesso
test('Quando inserir o livro, deve retornar e conter na lista o livro com id=1'
    , () => {
        //livro que se espera ser cadastrado (com id)
        const livroInseridoEsperado = {
            id: 1,
            nome: "O Senhor dos Anéis",
            autor: "J.R.R. Tolkien",
            categoria: "fantasia",
            disponivel: true,
        
        };
        //Inserindo o livro no repositorio
        const livroInserido = livroRepository.inserir({
            nome: "O Senhor dos Anéis",
            autor: "J.R.R. Tolkien",
            categoria: "fantasia",
            disponivel: true
        });
        //Verificando se o livro inserido que retornou está correto
        expect(livroInserido).toEqual(livroInseridoEsperado);
        //Verificando se o livro foi inserido no repositório
        expect(livroRepository.listar()).toContainEqual(livroInseridoEsperado);
    })
//Cenário de exceção
test('Quando inserir o livro sem categoria, não deve retornar e não insere na lista'
    , () => {
        //Criado o cenário (com id=2 porque conta o teste anterior) para o livro inserido sem categoria
        const livroInseridoErrado = {
            id: 2,
            nome: "diario de um banana",
            autor: "João",
            categoria: "infantil",
            disponivel: true
        };
        //Inserindo o livro sem categoria
        const livroInserido = livroRepository.inserir({
            nome: "diario de um banana",
            autor: "João",
            //categoria: "infantil", //sem categoria
            disponivel: true

        });
        //O livro não deve retornar
        expect(livroInserido).toEqual(undefined);
        //Não deve inserir na lista o livro errado
        expect(livroRepository.listar()).not.toContainEqual(livroInseridoErrado);
    })

//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
    //Vou inserir um segundo livro para o teste (id=2)
    const livroInserido = livroRepository.inserir({
        id: 2,
        nome: "star wars",
        autor: "George Lucas",
        categoria: "ficção",
        disponivel: true
    });
    const resultado = livroRepository.buscarPorId(livroInserido.id);
    //Verificando se o livro inserido que retornou está correto
    //Podemos fazer testes mais simples:
    expect(resultado).toBeDefined();
    expect(resultado.nome).toBe("star wars");
});
//Cenário de exceção - buscarPorId()
test('Quando buscar por id inexistente, deve retornar undefined', () => {
    const resultado = livroRepository.buscarPorId(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - deletar()
test('Quando deletar um id existente, deve remover e retornar o dado', () => {
    const livroDeletadoEsperado = {
        nome: "O Senhor dos Anéis",
        autor: "J.R.R. Tolkien",
        categoria: "fantasia",
        id: 1
    };
    const quantidadeEsperada = 1;
    resultado = livroRepository.deletar(1);
    expect(resultado).toEqual(livroDeletadoEsperado);
    expect(livroRepository.listar().length).toBe(quantidadeEsperada);

})
//Cenário de exceção - deletar()
test('Quando deletar um livro com id inexistente, deve retornar undefined', () => {
    const resultado = livroRepository.deletar(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - atualizar
test('Quando atualizar um livro existente, deve atualizar na lista e retornar livro atualizado', () => {
    //Vou inserir um terceiro livro para o teste (id=3)
    const livroInserido = livroRepository.inserir({
        id: 3,
        nome: "duna",
        autor: "Frank Herbert",
        categoria: "ficção científica",
        disponivel: true
        
    });
    const livroAtualizadoEsperado = {
        nome: "duna",
        autor: "Frank Herbert",
        categoria: "ficção científica",
        id: 3
    };
    resultado = livroRepository.atualizar(3, {
        nome: "duna 2",
        categoria: "ficção científica",
        autor: "Frank Herbert",
        disponivel: true
    });
    expect(resultado).toEqual(livroAtualizadoEsperado);
    //Verificando se o livro foi atualizado no repositório
    expect(livroRepository.listar()).toContainEqual(livroAtualizadoEsperado);
})

//Cenário de exceção 1 - atualizar
test('Quando atualizar um livro com id inexistente, deve retornar undefined', () => {
    const resultado = livroRepository.atualizar(8, {
        nome: "Suco de Uva",
        autor: "João",
        categoria: "bebida",
    });
    expect(resultado).toBeUndefined();
});

//Cenário de exceção 2 - atualizar
test('Quando atualizar o livro sem categoria, não deve retornar e não atualiza na lista'
    , () => {
        //Criado o cenário (Errado, porque não deve atualizar - sem categoria)
        const livroAtualizadoErrado = {
            id: 3,
            nome: "duna 3",
            autor: "João",

        };
        //Atualizar o livro sem categoria
        const livroAtualizado = livroRepository.atualizar(3, {
            nome: "Suco de Laranja",
            autor: "João",
            disponivel: true
        });
        //O livro não deve retornar
        expect(livroAtualizado).toEqual(undefined);
        //Não deve inserir na lista o livro errado
        expect(livroRepository.listar()).not.toContainEqual(livroAtualizadoErrado);
    })

//Cenário de sucesso - pesquisarPorCategoria
test('Quando buscar pela categoria alimento, deve retornar pelo menos um livro (senhor dos anéis)', () => {
    const resultado = livroRepository.pesquisarPorCategoria("fantasia");
    //Podemos testar com o Length > 0:
    expect(resultado.length).toBeGreaterThan(0);
    //Conter o senhor dos anéis no retorno do indice 0 - esperado porque é o primeiro livro
    expect(resultado[0].nome).toBe("Senhor dos Anéis");
});


//Cenário de sucesso - pesquisarPorNomeLike
test('Quando buscar pelo nome "", deve retornar pelo menos um livro (Suco de Laranja)', () => {
    const resultado = livroRepository.pesquisarPorNome("suco");
    //Podemos testar com o Length > 0:
    expect(resultado.length).toBeGreaterThan(0);
    //Conter o suco de laranja no retorno do indice 0 - esperado porque é o primeiro livro
    expect(resultado[0].nome).toBe("Suco de Laranja");
});
