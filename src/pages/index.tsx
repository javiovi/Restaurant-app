import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
  
    router.push('/restaurant');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D303E] text-white">
    <div className="animate-bounce">
      <Image
        src="/public/favicon.png" 
        alt="Loading isotipo"
        width={20} 
        height={20} 
      />
    </div>
  </div>
  );
}
