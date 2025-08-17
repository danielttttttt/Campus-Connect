import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import CategoryFilter from './CategoryFilter';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import TrendingSidebar from './TrendingSidebar';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../utils/api';
import { withErrorBoundary } from '../ErrorBoundary';

function Feed() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    posts,
    filteredPosts,
    activeCategory,
    isLoading,
    setPosts,
    setActiveCategory,
    setLoading,
    likePost,
    showError
  } = useApp();
  const { isAuthenticated } = useAuth();

  // Fetch posts on mount
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await ApiService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      showError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [setPosts, setLoading, showError]);

  useEffect(() => {
    setIsMounted(true);
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts.length]);

  const handleFilter = useCallback((category) => {
    setActiveCategory(category);
  }, [setActiveCategory]);

  const handleLike = useCallback(async (postId, isLiked) => {
    try {
      // Optimistic update
      likePost(postId, isLiked);

      // In a real app, you would call the API here
      // await ApiService.likePost(postId, isLiked);
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert optimistic update
      likePost(postId, !isLiked);
      showError('Failed to update like. Please try again.');
    }
  }, [likePost, showError]);

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
            {/* Create Post Button */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              {isAuthenticated ? (
                <Button
                  as="a"
                  href="/create-post"
                  leftIcon={<FiPlus />}
                  fullWidth
                  className="justify-center"
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  as="a"
                  href="/login"
                  variant="outline"
                  fullWidth
                  className="justify-center"
                >
                  Login to Create Post
                </Button>
              )}
            </div>

            {/* Categories */}
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

export default withErrorBoundary(Feed);
