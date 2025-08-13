import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiPaperclip, FiSmile, FiSend, FiChevronLeft } from 'react-icons/fi';
import Head from 'next/head';
import Navbar from '../components/Navbar';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: 2,
    name: 'Study Group',
    avatar: 'https://i.pravatar.cc/150?img=32',
    lastMessage: 'Meeting at 3 PM tomorrow',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Did you finish the assignment?',
    time: '2 days ago',
    unread: 0,
  },
  {
    id: 4,
    name: 'Campus Events',
    avatar: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'New event: Career Fair 2023',
    time: '1 week ago',
    unread: 0,
  },
];

// Mock messages for the active conversation
const mockMessages = [
  { id: 1, sender: 'them', text: 'Hey there!', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Hi! How are you?', time: '10:31 AM' },
  { id: 3, sender: 'them', text: 'I\'m good, thanks for asking! How about you?', time: '10:32 AM' },
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleChatSelect = (conversationId) => {
    setActiveChat(conversationId);
    // In a real app, you would fetch messages for this conversation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Messages | Campus Connect</title>
        <meta name="description" content="Connect with your campus community" />
      </Head>
      
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)] bg-white">

      {/* Chat List */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Messages</h1>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeChat === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleChatSelect(conversation.id)}
            >
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {activeChat ? (
        <div className="flex flex-col flex-1">
          {/* Chat Header */}
          <div className="flex items-center p-4 border-b border-gray-200 bg-white">
            <button 
              className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
              onClick={() => setActiveChat(null)}
            >
              <FiChevronLeft size={24} />
            </button>
            <img
              src={conversations.find(c => c.id === activeChat)?.avatar || 'https://i.pravatar.cc/150?img=0'}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="font-semibold">
                {conversations.find(c => c.id === activeChat)?.name || 'Chat'}
              </h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      msg.sender === 'me'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 text-right opacity-70">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                <FiPaperclip size={20} />
              </button>
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                <FiSmile size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="p-2 text-blue-500 hover:text-blue-600"
                disabled={!message.trim()}
              >
                <FiSend size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <FiSend className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
            <p className="text-gray-500">Choose an existing chat or start a new one to begin messaging.</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
