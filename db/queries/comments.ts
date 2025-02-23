import type { Comment } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/db/prisma";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export const getCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    console.log("getCommentsByPostId");
    return prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: { select: { name: true, image: true } },
      },
    });
  }
);
