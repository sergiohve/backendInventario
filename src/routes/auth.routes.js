import { Router } from "express";
import {
  accessTokenCtrl,
  loginCtrl,
  registerCtrl,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginCtrl);
router.post("/accessToken", accessTokenCtrl);
router.post("/register", registerCtrl);

export default router;
