// @flow

export default function htmlRenderer(
  req: express$Request & { user: * },
  res: express$Response,
  next: express$NextFunction
) {
  if (/\/api/.test(req.url) || req.url === '/favicon.ico') return next()
  res.send(
    renderFullPage(
      process.env.NODE_ENV === 'production' ? '' : Number(new Date())
    )
  )
}

/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
export function renderFullPage(bust: number | string) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>gh</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/github.min.css">
     <link href="https://fonts.googleapis.com/css?family=Rajdhani" rel="stylesheet" />
   </head>
   <body>
     <div id="app"></div>
     <script src="/main.js?${bust}"></script>
   </body>
 </html>
 `
}
