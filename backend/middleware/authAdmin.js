import dotenv from 'dotenv';
dotenv.config();

export const requireAdmin = (req, res, next) => {
  const providedKey = req.header('x-admin-key') || req.query.adminKey;
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      success: false,
      message: 'Server admin configuration missing',
    });
  }

  if (!providedKey || providedKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: admin key invalid or missing',
    });
  }

  next();
};


