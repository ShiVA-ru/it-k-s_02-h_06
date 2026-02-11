import type { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import type { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import type { URIParamsId } from "../../../../core/types/uri-params.type";
import { commentsService } from "../../application/comments.service";
import type { CommentInput } from "../../types/comments.input.type";
import type { CommentView } from "../../types/comments.view.type";

export async function updateCommentHandler(
  req: RequestWithParamsAndBody<URIParamsId, CommentInput>,
  res: Response<CommentView | { message: string }>,
) {
  try {
    const isUpdated = await commentsService.updateById(req.params.id, req.body);

    if (!isUpdated) {
      return res
        .status(HttpStatus.NotFound)
        .send({ message: `comment not found` });
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
