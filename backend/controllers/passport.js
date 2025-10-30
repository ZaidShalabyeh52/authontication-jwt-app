import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await prisma.user.findUniqe({ where: { username } });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await prisma.user.findUniqe({ where: { id: payload.sub } });

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// sign short-lived access token
export function signAccessToken(user) {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

// create and persist a refresh token
export async function createRefreshToken(userId) {
  const raw = crypto.randomBytes(64).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const token = tokenHash;
  const expiresAt = new Date(Date.now + 7 * 24 * 60 * 60 * 1000); // 7 days
  await prisma.refreshToken.create({
    data: {
      token,
      expiresAt,
      user: { connect: { id: userId } },
    },
  });
  return { token: raw, expiresAt };
}

// verify refresh token and return associated user (or null)
export async function verifyRefreshToken(rawToken) {
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const rt = await prisma.refreshToken.findUniqe({
    where: { token: tokenHash },
  });
  if (!rt || rt.expiresAt < new Date()) {
    return null;
  }
  const user = await prisma.user.findUnique({ where: { id: rt.userId } });
  if (!user) {
    return null;
  }
  return { user, refreshToken: rt };
}

// keep for compatibility if sessions are later used
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
