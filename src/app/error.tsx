'use client'; // Error components must be Client Components

import { getHomePage } from '@/api/getHomePage';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const [homeUrl, sethomeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getHomePage();

      sethomeUrl(result['homePage']);
    };

    fetchTags();
  }, []);

  const handleNextStep = () => {
    // homeUrl이 유효한지 확인
    if (homeUrl && typeof homeUrl === 'string') {
      window.location.href = homeUrl;
    } else {
      console.error('Invalid homeUrl:', homeUrl);
    }
  };

  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-black text-gray-200 text-9xl">
          <img
            src={'/svgs/warning.svg'}
            style={{ width: '160px', height: '160px' }}
          />
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          오류 발생!
        </p>

        <p className="mt-4 text-gray-500">
          알수없는 오류가 발생했습니다.
          {/* {error.message || 'You must be logged in to access the page'} */}
        </p>

        <button
          type="button"
          className="inline-block px-8 py-4 mt-6 text-lg font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          onClick={handleNextStep}
        >
          <a className="text-2xl">홈으로 돌아가기</a>
        </button>
      </div>
    </div>
  );
}
