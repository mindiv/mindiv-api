import GroupDao from '../daos/group.dao';
import { CreateGroupDto } from '../dto/create.group.dto';

class GroupService {
  async create(userId: string, resource: CreateGroupDto) {
    return GroupDao.createGroup(userId, resource);
  }

  async readByIdOrSlug(groupdIdOrSlug: string) {
    return GroupDao.getGroup(groupdIdOrSlug);
  }
}

export default new GroupService();
