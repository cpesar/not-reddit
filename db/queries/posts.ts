import type { Post } from "@prisma/client";
import { prisma } from "@/db/prisma";

export type PostWithDetails = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function getPostsByTopicSlug(slug: string): Promise<PostWithDetails[]> {
  return prisma.post.findMany({
    where: { topic: { slug: slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
