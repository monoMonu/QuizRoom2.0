import { Router } from "express";
import { fetchLeaderboard, getStats, setStats, updatePlays } from "../controllers/stats.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/getstats').get(authUser , getStats);
router.route('/setstats').post(authUser, setStats);
router.route('/updateplays').get(authUser, updatePlays);
router.route('/leaderboard').get(authUser, fetchLeaderboard);

export default router;