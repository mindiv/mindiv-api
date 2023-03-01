import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

// @ts-expect-error
const mongoUriLocal: string = process.env.MONGO_URI_LOCAL;
// @ts-expect-error
const mongoUri: string = process.env.MONGO_URI;

class MongooseService {
  private count = 0;
  private mongooseOptions = {};
  private dev = process.env.DEV === 'development';

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)');
    mongoose.set('strictQuery', false);
    mongoose
      .connect(mongoUri, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `MongoDb connection unsuccessful (will retry in #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();
