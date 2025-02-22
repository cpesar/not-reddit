import type { Comment } from "@prisma/client";
import { prisma } from "@/db/prisma";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function getPostsByPostId(postId: string): Promise<CommentWithAuthor[]> {
  return prisma.comment.findMany({
    where: { postId: postId },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}
