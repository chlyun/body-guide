'use client';
import { ExerciseRequest } from '@/types/exercise_request';
import { ExerciseResult } from '@/types/exercise_result';
import axios from 'axios';

const API_URL = `https://${process.env.SERVER_IP}/web/exercise`;

const getExerResult = async (exerciseData: ExerciseRequest) => {
  try {
    const response = await axios.post<ExerciseResult>(API_URL, exerciseData);

    const result = response.data;
    console.log('Exercise Result:', result);

    return result;
  } catch (error) {
    console.error('Error fetching exercise result:', error);
    throw error;
  }
};

// // 요청 보내기 예시
// getExerResult(exampleExerciseData)
//     .then(result => {
//         // 받은 결과를 UI 또는 상태에 반영
//         console.log('Final Result:', result);
//     })
//     .catch(error => {
//         // 에러 처리
//         console.error('Failed to get exercise result:', error);
//     });
