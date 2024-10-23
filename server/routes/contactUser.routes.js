import { Router } from 'express';
import { contactUser } from '../controllers/contactUser.controller.js';

const router = Router();

router.route("/contact-us").post(contactUser);

export default router;