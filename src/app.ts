import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'

import { LoggerStream } from './utils/logger'
import { APP_NAME, ROOT_ROUTE_MSG } from './constants/strings'

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

app.use('/', (_, res) => res.status(200).send(ROOT_ROUTE_MSG(APP_NAME)))

export default app
