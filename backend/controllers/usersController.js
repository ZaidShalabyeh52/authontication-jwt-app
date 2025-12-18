import express from "express";
import passport, {
  signAccessToken,
  verifyRefreshToken,
  createRefreshToken,
} from "../controllers/passport.js";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import path from "path";

export async function createUserPost(req, res) {
  try {
    const { username, password, email } = req.body;

    if (!password || !username || !email) {
      return res
        .status(400)
        .json({ error: "username, eamil and password required" });
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
        if (err)
          return res.status(500).json({ message: "Authentication error" });
        if (!user) {
          return res
            .status(401)
            .json({ error: info?.message || "Authentication failed" });
        }

        const accessToken = signAccessToken(user);
        const rt = await createRefreshToken(user.id); // expects user (uses user.id)
        // createRefreshToken returns { token, expiresAt } in passport helper
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000, // 15 minutes
          path: "/",
        });

        res.cookie("refreshToken", rt.token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          path: "/refresh",
        });

        return res.json({
          message: "Logged in successfully",
          user: { id: user.id, username: user.username },
        });
      } catch (e) {
        return res.status(500).json({ message: "Login failed" });
      }
    }
  )(req, res, next);
}

export async function refreshTokenPost(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    const verified = await verifyRefreshToken(refreshToken);
    if (!verified)
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });

    const { user, refreshToken: oldToken } = verified;

    // rotate: delete old refresh token and issue a new one
    await prisma.refreshToken.delete({ where: { id: oldToken.id } });
    const newRt = await createRefreshToken(user.id);

    const accessToken = signAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", newRt.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/refresh",
    });

    return res.json({ message: "Token refreshed successfully" });
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
