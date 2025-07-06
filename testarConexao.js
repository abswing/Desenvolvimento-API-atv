const { connect } = require('./repository/BD');
// Função para testar a conexão com o banco de dados
async function testarConexao() {
    try {
        const client = await connect();
        console.log('Conexão bem-sucedida!');
        client.release();
        process.exit(0); // Encerra o processo após sucesso
    } catch (err) {
        console.error('Erro ao conectar:', err);
        process.exit(1); // Encerra o processo após erro
    }
}

testarConexao();