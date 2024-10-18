import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExerciseResult } from '@/types/exercise_result';

interface ExerciseResultState {
  exerciseResult: ExerciseResult;
  setExerciseResult: (result: ExerciseResult) => void;
  resetExerciseResult: () => void;
}

const useExerciseresultStore = create<ExerciseResultState>()(
  persist(
    (set) => {
      const initialState: ExerciseResult = {
        totalScore: 0,
        totalLevel: '',
        topPercent: 0,
        bigThree: 0,
        ability: {
          bench: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
          squat: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
          dead: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
          overhead: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
          pushup: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
          pullup: {
            part: '',
            score: 0,
            level: '',
            strength: 0,
            average: 0,
          },
        },
        parts: [],
        recommendByLevel: [],
        purposeRecommends: [],
      };

      // 상태 변화 로깅
      const logStateChange = (exerciseResult: ExerciseResult) => {
        console.log('Zustand exerciseResult Changed:', exerciseResult);
      };

      return {
        exerciseResult: initialState,

        // 상태 업데이트 함수
        setExerciseResult: (result: ExerciseResult) => {
          set(() => {
            logStateChange(result);
            return { exerciseResult: result };
          });
        },

        // 상태 초기화 함수
        resetExerciseResult: () => {
          set(() => {
            logStateChange(initialState);
            return { exerciseResult: initialState };
          });
        },
      };
    },
    {
      name: 'exerciseResult', // sessionStorage에 저장될 key 이름
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useExerciseresultStore;
