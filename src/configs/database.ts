import mongoose from 'mongoose';

console.log('💾 >> Initializing...');

const MONGOOSE_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.DB_URI!, MONGOOSE_CONFIG, () => {
  console.log('💾 >> Ready');
});

