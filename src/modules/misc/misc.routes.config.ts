import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import MiscController from './controllers/misc.controller';

export class MiscRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MiscRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/api/stats`).get(MiscController.getStats);
    return this.app;
  }
}
