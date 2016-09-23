import fs from 'fs'

import app from './app'

const config = app.get('config')

app.listen(config.PORT, () => {
  // create repos directory
  if (!fs.existsSync(config.REPO_ROOT)) {
    fs.mkdirSync(config.REPO_ROOT)
  }
  console.log(`start on port ${config.PORT}`)
})
