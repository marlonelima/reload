import { Response } from 'restify'

const errorHandler = (res: Response, code: number, message: string) => {
  res.status(code)
  res.send({ code, message })
}

export default errorHandler
