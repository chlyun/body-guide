'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import useNutrientRequestStore from '@/store/nutrireqstore';
import useNutriresultStore from '@/store/nutriresstore';
import { getNutriResult } from '@/api/getNutriResult';

export default function LoadingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { requestData } = useNutrientRequestStore();
  const { nutrientResult, setNutrientResult } = useNutriresultStore();

  useEffect(() => {
    const fetchExerResult = async () => {
      setLoading(true);
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

  return <Loading />;
}
