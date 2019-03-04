import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'

import { LoggerStream } from './utils/logger'
import packageJson from '../package.json'

const app = express()

app.use(
  cors({
    methods: 'POST,GET,OPTIONS',
  }),
)

app.use(morgan('dev', { stream: new LoggerStream() }))

app.use(
  compression({
    threshold: 0,
  }),
)

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use('/', (_, res) => res.status(200).send(`Server is running!`))

export default app
