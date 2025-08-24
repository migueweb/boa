import dotenv from "dotenv";
import session from "express-session";
import FileStoreFactory from "session-file-store";


const FileStore = FileStoreFactory(session);

dotenv.config();

const sessionSetup = session({
  store: new FileStore({
    path: "./sessions",   // session directory
    ttl: 60 * 60 * 4,     // session life time in seconds (4h)
    retries: 1,           // read attempts before fail
  }),
  secret: process.env.APP_KEY, 
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,              // true if using https
    maxAge: 60 * 60 * 1000 *  4 // 4 hours in milliseconds
  }
})

export default sessionSetup