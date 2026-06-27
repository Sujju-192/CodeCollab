import { Router } from 'express';
import User from '../Schemas/UserModel.js';

const userRoutes = Router();

userRoutes.post('/get-set-user', async (req, res) => {
  try {
    const { id, email, name } = req.body;
    console.log('[API] get-set-user request:', { id, email, name });

    if (!id || !email) {
      return res.status(400).json({ success: false, message: 'id and email are required' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { email, name },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('[API] get-set-user success:', { userId: user._id });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('[API] Error saving user:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default userRoutes;
