import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from "../controllers/auth.js";
import  ctrlWrapper  from "../utils/ctrlWrapper.js";
import  validateBody  from "../utils/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../validation/auth.js";

const authRouter = Router();
authRouter.post( "/register",  validateBody(authRegisterSchema),  ctrlWrapper(registerController),);

authRouter.post("/login",  validateBody(authLoginSchema),  ctrlWrapper(loginController),);

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

export default authRouter;