import { Knex } from 'knex'
import dataset from '../dataset.json'

export async function seed(knex: Knex): Promise<void> {
  await knex('contributors').del()
  await knex('desktops').del()
  await knex('companies').del()

  for (const company of dataset as any[]) {
    const { contributors, desktops, ...companyData } = company
    await knex('companies').insert(companyData).onConflict('id').ignore()

    console.log(Date(), company.business_name)

    for (const contributor of contributors) {
      const { firstName, lastName, jobTitle, ...contributorData } = contributor

      await knex('contributors')
        .insert({
          ...contributorData,
          first_name: firstName,
          last_name: lastName,
          job_title: jobTitle,
          fk_company: companyData.id
        })
        .onConflict('id')
        .ignore()
    }

    for (const desktop of desktops) {
      await knex('desktops')
        .insert({ ...desktop, fk_company: companyData.id })
        .onConflict('id')
        .ignore()
    }
  }
}
