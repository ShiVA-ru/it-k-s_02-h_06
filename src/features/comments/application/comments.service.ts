import type { IdType } from "../../../core/types/id.types";
import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";
import { postsRepository } from "../../posts/repositories/posts.repository";
import { usersRepository } from "../../users/repositories/users.repository";
import { commentsRepository } from "../repositories/comments.repository";
import type { CommentDb } from "../types/comments.db.type";
import type { CommentInput } from "../types/comments.input.type";

export const commentsService = {
  async create(
    userId: string,
    postId: string,
    dto: CommentInput,
  ): Promise<Result<IdType | null>> {
    const postEntity = await postsRepository.findOneById(postId);

    if (!postEntity) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: "Post not found",
        extensions: [],
        data: null,
      };
    }

    const userEntity = await usersRepository.findOneById(userId);

    if (!userEntity) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: "User not found",
        extensions: [],
        data: null,
      };
    }

    const newEntity: CommentDb = {
      content: dto.content,
      postId: postId,
      commentatorInfo: {
        userId: userId,
        userLogin: userEntity.login,
      },
      createdAt: new Date().toISOString(),
    };

    const commentId = await commentsRepository.create(newEntity);

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: { id: commentId },
    };
  },

  async updateById(id: string, dto: CommentInput): Promise<boolean | null> {
    const isUpdated = await commentsRepository.updateById(id, dto);

    if (!isUpdated) {
      return null;
    }

    return true;
  },

  async deleteById(id: string): Promise<boolean> {
    return await commentsRepository.deleteById(id);
  },
};
