'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useExerciseresultStore from '@/store/exerresstire';
import { getExerResult } from '@/api/getExerResult';
import useExerciseRequestStore from '@/store/exerreqstore';
import Loading from '@/app/loading';

export default function LoadingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { requestData } = useExerciseRequestStore();
  const { exerciseResult, setExerciseResult } = useExerciseresultStore();
  useEffect(() => {
    const fetchExerResult = async () => {
      setLoading(true);
      const result = await getExerResult(requestData);

      if (result.error) {
        setError(result.error);
      } else {
        setExerciseResult(result);
      }
      setLoading(false);
      router.replace('/exer/result');
    };

    fetchExerResult();
  }, []);

  return <Loading />;
}
