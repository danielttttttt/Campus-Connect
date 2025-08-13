import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiMessageSquare, FiCalendar, FiSearch } from 'react-icons/fi';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const categories = [
    { name: 'All', icon: <FiFilter className="mr-2" /> },
    { name: 'Announcements', icon: <FiMessageSquare className="mr-2" /> },
    { name: 'Events', icon: <FiCalendar className="mr-2" /> },
    { name: 'Lost & Found', icon: <FiSearch className="mr-2" /> },
  ];

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-200 ${
              activeCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.icon}
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-100"
        >
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{
              width: '100%',
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
          />
        </motion.div>
      </AnimatePresence>
      <style jsx>{`
        /* Removed scrollbar styles as we're now using flex-wrap */
      `}</style>
    </div>
  );
}
