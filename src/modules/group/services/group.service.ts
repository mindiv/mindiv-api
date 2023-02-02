import GroupDao from '../daos/group.dao';
import { CreateGroupDto } from '../dto/create.group.dto';

class GroupService {
  async create(userId: string, resource: CreateGroupDto) {
    return GroupDao.createGroup(userId, resource);
  }
}

export default new GroupService();
