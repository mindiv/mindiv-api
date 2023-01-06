import { CommonRoutesConfig } from '../common/common.routes.config';
import CategoryController from './controllers/category.controller';
import express from 'express';

export class CategoryRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CategoryRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/category`).post(CategoryController.createCategory);

    return this.app;
  }
}
