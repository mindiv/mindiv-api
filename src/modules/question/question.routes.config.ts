import { CommonRoutesConfig } from '../common/common.routes.config';
import QuestionController from './controller/question.controller';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import QuestionMiddleware from './middleware/question.middleware';
import validateResource from '../common/middleware/validate.resource.middleware';
import { createQuestionSchema } from './schema/question.schema';

export class QuestionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'QuestionRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/api/question`)
      .get(QuestionController.getQuestions)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        validateResource(createQuestionSchema),
        QuestionController.createQuestion
      );

    this.app
      .route('/api/question/questions_to_answer/:category/:difficulty/:count')
      .get(QuestionController.getQuestionsToAnswer);

    this.app
      .route(`/api/question/:questionId`)
      .all(QuestionMiddleware.validateQuestionExists)
      .get(QuestionController.getOneQuestion);

    this.app
      .route(`/api/question/:questionId`)
      .all(
        QuestionMiddleware.validateQuestionExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        )
      )
      .put(QuestionController.updateQuestion)
      .delete(QuestionController.deleteQuestion);
    return this.app;
  }
}
