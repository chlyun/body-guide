import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NutrientRequest } from '@/types/nutrient_request';

interface NutrientRequestState {
  requestData: NutrientRequest;
  setRequestData: (newData: Partial<NutrientRequest>) => void;
  resetRequestData: () => void;
}

const useNutrientRequestStore = create<NutrientRequestState>()(
  persist(
    (set) => {
      const initialState: NutrientRequest = {
        sex: '',
        age: null,
        height: null,
        weight: null,
        wakeup: '',
        sleep: '',
        PA: '',
        dietGoal: '',
        dietType: '',
      };

      // 상태 변화 로깅
      const logStateChange = (requestData: NutrientRequest) => {
        console.log('Zustand requestData Changed:', requestData);
      };

      return {
        requestData: initialState,

        // 상태 업데이트 함수
        setRequestData: (newData: Partial<NutrientRequest>) =>
          set((state) => {
            const updatedRequestData = { ...state.requestData, ...newData };
            logStateChange(updatedRequestData);
            return { requestData: updatedRequestData };
          }),

        // 상태 초기화 함수
        resetRequestData: () =>
          set(() => {
            logStateChange(initialState);
            return { requestData: initialState };
          }),
      };
    },
    {
      name: 'nutrientRequest', // sessionStorage에 저장될 key 이름
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

export default useNutrientRequestStore;
