import { create } from 'zustand';
import { NutrientRequest } from '@/types/nutrient_request';

interface NutrientRequestState {
  requestData: NutrientRequest;
  setRequestData: (newData: Partial<NutrientRequest>) => void;
}

const useNutrientRequestStore = create<NutrientRequestState>((set) => ({
  requestData: {
    sex: '',
    age: null,
    height: null,
    weight: null,
    wakeup: '',
    sleep: '',
    PA: '',
    dietGoal: '',
    dietType: '',
  },
  //...state.requestData는 기존 데이터고 ...newData는 새로운 데이터임 둘이 같이 업데이트되는거임
  setRequestData: (newData) =>
    set((state) => ({
      requestData: { ...state.requestData, ...newData },
    })),
}));

export default useNutrientRequestStore;
