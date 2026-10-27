const feedPosts = [
  {
    id: "1",
    username: "ritikrajput",
    fullName: "Ritik Rajput",
    location: "New Delhi",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    likes: 1284,
    caption:
      "A clean desk, a strong coffee, and a quiet morning before the whole feed wakes up.",
    comments: 34,
    timeAgo: "2 h",
  },
  {
    id: "2",
    username: "kingsta.studio",
    fullName: "Kingsta Studio",
    location: "Bengaluru",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    imageUrl: "https://images.unsplash.com/photo-1520975922284-9f2b9bfae1d1?auto=format&fit=crop&w=1200&q=80",
    likes: 942,
    caption:
      "Evening light, thin shadows, and a feed card that feels right at home in Kingsta.",
    comments: 19,
    timeAgo: "5 h",
  },
  {
    id: "3",
    username: "aditya.says",
    fullName: "Aditya Sharma",
    location: "Mumbai",
    avatarUrl: "https://i.pravatar.cc/150?img=21",
    imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
    likes: 2310,
    caption:
      "A small frame from the city that always looks better in the late afternoon.",
    comments: 52,
    timeAgo: "8 h",
  },
];

export const getFeedPosts = async () => feedPosts;