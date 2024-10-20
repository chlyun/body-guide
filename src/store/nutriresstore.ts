import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NutrientResult } from '@/types/nutrient_result';

interface NutriresultState {
  nutrientResult: NutrientResult;
  setNutrientResult: (result: NutrientResult) => void;
  resetNutrientResult: () => void;
  isNutrientResultAvailable: () => boolean; // 수정된 함수
}

const useNutriresultStore = create<NutriresultState>()(
  persist(
    (set, get) => {
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
        wakeup: '',
        sleep: '',
        mealTimes: [],
        sources: { carbohydrate: [], protein: [], fat: [] },
        products: { carbohydrate: [], protein: [], fat: [] },
      };

      const logStateChange = (nutrientResult: NutrientResult) => {
        console.log('Zustand nutrientResult Changed:', nutrientResult);
      };

      return {
        nutrientResult: initialState,

        setNutrientResult: (result: NutrientResult) => {
          set(() => {
            logStateChange(result);
            return { nutrientResult: result };
          });
        },

        resetNutrientResult: () => {
          set(() => {
            logStateChange(initialState);
            return { nutrientResult: initialState };
          });
        },

        // 데이터 유무 확인 함수
        isNutrientResultAvailable: () => {
          const currentState = get().nutrientResult;
          // 현재 상태가 initialState와 다른지 비교
          return JSON.stringify(currentState) !== JSON.stringify(initialState);
        },
      };
    },
    {
      name: 'nutrientResult',
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
