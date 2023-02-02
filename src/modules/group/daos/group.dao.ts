import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateGroupDto } from '../dto/create.group.dto';
import generateSlug from '../../../utilities/generateSlug';

const log: debug.IDebugger = debug('app:group-dao');

class GroupDao {
  Schema = mongooseService.getMongoose().Schema;

  groupSchema = new this.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    cover: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    category: { type: this.Schema.Types.ObjectId, ref: 'Category' },
    collectionId: { type: this.Schema.Types.ObjectId, ref: 'Collection' },
    user: { type: this.Schema.Types.ObjectId, ref: 'User' },
  });

  Group = mongooseService.getMongoose().model('Group', this.groupSchema);

  constructor() {
    log('Created new instance of GroupDao');
  }

  async createGroup(userId: string, groupFields: CreateGroupDto) {
    const slug = generateSlug(groupFields.name);
    const group = new this.Group({
      user: userId,
      slug,
      ...groupFields,
    });
    await group.save();
    return group;
  }
}

export default new GroupDao();
