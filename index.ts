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
import { ROUTE, SESSION_CONFIG } from "@constants/main";

import UploadImage from "@routes/UploadImage";
import { upload } from "@configs/filesUploading";

import '@helpers/whatsapp'

console.clear();

const app = express();
const PORT = config.server.port;
const {BACKOFFICE, FRONTEND, TEST_ENV} = process.env;

app.use(upload.any())
app.use(cors({ credentials: true, origin: [FRONTEND!, BACKOFFICE!, TEST_ENV!] }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(handleError);
app.set("trust proxy", 1);
app.use(session(SESSION_CONFIG));

app.use(`${ROUTE}/users`, Users);
app.use(`${ROUTE}/products`, Products);
app.use(`${ROUTE}/sells`, Sells);
app.use(`${ROUTE}/upload`, UploadImage)

app.listen(PORT, () => {
  console.log(`🦋 >> ${PORT}`);
});
