import multer from "multer";
import imgur from 'imgur';
import path from 'path'

imgur.setClientId(process.env.IMGUR_CLIENT_API_KEY);
imgur.setAPIUrl('https://api.imgur.com/3/');
  
const storage = multer.diskStorage({
    destination: './public',
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
export const upload = multer({storage});
  