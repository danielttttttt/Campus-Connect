import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import CategoryFilter from './CategoryFilter';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import TrendingSidebar from './TrendingSidebar';

// Mock data fetching
const fetchPosts = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const res = await fetch('/api/posts');
  const data = await res.json();
  return data;
};

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
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

  const handleLike = (postId, isLiked) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId 
          ? { ...post, likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1) } 
          : post
      )
    );

    setFilteredPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId 
          ? { ...post, likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1) } 
          : post
      )
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <CategoryFilter 
                activeCategory={activeCategory} 
                onSelectCategory={handleFilter} 
              />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {isLoading ? (
                // Show skeleton loaders
                Array(3).fill().map((_, i) => <PostSkeleton key={i} />)
              ) : (
                <AnimatePresence mode="wait">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={handleLike} 
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-gray-500">No posts found in this category.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Sidebar - Trending */}
          <div className="lg:col-span-3">
            <TrendingSidebar posts={posts} />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6"
      >
        <a
          href="/create-post"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Create new post"
        >
          <FiPlus className="w-6 h-6" />
        </a>
      </motion.div>
    </div>
  );
}
