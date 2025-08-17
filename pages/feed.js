import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Feed from '../components/feed';
import { PageLoader } from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function FeedPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isMounted || isLoading) {
    return <PageLoader text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <PageLoader text="Redirecting..." />;
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
