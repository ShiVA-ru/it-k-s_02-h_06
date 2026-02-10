import type { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import type { RequestWithBody } from "../../../../core/types/request.types";
import { authService } from "../../application/auth.service";
import type { LoginInput } from "../../types/login.input.type";
import { ResultStatus } from "../../../../core/types/result.code";

export const loginHandler = async (
  req: RequestWithBody<LoginInput>,
  res: Response,
) => {
  const { loginOrEmail, password } = req.body;

  const result = await authService.loginUser(loginOrEmail, password);
  if (result.status !== ResultStatus.Success)
    return res.sendStatus(HttpStatus.Unauthorized);

  return res.status(HttpStatus.Ok).json(result.data);
};
