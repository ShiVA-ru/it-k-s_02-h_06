import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses.types";
import { jwtService } from "../application/jwt.service";
import { ResultStatus } from "../../../core/types/result.code";

export const accessTockenGuardMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const [authType, token] = req.headers.authorization.split(" ");
  if (authType !== "Bearer") {
    res.sendStatus(HttpStatus.Unauthorized);
  }

  const result = await jwtService.verifyToken(token);

  if (result.data === null || result.status === ResultStatus.Forbidden) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  req.user = { id: result.data.id };
  next();
};
