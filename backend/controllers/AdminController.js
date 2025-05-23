import Admin from '../models/Admin.model.js';
import jwt from 'jsonwebtoken';

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: 'Admin not in Database' });
    }

    if (password !== admin.password) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, message: 'Admin successfully login', token });

  } catch (error) {
    res.json({ success: false, message: 'Error in admin login', error });
  }
};

export { adminLogin };
