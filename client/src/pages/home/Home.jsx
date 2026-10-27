import StoriesSection from "../../components/post/StoriesSection";
import PostCard from "../../components/post/PostCard";
import { usePosts } from "../../services/query/posts.query";

const skeletons = Array.from({ length: 3 }, (_, index) => index);

const Home = () => {
  const { data: posts = [], isLoading, isError } = usePosts();

  return (
    <div className="mx-auto flex w-full max-w-157.5 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <StoriesSection />

      {isLoading ? (
        <div className="space-y-5">
          {skeletons.map((index) => (
            <div
              key={index}
              className="h-140 animate-pulse rounded-3xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          We could not load the feed right now.
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Home;