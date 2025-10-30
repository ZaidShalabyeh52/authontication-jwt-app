import express from "express";
import passport, {
  signAccessToken,
  verifyRefreshToken,
  createRefreshToken,
} from "../controllers/passport.js";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

export async function createUserPost(req, res) {
  try {
    const { username, password } = req.body;

    if (!password || !username) {
      return res.status(400).json({ error: "username and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        useranme,
        email,
        password: hashedPassword,
      },
      select: { id: true, username: true, email: true },
    });

    return res.status(201).json(user);
  } catch (err) {
    const message =
      err?.code === "P2002"
        ? "Username or email already in use"
        : "Failed to create user";
    return res.status(500).json({ error: message });
  }
}

export async function logInPost(req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      try {
        if (err) return next(err);
        if (!user) {
          return res
            .status(401)
            .json({ error: info?.message || "Authentication failed" });
        }

        const accessToken = signAccessToken(user);
        const rt = await createRefreshToken(user.id); // expects user (uses user.id)
        // createRefreshToken returns { token, expiresAt } in passport helper
        return res.json({
          accessToken,
          refreshToken: rt.token,
          expiresAt: rt.expiresAt,
        });
      } catch (e) {
        return next(e);
      }
    }
  )(req, res, next);
}

export async function refreshTokenPost(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token required" });
    }

    const verified = await verifyRefreshToken(refreshToken);
    if (!verified)
      res.status(401).json({ error: "Invalid or expired refresh token" });

    const { user, refreshToken: oldToken } = verified;

    // rotate: delete old refresh token and issue a new one
    await prisma.refreshToken.delete({ where: { id: oldToken.id } });
    const newRt = await createRefreshToken(user.id);

    const accessToken = signAccessToken(user);

    return res.json({
      accessToken,
      refreshToken: newRt.token,
      expiresAt: newRt.expiresAt,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to refresh token" });
  }
}

export async function logOutPost(req, res) {
  try {
    const { refreshToken, revokeAll, userId } = req.body;

    if (revokeAll && userId) {
      await prisma.refreshToken.deleteMany({ where: { userId } });
      return res.json({ message: "Logged out from all devices" });
    }

    if (!refreshToken)
      return res.status(400).json({ error: "Refresh token required" });

    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  } catch (err) {
    return res.status(500).json({ error: "Failed to log out" });
  }
}
