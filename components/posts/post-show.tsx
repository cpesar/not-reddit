import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import { getPostsByPostId } from "@/db/queries/comments";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await prisma.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
