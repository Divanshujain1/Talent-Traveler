const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // keep secret in .env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if Authorization header is sent
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // 2. Extract token from "Bearer token"
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // 4. Attach user info to req object
    req.user = decoded;
    
    // 5. Pass control to next middleware/controller
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
