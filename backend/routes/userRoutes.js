import express from 'express';
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { requireAdmin } from '../middleware/authAdmin.js';

const router = express.Router();

// POST /api/user/register - Register new user
router.post('/register', registerUser);

// GET /api/user/all - Get all users (must be before /:id route)
router.get('/all', requireAdmin, getAllUsers);

// GET /api/user/:id - Get user by ID (public emergency profile)
router.get('/:id', getUserById);

// PUT /api/user/:id - Update user
router.put('/:id', requireAdmin, updateUser);

// DELETE /api/user/:id - Delete user
router.delete('/:id', requireAdmin, deleteUser);

export default router;

