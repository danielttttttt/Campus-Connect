import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import { useState, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatRelativeTime } from '../../utils/helpers';

const PostCard = memo(function PostCard({ post, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalLikes(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Call the parent's onLike function
    onLike?.(post.id, newLikedState);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <motion.article 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image 
                src={post.profilePic} 
                alt={post.author} 
                fill
                className="object-cover"
                sizes="40px"
                priority={false}
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{post.author}</h4>
              <time className="text-xs text-gray-500">
                {formatRelativeTime(post.timestamp)}
              </time>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              post.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
              post.category === 'Events' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {post.category}
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              <FaEllipsisH size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-600 line-clamp-3">{post.content}</p>
        </div>

        {post.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
              disabled={isAnimating}
            >
              <motion.span
                animate={{ scale: isAnimating ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                {isLiked ? 
                  <FaHeart className="text-red-500" /> : 
                  <FaRegHeart />
                }
              </motion.span>
              <span>{localLikes}</span>
            </button>
            
            <Link 
              href={`/post/${post.id}`}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FaRegComment />
              <span>{post.comments}</span>
            </Link>
          </div>
          
          <button 
            onClick={handleShare}
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            <FaShare />
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export default PostCard;
