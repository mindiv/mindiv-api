import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './docs/swaggerDef';

import { CommonRoutesConfig } from './modules/common/common.routes.config';
import { UsersRoutes } from './modules/users/users.routes.config';
import { AuthRoutes } from './modules/auth/auth.routes.config';
import { CategoryRoutes } from './modules/category/category.routes.config';
import { CollectionRoutes } from './modules/collection/collection.routes.config';
import { QuestionRoutes } from './modules/question/question.routes.config';
import { MiscRoutes } from './modules/misc/misc.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const specs = swaggerJsDoc(options);

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new AuthRoutes(app));
routes.push(new UsersRoutes(app));
routes.push(new CategoryRoutes(app));
routes.push(new CollectionRoutes(app));
routes.push(new QuestionRoutes(app));
routes.push(new MiscRoutes(app));

// this is a simple route to mae sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  // only exception to avoid console.log()
  console.log(runningMessage);
});
