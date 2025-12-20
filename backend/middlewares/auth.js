import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Hard auth: require valid token, else 401/403
export async function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken || req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      res.clearCookie("accessToken", { path: "/" });
      res.clearCookie("refreshToken", { path: "/refresh" });
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = { id: user.id, username: user.username };
    return next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid!" });
  }
}

// Soft auth: attach user to req if a valid token is present; otherwise continue
export async function attachUserIfPresent(req, res, next) {
  const token = req.cookies?.accessToken || req.cookies?.token;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user
      .findUnique({ where: { id: payload.id } })
      .then((user) => {
        if (!user) {
          res.clearCookie("accessToken", { path: "/" });
          return res.status(401).json({ message: "User no longer exists" });
        }
        req.user = { id: user.id, username: user.username };
        return next();
      });
    req.user = payload;
  } catch (_) {
    // ignore invalid token; proceed without user
  }
  return next();
}
