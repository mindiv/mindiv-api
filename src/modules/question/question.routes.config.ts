import { CommonRoutesConfig } from '../common/common.routes.config';
import QuestionController from './controller/question.controller';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import { body } from 'express-validator';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import QuestionMiddleware from './middleware/question.middleware';

export class QuestionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'QuestionRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/question`)
      .get(QuestionController.getAllQuestion)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        body('question').isString(),
        body('options').isArray(),
        body('correctOption').isInt(),
        body('categoryId').isString(),
        body('collectionId').isString(),
        body('difficulty').isString(),
        BodyValidationMiddleware.verifyBodyFieldsError,
        QuestionController.createQuestion
      );

    this.app
      .route(`/api/question/:questionId`)
      .all(QuestionMiddleware.validateQuestionExists)
      .get(QuestionController.getOneQuestion);
    return this.app;
  }
}
