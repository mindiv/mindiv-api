import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;
  private mongooseOptions = {};

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
      .connect(
        'mongodb://localhost:27017/ripple-trivia-db',
        this.mongooseOptions
      )
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
