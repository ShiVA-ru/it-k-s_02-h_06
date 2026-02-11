import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { idValidation } from "../../../core/middlewares/validation/params-id-validation.middleware";
import { accessTockenGuardMiddleware } from "../../auth/middlewares/access-token.guard";
import { commentInputDtoValidation } from "../validation/comments.input-dto.validation.middleware";

export const commentsRouter = Router();

//Заменить тип Response PostView на DTO

commentsRouter
  .get("/:id", idValidation, inputValidationResultMiddleware, getCommentHandler)
  //UPDATE
  .put(
    "/:id",
    accessTockenGuardMiddleware,
    idValidation,
    commentInputDtoValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )
  //\DELETE
  .delete(
    "/:id",
    accessTockenGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
