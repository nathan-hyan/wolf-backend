import session, { Store } from "express-session";
import mdbSession from "connect-mongodb-session";

const MongoDbSession = mdbSession(session);

const store = new MongoDbSession({
  uri: process.env.DB_URI || "",
  collection: "sessions",
});

interface SessionConfig {
  name: string;
  secret: string;
  resave: false;
  saveUninitialized: false;
  cookie: {
    httpOnly: true;
    maxAge: number;
    sameSite: "none" | "lax";
    secure: boolean; // must be true if sameSite='none'
  };
  store: Store;
}

export const SESSION_CONFIG: SessionConfig = {
  name: "hyanid",
  secret: process.env.KEY!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
    secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
  },
  store,
};
