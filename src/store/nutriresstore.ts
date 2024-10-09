import { create } from 'zustand';
import { NutrientResult } from '@/types/nutrient_result';

interface NutriresultState {
  nutrientResult: NutrientResult;
  setNutrientResult: (result: NutrientResult) => void;
  resetNutrientResult: () => void;
}

const NutriresultStore = create<NutriresultState>((set) => ({
  nutrientResult: {
    BMI: '',
    DIETGOAL: '',
    BMR: 0,
    TDEE: 0,
    composition: {
      carbohydrate: { ratio: 0, calory: 0, gram: 0 },
      protein: { ratio: 0, calory: 0, gram: 0 },
      unFat: { ratio: 0, calory: 0, gram: 0 },
      satFat: { ratio: 0, calory: 0, gram: 0 },
    },
    mealTimes: [],
  },
  setNutrientResult: (result: NutrientResult) =>
    set({ nutrientResult: result }),
  resetNutrientResult: () =>
    set({
      nutrientResult: {
        BMI: '',
        DIETGOAL: '',
        BMR: 0,
        TDEE: 0,
        composition: {
          carbohydrate: { ratio: 0, calory: 0, gram: 0 },
          protein: { ratio: 0, calory: 0, gram: 0 },
          unFat: { ratio: 0, calory: 0, gram: 0 },
          satFat: { ratio: 0, calory: 0, gram: 0 },
        },
        mealTimes: [],
      },
    }),
}));

export default NutriresultStore;
