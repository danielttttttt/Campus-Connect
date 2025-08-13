import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

export default function TrendingSidebar({ posts }) {
  // Get top 3 most liked posts
  const trendingPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 sticky top-6">
      <div className="flex items-center mb-4">
        <FiTrendingUp className="text-blue-600 mr-2" />
        <h3 className="font-semibold text-gray-900">Trending Now</h3>
      </div>
      
      <div className="space-y-4">
        {trendingPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            whileHover={{ x: 4 }}
            className="border-l-4 border-blue-200 pl-3 py-1"
          >
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span className="font-medium text-blue-600 mr-2">#{index + 1}</span>
              <span>{post.category}</span>
            </div>
            <h4 className="font-medium text-gray-900 line-clamp-2">{post.title}</h4>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{post.likes} likes</span>
              <span className="mx-1">•</span>
              <span>{post.comments} comments</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          View all trending
        </button>
      </div>
    </div>
  );
}
