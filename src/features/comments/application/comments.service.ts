import { ResultStatus } from "../../../core/types/result.code";
import { Result } from "../../../core/types/result.type";
import { commentsRepository } from "../repositories/comments.repository";
import type { CommentInput } from "../types/comments.input.type";

export const commentsService = {
  // async create(dto: CommentInput): Promise<string | null> {
  //   const blogEntity = await commentsRepository.findOneById(dto.blogId);

  //   if (!blogEntity) {
  //     return null;
  //   }

  //   const newEntity: PostDb = {
  //     title: dto.title,
  //     shortDescription: dto.shortDescription,
  //     content: dto.content,
  //     blogId: dto.blogId,
  //     blogName: blogEntity.name,
  //     createdAt: new Date().toISOString(),
  //   };

  //   return postsRepository.create(newEntity);
  // },

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
