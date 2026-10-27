import { useQuery } from "@tanstack/react-query";

import { getFeedPosts } from "../api/posts.api";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts", "feed"],
    queryFn: getFeedPosts,
    staleTime: 1000 * 60 * 5,
  });
};