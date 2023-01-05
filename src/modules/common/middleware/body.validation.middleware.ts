import express from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
  verifyBodyFieldsError(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()) {
      return res.status(400).send({ errors: errrors.array() });
    }
    next();
  }
}

export default new BodyValidationMiddleware();
