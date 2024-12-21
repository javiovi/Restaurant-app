import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
  
    router.push('/restaurant');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D303E] text-white">
      <p>Redirecting to login...</p>
    </div>
  );
}
