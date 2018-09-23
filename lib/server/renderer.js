// @flow

/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
export function renderFullPage(
  content: string,
  props: any,
  entryName: string,
  bust: number | string
) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>gh</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/github.min.css">
     <link href="https://fonts.googleapis.com/css?family=Rajdhani" rel="stylesheet" />
     <link rel="stylesheet" href="/style.css?${bust}">
   </head>
   <body>
     <div id="app">${content}</div>
     <script>APP_PROPS = ${JSON.stringify(props)}</script>
     <script src="/${entryName}.js?${bust}"></script>
   </body>
 </html>
 `
}
