import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('desktops', function (table) {
    table.increments('id')
    table.string('platform', 50).notNullable()
    table.string('type', 50).notNullable()
    table.string('os', 50).notNullable()
    table.string('ip', 15).notNullable()
    table
      .integer('fk_company', 10)
      .unsigned()
      .index()
      .references('id')
      .inTable('companies')
      .notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('desktops')
}
