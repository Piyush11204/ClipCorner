import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import  multer  from "multer";

const router = Router()

router.route("/register").post(
    (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
               
                return res.status(400).json({ message: err.message });
            } else if (err) {
              
                return res.status(500).json({ message: err.message });
            }
            
            next();
        });
    },
    registerUser
);


export default router;