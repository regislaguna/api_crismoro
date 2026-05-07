const { EntitySchema } = require("typeorm");

const Usuario = new EntitySchema({
    name: 'Usuario',
    tableName: 'usuarios',
    columns: {
        id: {
            type: 'int',
            nullable: false,
            primary: true,
            generated: 'increment',
        },
        nome: {
            type: 'varchar',
            length: 100,
            nullable: false
        },
        email: {
            type: 'varchar',
            length: 100,
            unique: true,
        },
        senha: {
            type: 'varchar',
            length: 255,
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            createDate: true,
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            updateDate: true,
        },
        deletedAt: {
            name: 'deleted_at',
            type: 'timestamp',
            nullable: true,
            deleteDate: true,
        }

    }
})

module.exports = Usuario;