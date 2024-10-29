'use client';

import { getHomePage } from '@/api/getHomePage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [homeUrl, setHomeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const result = await getHomePage();
        if (result && typeof result.homePage === 'string') {
          setHomeUrl(result.homePage);
        } else {
          console.error('Invalid result format:', result);
        }
      } catch (error) {
        console.error('Error fetching home page:', error);
      }
    };

    fetchHomePage();
  }, []);

  useEffect(() => {
    if (homeUrl) {
      window.location.href = homeUrl;
    }
  }, [homeUrl]);

  return <></>;
}
