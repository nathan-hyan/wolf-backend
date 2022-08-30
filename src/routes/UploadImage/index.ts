import express, { Request, Response } from "express";
import fs from 'fs';
import imgur from 'imgur';
import { ImgurResponse } from "./constants";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const files: string[] = []
  fs.readdirSync('./public').map(item => files.push(`./public/${item}`));

  try {
    let links: string[] = []
      const response = await imgur.uploadImages(files, 'File');
      response.map((item: ImgurResponse) => links.push(item.link))
      res.send({success: true, links});
      files.map(file => fs.unlinkSync(file))
  } catch (err) {
      console.log(err)
      res.send({success: false, message: 'Ocurrió un error subiendo la imágen'})
      files.map(file => fs.unlinkSync(file))
  }
});

export = router;
