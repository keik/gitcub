// @flow

import Git from 'nodegit'

export default function errorHandlingMiddleware(
  err: Error,
  req: express$Request,
  res: express$Response,
  // eslint-disable-next-line
  next: express$NextFunction
) {
  console.log(err.stack)

  // $FlowFixMe
  if (err.errno === Git.Error.CODE.ENOTFOUND)
    return res.status(404).json({ message: err.message })

  res.status(500)
  res.json({
    errors: {
      message: err.message,
      error: err
    }
  })
}
