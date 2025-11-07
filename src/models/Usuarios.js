// representa os dados o que o objeto tem atributos campos colunas
// o que eu preciso saber sobre o objeto 

const Usuarios = [
    {
        id: 1, 
        nome: 'administrador', 
        email: 'admin@admin.com', 
        senha: '123456',
        created_at: new Date(), // data atual
        updated_at: new Date(),
        deleted_at: null,
    }
]

module.exports = Usuarios;