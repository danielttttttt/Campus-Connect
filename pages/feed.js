import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

// Mock data fetching
const fetchPosts = async () => {
  const res = await fetch('/api/posts');
  const data = await res.json();
  return data;
};

const categories = ['All', 'Announcements', 'Events', 'Lost & Found'];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  const handleLike = (postId) => {
    setFilteredPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-4">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-4 flex justify-around">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}>
              {category}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img src={post.profilePic} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
              </div>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
              )}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex space-x-6">
                  <button onClick={() => handleLike(post.id)} className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                    {/* Like Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                    <span>{post.likes}</span>
                  </button>
                  <Link href={`/post/${post.id}`} className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                    {/* Comment Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm1.5 0a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-11z"></path><path d="M8 8a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"></path></svg>
                    <span>{post.comments}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link href="/create-post" 
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110">
        {/* Plus Icon */}
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </Link>
    </div>
  );
}
