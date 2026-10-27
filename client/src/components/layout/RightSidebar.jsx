const suggestions = [
  {
    id: "s1",
    username: "nora.design",
    reason: "Followed by friends",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "s2",
    username: "pixel.harbor",
    reason: "Suggested for you",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "s3",
    username: "studio.harsh",
    reason: "New to Kingsta",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

const RightSidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 border-l border-zinc-200 bg-[#fafafa] px-6 py-10 xl:flex xl:flex-col">
      <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-zinc-200" />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950">kingsta_user</p>
            <p className="truncate text-xs text-zinc-500">Kingsta Creator</p>
          </div>
        </div>

        <button className="text-xs font-semibold text-zinc-950 transition-colors hover:text-zinc-600">
          Switch
        </button>
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-600">Suggested for you</p>

          <button className="text-xs font-semibold text-zinc-950 transition-colors hover:text-zinc-600">
            See All
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={suggestion.avatar}
                  alt={suggestion.username}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-950">
                    {suggestion.username}
                  </p>

                  <p className="truncate text-xs text-zinc-500">{suggestion.reason}</p>
                </div>
              </div>

              <button className="text-xs font-semibold text-[#0095f6] transition-opacity hover:opacity-80">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;