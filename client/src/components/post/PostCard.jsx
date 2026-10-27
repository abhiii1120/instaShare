import { useState } from "react";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react";

const formatCount = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return `${value}`;
};

const Avatar = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700">
        {alt
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
};

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar src={post.avatarUrl} alt={post.fullName} />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-zinc-950">
                {post.username}
              </p>

              {post.location ? <span className="text-sm text-zinc-400">·</span> : null}

              {post.location ? (
                <p className="truncate text-sm text-zinc-500">{post.location}</p>
              ) : null}
            </div>
            <p className="truncate text-xs text-zinc-500">{post.timeAgo} ago</p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-zinc-700 transition-colors hover:bg-zinc-100"
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      <div className="bg-zinc-100">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={`rounded-full p-2 transition-colors ${
                liked ? "text-red-500" : "text-zinc-950 hover:bg-zinc-100"
              }`}
              onClick={() => setLiked((current) => !current)}
              aria-label="Like post"
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </button>

            <button
              type="button"
              className="rounded-full p-2 text-zinc-950 transition-colors hover:bg-zinc-100"
              aria-label="Comment on post"
            >
              <MessageCircle className="h-6 w-6" />
            </button>

            <button
              type="button"
              className="rounded-full p-2 text-zinc-950 transition-colors hover:bg-zinc-100"
              aria-label="Share post"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>

          <button
            type="button"
            className={`rounded-full p-2 transition-colors ${
              saved ? "text-zinc-950" : "text-zinc-950 hover:bg-zinc-100"
            }`}
            onClick={() => setSaved((current) => !current)}
            aria-label="Save post"
          >
            <Bookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="space-y-2 text-sm text-zinc-950">
          <p className="font-semibold">{formatCount(post.likes)} likes</p>

          <p>
            <span className="font-semibold">{post.username}</span> {post.caption}
          </p>

          <button type="button" className="text-left text-zinc-500 transition-colors hover:text-zinc-950">
            View all {post.comments} comments
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;