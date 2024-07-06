import { Router } from "express";
import { getStats, setStats } from "../controllers/stats.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/getstats').get(authUser , getStats);
router.route('/setstats').post(authUser, setStats);

export default router;