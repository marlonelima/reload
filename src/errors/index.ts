import { Response } from 'restify'

export const errorHandler = (res: Response, code: number, message: string) => {
  res.status(code)
  res.send({ code, message })
}
