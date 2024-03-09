import express from "express";

let router = express.Router();
import { signUp,signIn } from "../Controller/auth.controller.js";

router.post("/signup", signUp);
router.post('/signin',signIn);

export default router;
