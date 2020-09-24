exports.up = function(Knex){
    return Knex.schema.createTable('user', function(table){
        table.increments().primary();
        table.string('userName').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('password').notNullable();

})};

exports.down = function(Knex){
    return Knex.schema.dropTable('user');
}