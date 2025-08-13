import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

// Mock data for profile
const mockProfile = {
  name: 'John Doe',
  bio: 'Computer Science student, passionate about web development and photography. Member of the Debate Club.',
  profilePic: 'https://i.pravatar.cc/150?u=john_doe_profile',
  joinedGroups: [
    { id: 1, name: 'General Announcements' },
    { id: 3, name: 'Lost & Found Center' },
    { id: 6, name: 'Debate Club' },
  ],
  userPosts: [
    {
      id: 3,
      author: 'John Doe',
      profilePic: 'https://i.pravatar.cc/150?u=john_doe_profile',
      category: 'Lost & Found',
      title: 'Found: Blue Water Bottle',
      content: 'Found a blue Hydro Flask near the library. Please contact me if it\'s yours. It has a sticker of a cat on it.',
      imageUrl: null,
      likes: 15,
      comments: 4,
      timestamp: '2023-09-03T09:15:00Z',
    },
  ],
};

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setProfile(mockProfile);
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <img src={profile.profilePic} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-blue-500" />
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-gray-600 mt-2">{profile.bio}</p>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Joined Groups */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Joined Groups</h2>
              <ul className="space-y-2">
                {profile.joinedGroups.map(group => (
                  <li key={group.id} className="text-blue-600 hover:underline">
                    <Link href={`/group/${group.id}`}>{group.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User's Posts */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Posts</h2>
            <div className="space-y-4">
              {profile.userPosts.map(post => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && <EditProfileModal profile={profile} setProfile={setProfile} closeModal={() => setIsEditModalOpen(false)} />}
    </div>
  );
}

// Edit Profile Modal Component
function EditProfileModal({ profile, setProfile, closeModal }) {
  const [formData, setFormData] = useState({ name: profile.name, bio: profile.bio });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, ...formData }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="input-field mt-1" />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea name="bio" id="bio" rows="4" value={formData.bio} onChange={handleChange} className="input-field mt-1"></textarea>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
