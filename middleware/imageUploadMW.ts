import { Request } from "express";
const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensureDirectoryExists(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const title = req.body.title;
    const folderPath = path.join("./assets/images/products", title);
    ensureDirectoryExists(folderPath);
    cb(null, folderPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fieldname = file.fieldname ?? 'additionalImage';
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    cb(null, (fieldname === "mainImage") ? "0.jpg" : (files?.[fieldname]?.length ?? 0) + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });

export default upload;