import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

// Mock data for groups
const mockGroups = [
  { id: 1, name: 'General Announcements', description: 'Official updates from the university administration.', category: 'Announcements', joined: true },
  { id: 2, name: 'Campus Events & Festivals', description: 'Find out about all the fun and exciting events happening on campus.', category: 'Events', joined: false },
  { id: 3, name: 'Lost & Found Center', description: 'Lost something? Found something? Post here to connect with others.', category: 'Lost & Found', joined: true },
  { id: 4, name: 'CS 101 Study Group', description: 'Collaborate and study for the Introduction to Computer Science course.', category: 'Study Groups', joined: false },
  { id: 5, name: 'Photography Club', description: 'Share your passion for photography, join photo walks, and workshops.', category: 'Clubs', joined: false },
  { id: 6, name: 'Debate Club', description: 'Hone your public speaking and argumentation skills.', category: 'Clubs', joined: true },
];

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setGroups(mockGroups);
  }, []);

  const handleToggleJoin = (groupId) => {
    setGroups(currentGroups =>
      currentGroups.map(group =>
        group.id === groupId ? { ...group, joined: !group.joined } : group
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 my-6">Discover Groups</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <div key={group.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <div className="flex-grow">
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {group.category}
                </span>
                <Link href={`/group/${group.id}`} className="block mt-4">
                    <h2 className="text-xl font-bold text-gray-900 hover:text-blue-700">{group.name}</h2>
                </Link>
                <p className="text-gray-600 mt-2 text-sm">{group.description}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleToggleJoin(group.id)}
                  className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 ${
                    group.joined
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {group.joined ? 'Leave' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
