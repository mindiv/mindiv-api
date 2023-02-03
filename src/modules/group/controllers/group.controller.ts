import express from 'express';
import GroupService from '../services/group.service';
import debug from 'debug';
import { respond, ResponseCode } from '../../../utilities/response/response';

const log: debug.IDebugger = debug('app:group-controller');

class GroupController {
  async createGroup(req: express.Request, res: express.Response) {
    const userId = res.locals.jwt.userId;
    const group = await GroupService.create(userId, req.body);
    respond(res, group, 'Group created successfully', ResponseCode.CREATED);
  }

  async getGroups(req: express.Request, res: express.Response) {
    const groups = await GroupService.list();
    respond(res, groups);
  }

  async getGroup(req: express.Request, res: express.Response) {
    const groupIdOrSlug = req.params.groupIdOrSlug;
    const group = await GroupService.readByIdOrSlug(groupIdOrSlug);
    respond(res, group);
  }

  async updateGroup(req: express.Request, res: express.Response) {
    const groupId = req.params.groupIdOrSlug;
    const group = await GroupService.update(groupId, req.body);
    const message = 'Group updated successfully';
    respond(res, group, message);
  }

  async deleteGroup(req: express.Request, res: express.Response) {
    const groupId = req.params.groupIdOrSlug;
    const group = await GroupService.delete(groupId);
    const message = 'Group deleted successfully';
    respond(res, group, message);
  }
}

export default new GroupController();
