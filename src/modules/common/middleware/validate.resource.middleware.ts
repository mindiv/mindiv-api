import express from 'express';
import { AnyZodObject } from 'zod';
import { respond, ResponseCode } from '../../../utilities/response/response';

const validateResource =
  (schema: AnyZodObject) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error: any) {
      respond(res, error.errors, '', ResponseCode.BAD_REQUEST);
    }
  };

export default validateResource;
