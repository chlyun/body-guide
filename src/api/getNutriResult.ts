'use client';
import { NutrientRequest } from '@/types/nutrient_request';
import { NutrientResult } from '@/types/nutrient_result';
import axios from 'axios';

const API_URL = `https://${process.env.SERVER_IP}/web/nutrient`;

const getNutriResult = async (nutrientData: NutrientRequest) => {
  try {
    const response = await axios.post<NutrientResult>(API_URL, nutrientData);

    const result = response.data;
    console.log('nutrient Result:', result);

    return result;
  } catch (error) {
    console.error('Error fetching nutrient result:', error);
    throw error;
  }
};

// // 요청 보내기 예시
// getNutriResult(exampleNutrientData)
//     .then(result => {
//         // 받은 결과를 UI 또는 상태에 반영
//         console.log('Final Result:', result);
//     })
//     .catch(error => {
//         // 에러 처리
//         console.error('Failed to get exercise result:', error);
//     });
