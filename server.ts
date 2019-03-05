import dotenv from 'dotenv'

import app from './src/app'

import { SERVER_LISTENING_MSG } from './src/constants/strings'
import { PORT } from './src/constants/numbers'

dotenv.config()

const port: number = parseInt(process.env.PORT, 10) || PORT

app.listen(port, (error: Error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(SERVER_LISTENING_MSG(port))
  }
})
