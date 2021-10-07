import { Knex } from 'knex'
import dataset from '../fake.json'

export async function seed(knex: Knex): Promise<void> {
  await knex('companies').del()
  await knex('contributors').del()
  await knex('desktops').del()

  for (const company of dataset) {
    const { contributors, desktops, ...companyData } = company
    await knex('companies').insert(companyData)

    for (const contributor of contributors) {
      const { firstName, lastName, jobTitle, ...contributorData } = contributor

      await knex('contributors').insert({
        ...contributorData,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        fk_company: companyData.id
      })
    }

    for (const desktop of desktops) {
      await knex('desktops').insert({ ...desktop, fk_company: companyData.id })
    }
  }
}
