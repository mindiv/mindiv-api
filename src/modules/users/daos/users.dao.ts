import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUseDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { PermissionFlag } from '../../common/middleware/common.permissionflag.enum';

const log: debug.IDebugger = debug('app:user-dao');

class UsersDao {
  users: Array<CreateUserDto> = [];

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      email: String,
      password: { type: String, select: false },
      firstName: String,
      lastName: String,
      permissionFlags: Number,
    },
    { timestamps: true }
  );

  User = mongooseService.getMongoose().model('User', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  async addUser(userFields: CreateUserDto) {
    const user = new this.User({
      ...userFields,
      permissionFlags: PermissionFlag.FREE_PERMISSION,
    });
    await user.save();
    return user;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId });
  }

  async getUsers() {
    return this.User.find()
    .exec();
  }

  async updateUserById(userId: string, userFields: PatchUseDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async getUsersByEmailWithPassword(email: string) {
    return this.User.findOne({ email: email })
      .select('id email permissionFlags +password')
      .exec();
  }
}

export default new UsersDao();
