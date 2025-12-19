import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Hard auth: require valid token, else 401/403
export function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken || req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid!" });
  }
}

// Soft auth: attach user to req if a valid token is present; otherwise continue
export function attachUserIfPresent(req, res, next) {
  const token = req.cookies?.accessToken || req.cookies?.token;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (_) {
    // ignore invalid token; proceed without user
  }
  return next();
}
