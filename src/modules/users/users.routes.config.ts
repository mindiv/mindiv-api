import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controllers';
import UsersMiddleware from './middleware/users.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        UsersController.listUsers
      )
      .post(
        body('firstName').isString(),
        body('lastName').isString(),
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsError,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put(`/users/:userId`, [
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      body('permissionFlags').isInt(),
      BodyValidationMiddleware.verifyBodyFieldsError,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      body('permissionFlags').isInt(),
      BodyValidationMiddleware.verifyBodyFieldsError,
      UsersMiddleware.validatePatchEmail,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.patch,
    ]);

    return this.app;
  }
}
