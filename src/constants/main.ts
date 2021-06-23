import session from 'express-session';
import mdbSession from 'connect-mongodb-session';

const MongoDbSession = mdbSession(session);

const store = new MongoDbSession({
  uri: process.env.DB_URI || '',
  collection: 'sessions',
});

export const SESSION_CONFIG = {
    name: 'hyanid',
    secret: process.env.KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    },
    store,
  };