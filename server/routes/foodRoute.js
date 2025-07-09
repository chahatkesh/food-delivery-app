import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Sanitize filename: replace spaces with underscores and remove special characters
    const sanitizedName = file.originalname
      .replace(/\s+/g, '_')  // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9._-]/g, '')  // Remove special characters except dots, underscores, and hyphens
      .toLowerCase();  // Convert to lowercase
    return cb(null, `${Date.now()}_${sanitizedName}`)
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
})

foodRouter.post("/add", upload.single("image"), (error, req, res, next) => {
  if (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.json({ success: false, message: "File too large. Maximum size is 5MB." });
      }
      return res.json({ success: false, message: `Upload error: ${error.message}` });
    }
    return res.json({ success: false, message: error.message });
  }
  next();
}, addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)



export default foodRouter;