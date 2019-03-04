import dotenv from 'dotenv'

import app from './src/app'

dotenv.config()

const port: number = parseInt(process.env.PORT, 10) || 2333

app.listen(port, (error: Error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`Listening on port ${port}.`)
  }
})
