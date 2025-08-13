// pages/api/posts.js

const posts = [
  {
    id: 1,
    author: 'Admin Team',
    profilePic: 'https://i.pravatar.cc/150?u=admin',
    category: 'Announcements',
    title: 'Welcome to the new semester!',
    content: 'We are excited to have everyone back on campus. Please check the updated guidelines for campus access.',
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    likes: 125,
    comments: 12,
    timestamp: '2023-09-01T10:00:00Z',
  },
  {
    id: 2,
    author: 'Jane Doe',
    profilePic: 'https://i.pravatar.cc/150?u=jane_doe',
    category: 'Events',
    title: 'Annual Tech Fest - Innovate 2023',
    content: 'Join us for the biggest tech event of the year! Workshops, competitions, and guest speakers. Sign up now!',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    likes: 88,
    comments: 23,
    timestamp: '2023-09-02T14:30:00Z',
  },
  {
    id: 3,
    author: 'John Smith',
    profilePic: 'https://i.pravatar.cc/150?u=john_smith',
    category: 'Lost & Found',
    title: 'Found: Blue Water Bottle',
    content: 'Found a blue Hydro Flask near the library. Please contact me if it\'s yours. It has a sticker of a cat on it.',
    imageUrl: null,
    likes: 15,
    comments: 4,
    timestamp: '2023-09-03T09:15:00Z',
  },
  {
    id: 4,
    author: 'Student Union',
    profilePic: 'https://i.pravatar.cc/150?u=student_union',
    category: 'Announcements',
    title: 'Club Fair Next Week!',
    content: 'Discover new hobbies and meet new people at the annual club fair. It will be held in the main quad from 10 AM to 4 PM on Monday.',
    imageUrl: null,
    likes: 210,
    comments: 31,
    timestamp: '2023-09-04T11:00:00Z',
  },
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { category, title, content, imageUrl } = req.body;

    const newPost = {
      id: posts.length + 1,
      author: 'New User', // Placeholder until auth is implemented
      profilePic: 'https://i.pravatar.cc/150?u=new_user', // Placeholder
      category,
      title,
      content,
      imageUrl: imageUrl || null,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };

    posts.unshift(newPost); // Add to the beginning of the array
    res.status(201).json(newPost);
  } else {
    // Handle GET request
    res.status(200).json(posts);
  }
}
