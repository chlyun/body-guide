import { NutrientRequest } from '@/types/nutrient_request';

export const getNutriResult = async (nutrientData: NutrientRequest) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 후에 요청 중단

  try {
    const response = await fetch('/api/nutri', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nutrientData),
      signal: controller.signal, // AbortController의 signal 전달
    });

    clearTimeout(timeoutId); // 응답을 받으면 타임아웃 제거

    if (!response.ok) {
      throw new Error('서버로부터 데이터를 가져오는데 실패하였습니다.');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      return { error: '서버가 응답하지 않습니다.' };
    }
    return { error: '서버로부터 데이터를 가져오는데 실패하였습니다.' };
  }
};
