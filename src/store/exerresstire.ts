import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExerciseResult } from '@/types/exercise_result';

interface ExerciseResultState {
  exerciseResult: ExerciseResult;
  setExerciseResult: (result: ExerciseResult) => void;
  resetExerciseResult: () => void;
  isExerciseResultAvailable: () => boolean; // 추가
}

const useExerciseresultStore = create<ExerciseResultState>()(
  persist(
    (set, get) => {
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

        setExerciseResult: (result: ExerciseResult) => {
          set(() => {
            logStateChange(result);
            return { exerciseResult: result };
          });
        },

        resetExerciseResult: () => {
          set(() => {
            logStateChange(initialState);
            return { exerciseResult: initialState };
          });
        },

        // 데이터 유무 확인 함수
        isExerciseResultAvailable: () => {
          const currentState = get().exerciseResult;
          // 현재 상태가 initialState와 다른지 비교
          return JSON.stringify(currentState) !== JSON.stringify(initialState);
        },
      };
    },
    {
      name: 'exerciseResult',
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
