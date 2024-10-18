import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NutrientResult } from '@/types/nutrient_result';

interface NutriresultState {
  nutrientResult: NutrientResult;
  setNutrientResult: (result: NutrientResult) => void;
  resetNutrientResult: () => void;
}

const useNutriresultStore = create<NutriresultState>()(
  persist(
    (set) => {
      const initialState: NutrientResult = {
        BMI: '',
        BMR: null,
        TDEE: null,
        dietGoal: '',
        targetCalory: null,
        composition: {
          carbohydrate: { ratio: null, calory: null, gram: null },
          protein: { ratio: null, calory: null, gram: null },
          unFat: { ratio: null, calory: null, gram: null },
          satFat: { ratio: null, calory: null, gram: null },
        },
        mealTimes: [],
        sources: { carbohydrate: [], protein: [], fat: [] },
      };

      // 상태 변화 로깅
      const logStateChange = (nutrientResult: NutrientResult) => {
        console.log('Zustand nutrientResult Changed:', nutrientResult);
      };

      return {
        nutrientResult: initialState,

        // 상태 업데이트 함수
        setNutrientResult: (result: NutrientResult) => {
          set(() => {
            logStateChange(result);
            return { nutrientResult: result };
          });
        },

        // 상태 초기화 함수
        resetNutrientResult: () => {
          set(() => {
            logStateChange(initialState);
            return { nutrientResult: initialState };
          });
        },
      };
    },
    {
      name: 'nutrientResult', // sessionStorage에 저장될 key 이름
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

export default useNutriresultStore;
