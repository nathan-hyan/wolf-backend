import express, { Request, Response } from "express";
import fs from 'fs';
import imgur from 'imgur';
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const file = req.file;

  try {
      const {link} = await imgur.uploadFile(`./public/${file?.filename}`);
      res.send({success: true, link});
      fs.unlinkSync(`./public/${file?.filename}`)
  } catch (err) {
      res.send({success: false, message: err.message})
  }
});

export = router;
