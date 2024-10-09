import { create } from 'zustand';
import { NutrientRequest } from '@/types/nutrient_request';

interface NutrientRequestState {
  requestData: NutrientRequest;
  setRequestData: (newData: Partial<NutrientRequest>) => void;
}

const useNutrientRequestStore = create<NutrientRequestState>((set) => ({
  requestData: {
    sex: '',
    age: 0,
    height: 0,
    weight: 0,
    wakeup: '',
    sleep: '',
    PA: '',
    dietGoal: '',
    dietType: '',
  },
  setRequestData: (newData) =>
    set((state) => ({
      requestData: { ...state.requestData, ...newData },
    })),
}));

export default useNutrientRequestStore;
