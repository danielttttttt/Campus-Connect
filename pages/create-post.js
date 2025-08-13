import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const categories = ['Announcements', 'Events', 'Lost & Found'];

export default function CreatePost() {
  const [formData, setFormData] = useState({
    category: 'Announcements',
    title: '',
    content: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.content) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('New Post Data:', { ...formData, image: imagePreview });
      // Placeholder for API submission
      alert('Post created successfully! (Check console for data)');
      router.push('/feed');
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
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
            </div>

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="rounded-lg max-h-60 w-full object-cover" />
              </div>
            )}

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
