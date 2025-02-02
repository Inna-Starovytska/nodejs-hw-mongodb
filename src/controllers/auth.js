// import createHttpError from "http-errors";

import {
  register,
  login,
  refreshUserSession,
  logout,
} from "../services/auth.js";

// import { resetPassword } from '../services/auth.js';

const setupSession = (res, session) => {
  const { _id, refreshToken, refreshTokenValidUntil } = session;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie("sessionId", _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const data = await register(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered user",
    data,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully login user",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUserSession(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully refresh session",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logout(req.cookies.sessionId);
  }

  res.clearCookie("SessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};



