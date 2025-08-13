import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Feed from '../components/feed';

export default function FeedPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Feed | Campus Connect</title>
        <meta name="description" content="Stay updated with the latest campus news and events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <Feed />
      </main>
    </div>
  );
}
