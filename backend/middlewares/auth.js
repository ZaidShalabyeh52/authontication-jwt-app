import jwt from "jsonwebtoken";

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
