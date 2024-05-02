import { Router } from "express";
import { getStats, setStats } from "../controllers/stats.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/getstats').get(verifyJWT , getStats);
router.route('/setstats').post(verifyJWT, setStats);

export default router;