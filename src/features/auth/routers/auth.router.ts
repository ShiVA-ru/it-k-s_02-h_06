import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { loginInputDtoValidation } from "../validation/auth.input-dto.validation.middleware";
import { loginHandler } from "./handlers/auth.login.handler";

export const authRouter = Router();

authRouter.post(
  "/login",
  loginInputDtoValidation,
  inputValidationResultMiddleware,
  loginHandler,
);
// .get("/me", getUserHandler);
