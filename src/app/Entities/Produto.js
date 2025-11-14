const { EntitySchema } = require("typeorm");

const Produto = new EntitySchema({
    name: 'Produto',
    tableName: 'produtos',
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
        descricao: {
            type: 'varchar',
            length: 200,
            nullable: true,
        },
        categoria: {
            type: 'varchar',
            length: 200,
            nullable: false,
        },
        img_url: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },
        valor: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: true,
        },
        usuario_id: {
            type: 'int',
            nullable: false,
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
    },
    relations: {
        usuario: {
            target: 'Usuario',
            type: 'many-to-one',
            joinColumn: {
                name: 'usuario_id'
            }
        }
    }
})

module.exports = Produto