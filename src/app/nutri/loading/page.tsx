'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import useNutrientRequestStore from '@/store/nutrireqstore';
import useNutriresultStore from '@/store/nutriresstore';
import { getNutriResult } from '@/api/getNutriResult';
import { getHomePage } from '@/api/getHomePage';

export default function LoadingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { requestData, validatePageOne, validatePageTwo } =
    useNutrientRequestStore();
  const { nutrientResult, setNutrientResult } = useNutriresultStore();

  const checkValidate = () => {
    return validatePageOne() && validatePageTwo();
  };

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

  useEffect(() => {
    const fetchExerResult = async () => {
      if (!checkValidate()) {
        setError('입력 데이터가 올바르지 않습니다.');
        return;
      }

      const result = await getNutriResult(requestData);

      if (result.error) {
        setError(result.error);
      } else {
        setNutrientResult(result);
      }
      setLoading(false);

      setTimeout(() => {
        router.replace('/nutri/result');
      }, 1000);
    };

    fetchExerResult();
  }, []);

  if (error != null) {
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
            유효하지 않은 데이터가 입력됬습니다.
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

  return <Loading />;
}
