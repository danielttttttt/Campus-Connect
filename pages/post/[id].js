import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

// Mock data - in a real app, you'd fetch this from an API
const mockPosts = {
  1: {
    id: 1,
    author: 'Admin Team',
    profilePic: 'https://i.pravatar.cc/150?u=admin',
    category: 'Announcements',
    title: 'Welcome to the new semester!',
    content: 'We are excited to have everyone back on campus. Please check the updated guidelines for campus access. We have a lot of new events and activities planned for this year, so be sure to check the campus calendar.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c64c1a248bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    likes: 125,
    timestamp: '2023-09-01T10:00:00Z',
    comments: [
      { id: 1, author: 'Alice', profilePic: 'https://i.pravatar.cc/150?u=alice', text: 'So excited for the new semester!', timestamp: '2023-09-01T11:30:00Z' },
      { id: 2, author: 'Bob', profilePic: 'https://i.pravatar.cc/150?u=bob', text: 'Can\'t wait for the events!', timestamp: '2023-09-01T12:15:00Z' },
    ],
  },
  // Add other mock posts here if needed
};

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (id) {
      // In a real app, you would fetch this from /api/posts/[id]
      const fetchedPost = mockPosts[id] || null;
      setPost(fetchedPost);
    }
  }, [id]);

  const handleLike = () => {
    if (post) {
      setPost(p => ({ ...p, likes: p.likes + 1 }));
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }
    const newCommentObj = {
      id: Date.now(),
      author: 'CurrentUser', // Placeholder
      profilePic: 'https://i.pravatar.cc/150?u=current_user',
      text: newComment,
      timestamp: new Date().toISOString(),
    };
    setPost(p => ({ ...p, comments: [...p.comments, newCommentObj] }));
    setNewComment('');
    setCommentError('');
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Post not found or loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img src={post.profilePic} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-bold text-lg text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
              <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
          </div>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
          )}
          <div className="p-4 border-t border-gray-200 flex items-center">
            <button onClick={handleLike} className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              <span className="font-semibold">{post.likes} Likes</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md mt-6 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comments ({post.comments.length})</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex items-start space-x-4">
              <img src="https://i.pravatar.cc/150?u=current_user" alt="Your profile" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="input-field w-full"
                  rows="3"
                  placeholder="Add a comment..."
                ></textarea>
                {commentError && <p className="error-text">{commentError}</p>}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button type="submit" className="btn-primary px-6">Post Comment</button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-4">
                <img src={comment.profilePic} alt={comment.author} className="w-10 h-10 rounded-full" />
                <div className="flex-1 bg-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{comment.author}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
