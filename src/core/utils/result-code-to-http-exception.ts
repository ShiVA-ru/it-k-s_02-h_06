import { HttpStatus } from "../types/http-statuses.types";
import { ResultStatus } from "../types/result.code";

export const resultCodeToHttpException = (resultCode: ResultStatus): number => {
  switch (resultCode) {
    case ResultStatus.BadRequest:
      return HttpStatus.BadRequest;
    case ResultStatus.Forbidden:
      return HttpStatus.Forbidden;
    default:
      return HttpStatus.InternalServerError;
  }
};
