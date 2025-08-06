import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
      .createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('sessionId').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable();
      })
      .createTable('tasks', (table) => {
        table.uuid('id').primary();
        table.string('userId')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.boolean('isComplete').defaultTo(false)
        table.timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable();
      })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users')
    .dropTable('tasks')
}

