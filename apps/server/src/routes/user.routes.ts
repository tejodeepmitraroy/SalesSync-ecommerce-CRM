import { Router } from 'express';
import {
	deleteUserProfile,
	forgetPassword,
	getUserNotification,
	getUserSettings,
	registerClient,
	resetLink,
	updateUserProfile,
	updateUserSettings,
	userProfile,
} from '../controllers/user.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

//Register routes
router.route('/register').post(registerClient);

router
	.route('/profile')
	.get(jwtAuthMiddleware, userProfile)
	.put(jwtAuthMiddleware, updateUserProfile)
	.delete(jwtAuthMiddleware, deleteUserProfile);

router
	.route('/settings')
	.get(jwtAuthMiddleware, getUserSettings)
	.put(jwtAuthMiddleware, updateUserSettings);

router.route('/notification').get(jwtAuthMiddleware, getUserNotification);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-link').post(resetLink);

export default router;
