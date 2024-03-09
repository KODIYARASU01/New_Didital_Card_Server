import express from 'express';
import { getUser } from '../Controller/user.controller.js';

let router=express.Router();
router.get('/',getUser);

export default router;
