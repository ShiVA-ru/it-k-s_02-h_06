import type { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import type { RequestWithParams } from "../../../../core/types/request.types";
import type { URIParamsId } from "../../../../core/types/uri-params.type";
import { commentsService } from "../../application/comments.service";

export async function deleteCommentHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response,
) {
  try {
    const isDeleted = await commentsService.deleteById(req.params.id);

    if (!isDeleted) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    return res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
