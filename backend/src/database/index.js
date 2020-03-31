import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('MongoDB sucessfully connected'))
      .catch(error => console.error('MongoDB could not connect:', error));
  }
}

export default new Database();
