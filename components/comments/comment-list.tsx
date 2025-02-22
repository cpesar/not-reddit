import { prisma } from "@/db/prisma";
import CommentShow from "./comment-show";

interface CommentListProps {}

// TODO: Get a list of comments from somewhere
export default async function CommentList({}: CommentListProps) {
  const comments = await prisma.comment.findFirst({});

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
