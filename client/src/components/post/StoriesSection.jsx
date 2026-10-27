const stories = [
  { id: "1", username: "Your story", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "2", username: "maria", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: "3", username: "sarah", avatar: "https://i.pravatar.cc/150?img=16" },
  { id: "4", username: "zayn", avatar: "https://i.pravatar.cc/150?img=19" },
  { id: "5", username: "nidhi", avatar: "https://i.pravatar.cc/150?img=26" },
  { id: "6", username: "dev", avatar: "https://i.pravatar.cc/150?img=33" },
];

const StoryCircle = ({ story }) => {
  return (
    <button type="button" className="flex w-20 shrink-0 flex-col items-center gap-2 text-center">
      <div className="rounded-full bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-0.5">
        <div className="rounded-full bg-white p-0.5">
          <img
            src={story.avatar}
            alt={story.username}
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="max-w-full truncate text-[11px] font-medium text-zinc-700">
        {story.username}
      </span>
    </button>
  );
};

const StoriesSection = () => {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white px-4 py-4 sm:px-5">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {stories.map((story) => (
          <StoryCircle key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;