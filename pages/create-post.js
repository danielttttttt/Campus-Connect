import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../utils/api';
import { createObjectURL, cleanupObjectURLs, isValidFileType } from '../utils/helpers';
import { FILE_UPLOAD, VALIDATION_RULES, POST_CATEGORIES } from '../utils/constants';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    category: 'Announcements',
    title: '',
    content: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { addPost, showSuccess, showError } = useApp();
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      cleanupObjectURLs();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!isValidFileType(file)) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
        }));
        return;
      }

      // Validate file size
      if (file.size > FILE_UPLOAD.MAX_SIZE) {
        setErrors(prev => ({
          ...prev,
          image: 'File size must be less than 5MB'
        }));
        return;
      }

      // Clean up previous image URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Create new object URL
      const newImageUrl = createObjectURL(file);
      setImagePreview(newImageUrl);
      setImageFile(file);

      // Clear any previous image errors
      setErrors(prev => {
        const { image, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = VALIDATION_RULES.POST.TITLE_REQUIRED;
    } else if (formData.title.length > 100) {
      newErrors.title = VALIDATION_RULES.POST.TITLE_MAX_LENGTH;
    }

    if (!formData.content.trim()) {
      newErrors.content = VALIDATION_RULES.POST.CONTENT_REQUIRED;
    } else if (formData.content.length > 1000) {
      newErrors.content = VALIDATION_RULES.POST.CONTENT_MAX_LENGTH;
    }

    if (!formData.category) {
      newErrors.category = VALIDATION_RULES.POST.CATEGORY_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        imageUrl: imagePreview,
        author: user?.name || 'Anonymous',
        profilePic: user?.profilePic || 'https://i.pravatar.cc/150?u=anonymous',
      };

      const newPost = await ApiService.createPost(postData);

      // Add to global state
      addPost(newPost);

      // Show success message
      showSuccess('Post created successfully!');

      // Cleanup and redirect
      cleanupObjectURLs();
      router.push('/feed');

    } catch (error) {
      console.error('Error creating post:', error);
      showError(error.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field mt-1"
              >
                {POST_CATEGORIES.map(category => (
                  <option key={category.value} value={category.name}>{category.name}</option>
                ))}
              </select>
              {errors.category && <p className="error-text">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="What's the title of your post?"
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="What do you want to share?"
              ></textarea>
              {errors.content && <p className="error-text">{errors.content}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="rounded-lg max-h-60 w-full object-cover" />
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (imagePreview) {
                        URL.revokeObjectURL(imagePreview);
                      }
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Post...' : 'Create Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
