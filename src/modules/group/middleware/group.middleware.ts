import express from 'express';
import debug from 'debug';
import generateSlug from '../../../utilities/generateSlug';
import { respond, ResponseCode } from '../../../utilities/response/response';
import GroupService from '../services/group.service';

const log: debug.IDebugger = debug('app:group-middleware');

class GroupMiddleware {
  async validateSameGroupDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const slug = generateSlug(req.body.name);
    const group = await GroupService.readByIdOrSlug(slug);
    if (group) {
      respond(res, {}, 'Group already exists', ResponseCode.BAD_REQUEST);
    } else {
      next();
    }
  }

  async validateGroupExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const group = await GroupService.readByIdOrSlug(
      req.params.collectionIdOrSlug
    );

    if (group) {
      res.locals.group = group;
      next();
    } else {
      respond(res, {}, 'No Group found', ResponseCode.BAD_REQUEST);
    }
  }
}

export default new GroupMiddleware();
