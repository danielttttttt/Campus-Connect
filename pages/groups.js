import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { FiPlus, FiUsers, FiImage, FiLock, FiGlobe, FiX } from 'react-icons/fi';

// Categories for filtering
const categories = ['All', 'Academic', 'Sports', 'Arts', 'Events', 'Clubs', 'Study Groups', 'Other'];

// Mock data for groups
const mockGroups = [
  { 
    id: 1, 
    name: 'General Announcements', 
    description: 'Official updates from the university administration.', 
    category: 'Academic', 
    joined: true,
    memberCount: 1245,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    privacy: 'public',
    createdAt: '2023-01-15T10:00:00Z'
  },
  { 
    id: 2, 
    name: 'Campus Events', 
    description: 'Find out about all the fun and exciting events happening on campus.', 
    category: 'Events', 
    joined: false,
    memberCount: 876,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    privacy: 'public',
    createdAt: '2023-02-20T14:30:00Z'
  },
  { 
    id: 3, 
    name: 'Lost & Found', 
    description: 'Lost something? Found something? Post here to connect with others.', 
    category: 'Other', 
    joined: true,
    memberCount: 2345,
    coverImage: 'https://images.unsplash.com/photo-1571902943201-8ec2c8e5d1d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    privacy: 'public',
    createdAt: '2023-01-05T09:15:00Z'
  },
  { 
    id: 4, 
    name: 'CS 101 Study Group', 
    description: 'Collaborate and study for the Introduction to Computer Science course.', 
    category: 'Academic', 
    joined: false,
    memberCount: 89,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    privacy: 'private',
    createdAt: '2023-03-10T16:45:00Z'
  },
  { 
    id: 5, 
    name: 'Photography Club', 
    description: 'Share your passion for photography, join photo walks, and workshops.', 
    category: 'Arts', 
    joined: false,
    memberCount: 156,
    coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    privacy: 'public',
    createdAt: '2023-02-28T11:20:00Z'
  },
  { 
    id: 6, 
    name: 'Debate Club', 
    description: 'Hone your public speaking and argumentation skills.', 
    category: 'Clubs', 
    joined: true,
    memberCount: 321,
    coverImage: 'https://images.unsplash.com/photo-1606326608606-8e0ed5dcc224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    privacy: 'public',
    createdAt: '2023-01-20T13:10:00Z'
  },
];

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Academic',
    privacy: 'public',
    rules: ''
  });
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setGroups(mockGroups);
  }, []);

  const handleToggleJoin = (groupId) => {
    setGroups(currentGroups =>
      currentGroups.map(group => {
        if (group.id === groupId) {
          const newStatus = !group.joined;
          return { 
            ...group, 
            joined: newStatus,
            memberCount: newStatus ? group.memberCount + 1 : group.memberCount - 1
          };
        }
        return group;
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const newGroup = {
        id: Math.max(...groups.map(g => g.id)) + 1,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        privacy: formData.privacy,
        joined: true,
        memberCount: 1,
        coverImage: imagePreview || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        createdAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGroups(prev => [newGroup, ...prev]);
      setShowCreateModal(false);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: 'Academic',
        privacy: 'public',
        rules: ''
      });
      setCoverImage(null);
      setImagePreview(null);
      
      alert('Group created successfully!');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGroups = activeCategory === 'All' 
    ? groups 
    : groups.filter(group => group.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover Groups</h1>
            <p className="text-gray-600 mt-2">Find and join groups that match your interests</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            Create Group
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Cover Image */}
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={group.coverImage} 
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                {group.privacy === 'private' && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-1 rounded-full">
                    <FiLock className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <FiUsers className="mr-1" />
                  {group.memberCount.toLocaleString()}
                </div>
              </div>
              
              {/* Group Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      {group.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                <button
                  onClick={() => handleToggleJoin(group.id)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    group.joined
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {group.joined ? 'Leave Group' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
                <button 
                  onClick={() => !isLoading && setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto h-40 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setCoverImage(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            disabled={isLoading}
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex justify-center text-sm text-gray-600">
                            <label
                              htmlFor="cover-image-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload an image</span>
                              <input
                                id="cover-image-upload"
                                name="cover-image-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isLoading}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Group Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter group name"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Tell us about your group..."
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    disabled={isLoading}
                    required
                  >
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Privacy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="public"
                        name="privacy"
                        type="radio"
                        value="public"
                        checked={formData.privacy === 'public'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        disabled={isLoading}
                      />
                      <label htmlFor="public" className="ml-2 block text-sm text-gray-700 flex items-center">
                        <FiGlobe className="w-4 h-4 mr-1" />
                        Public - Anyone can see who's in the group and what they post
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="private"
                        name="privacy"
                        type="radio"
                        value="private"
                        checked={formData.privacy === 'private'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        disabled={isLoading}
                      />
                      <label htmlFor="private" className="ml-2 block text-sm text-gray-700 flex items-center">
                        <FiLock className="w-4 h-4 mr-1" />
                        Private - Only members can see who's in the group and what they post
                      </label>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
                    Group Rules (Optional)
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    rows={3}
                    value={formData.rules}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Add any rules or guidelines for your group..."
                    disabled={isLoading}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : 'Create Group'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
