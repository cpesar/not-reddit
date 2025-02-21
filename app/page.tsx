import TopicCreateForm from "../components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";

const HomePage = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  );
};

export default HomePage;
