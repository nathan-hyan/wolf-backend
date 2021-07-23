import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

import config from "@configs/server";
import handleError from "@helpers/handleError";
import "@configs/database";

import Users from "@routes/Users";
import Products from "@routes/Products";
import Sells from "@routes/Sells";
import { SESSION_CONFIG } from "@constants/main";

console.clear();

const app = express();
const PORT = config.server.port;
const {BACKOFFICE, FRONTEND, TEST_ENV} = process.env;

app.use(cors({ credentials: true, origin: [FRONTEND!, BACKOFFICE!, TEST_ENV!] }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(handleError);
app.set("trust proxy", 1);
app.use(session(SESSION_CONFIG));

app.use("/api/v1/users", Users);
app.use("/api/v1/products", Products);
app.use("/api/v1/sells", Sells);

app.listen(PORT, () => {
  console.log(`🦋 >> ${PORT}`);
});
