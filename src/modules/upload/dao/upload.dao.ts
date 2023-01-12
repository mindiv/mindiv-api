import mongooseService from '../../common/services/mongoose.service';

class UploadDao {
  Schema = mongooseService.getMongoose().Schema;

  uploadSchema = new this.Schema({});
}
