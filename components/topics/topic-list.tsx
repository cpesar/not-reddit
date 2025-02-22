import Link from "next/link";
import { Chip } from "@heroui/react";
import { prisma } from "@/db/prisma";
import paths from "@/app/paths/paths";

export default async function TopicList() {
  const topics = await prisma.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id} className="">
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });
  return <div className="flex flex-wrap flex-row gap-2">{renderedTopics}</div>;
}
