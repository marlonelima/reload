import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contributors', function (table) {
    table.increments('id')
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('title', 255).notNullable()
    table.string('job_title', 255).notNullable()
    table.integer('age', 3).notNullable()
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
  return knex.schema.dropTable('contributors')
}
