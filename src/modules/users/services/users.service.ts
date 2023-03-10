import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUseDto } from '../dto/patch.user.dto';

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string): Promise<any> {
    return UsersDao.removeUserById(id);
  }

  async list() {
    return UsersDao.getUsers();
  }

  async patchById(id: string, resource: PatchUseDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUsersByEmailWithPassword(email);
  }
}

export default new UsersService();
