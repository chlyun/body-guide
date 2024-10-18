// exer 첫 페이지 ( 초기화 )
'use client';
import { useEffect } from 'react';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import useExerciseRequestStore from '@/store/exerreqstore';
import useExerciseresultStore from '@/store/exerresstire';

export default function Exer() {
  const router = useRouter();

  const { requestData, resetRequestData } = useExerciseRequestStore();
  const { exerciseResult, resetExerciseResult } = useExerciseresultStore();

  useEffect(() => {
    resetRequestData();
    resetExerciseResult();

    router.replace('/exer/index');
  }, []);

  return <Loading />;
}
