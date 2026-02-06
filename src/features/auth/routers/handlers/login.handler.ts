import type { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import type { RequestWithBody } from "../../../../core/types/request.types";
import { authService } from "../../application/auth.service";
import type { LoginInput } from "../../types/login.input.type";

export const loginHandler = async (
  req: RequestWithBody<LoginInput>,
  res: Response,
) => {
  const { loginOrEmail, password } = req.body;

  const accessToken = await authService.loginUser(loginOrEmail, password);
  if (!accessToken) return res.sendStatus(HttpStatus.Unauthorized);

  return res.sendStatus(HttpStatus.NoContent);
};
