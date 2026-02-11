import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { idValidation } from "../../../core/middlewares/validation/params-id-validation.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard";
import { postInputDtoValidation } from "../validation/posts.input-dto.validation.middleware";
import { paginationSortingValidation } from "../validation/posts.query.validation.middleware";
import { createPostHandler } from "./handlers/posts.create.handler";
import { deletePostHandler } from "./handlers/posts.delete.handler";
import { getPostHandler } from "./handlers/posts.get.handler";
import { getPostListHandler } from "./handlers/posts.get-list.handler";
import { updatePostHandler } from "./handlers/posts.update.handler";

export const commentsRouter = Router();

//Заменить тип Response PostView на DTO

commentsRouter
  .get("/:id", idValidation, inputValidationResultMiddleware, getCommentHandler)
  //UPDATE
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )
  //\DELETE
  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
