export interface Desktop {
  id: number
  platform: string
  type: string
  os: string
  ip: string
}

export interface Contributor {
  id: string
  first_name: string
  last_name: string
  title: string
  job_title: string
  age: number
}

export interface Company {
  id: number
  business_name: string
  suffix: string
  industry: string
  catch_phrase: string
  bs_company_statement: string
  logo: string
  type: string
  phone_number: string
  full_address: string
  latitude: string
  longitude: string
}
