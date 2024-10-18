// nutri 첫 페이지 ( 초기화 )
'use client';
import { useEffect } from 'react';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import useNutrientRequestStore from '@/store/nutrireqstore';
import useNutriresultStore from '@/store/nutriresstore';

export default function Nutri() {
  const router = useRouter();

  const { requestData, resetRequestData } = useNutrientRequestStore();
  const { nutrientResult, resetNutrientResult } = useNutriresultStore();

  useEffect(() => {
    resetRequestData();
    resetNutrientResult();

    router.replace('/nutri/index');
  }, []);

  return <Loading />;
}
