/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
export function renderFullPage (content, props, entryName) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title></title>
     <link rel="stylesheet" href="/style.css">
   </head>
   <body>
     <div id="app">${content}</div>
     <script>APP_PROPS = ${JSON.stringify(props)}</script>
     <script src="/${entryName}.js"></script>
   </body>
 </html>
 `
}
