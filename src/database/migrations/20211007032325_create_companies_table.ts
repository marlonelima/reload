import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('companies', function (table) {
    table.increments('id')
    table.string('business_name', 255).notNullable()
    table.string('suffix', 4).notNullable()
    table.string('industry', 255).notNullable()
    table.string('catch_phrase', 255).notNullable()
    table.string('bs_company_statement', 255).notNullable()
    table.string('logo', 255).notNullable()
    table.string('type', 10).notNullable()
    table.string('phone_number', 25).notNullable()
    table.string('full_address', 20).notNullable()
    table.string('latitude', 10).notNullable()
    table.string('longitude', 10).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('companies')
}
