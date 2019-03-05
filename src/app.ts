import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'

import apolloServer from './graphql'
import { LoggerStream } from './utils/logger'

import { APP_NAME, ROOT_ROUTE_MSG, CORS_METHODS } from './constants/strings'
import { OK } from './constants/numbers/serverStatus'

const app = express()

app.use(
  cors({
    methods: CORS_METHODS,
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

apolloServer.applyMiddleware({ app })

app.use('/', (_, res) => res.status(OK).send(ROOT_ROUTE_MSG(APP_NAME)))

export default app
