import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({
     storage,
     limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
     fileFilter: (req, file, cb) => {
         const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
         if (!allowedTypes.includes(file.mimetype)) {
             return cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
         }
         cb(null, true);
     },
 }).fields([
     { name: "avatar", maxCount: 1 },
     { name: "cover", maxCount: 1 },
     ]);