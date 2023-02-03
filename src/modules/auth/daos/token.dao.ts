import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:tokendao');

class TokenDao {
  Schema = mongooseService.getMongoose().Schema;

  tokenSchema = new this.Schema({
    userId: { type: this.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // expiry in seconds
    },
  });

  Token = mongooseService.getMongoose().model('Token', this.tokenSchema);

  constructor() {
    log('Created new instance of TokenDao');
  }
}

export default new TokenDao();
