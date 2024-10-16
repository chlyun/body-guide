import { NutrientRequest } from '@/types/nutrient_request';

export const getNutriResult = async (nutrientData: NutrientRequest) => {
  try {
    const response = await fetch('/api/nutri', {
      method: 'POST', // POST 메서드를 사용
      headers: {
        'Content-Type': 'application/json', // 전송하는 데이터가 JSON임을 명시
      },
      body: JSON.stringify(nutrientData), // 데이터를 JSON 문자열로 변환하여 body에 담음
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Failed to fetch data' };
  }
};
