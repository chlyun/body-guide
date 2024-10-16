import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExerciseRequest } from '@/types/exercise_request';

interface ExerciseRequestState {
  requestData: ExerciseRequest;
  setRequestData: (newData: Partial<ExerciseRequest>) => void;
  resetRequestData: () => void;
}

const useExerciseRequestStore = create<ExerciseRequestState>()(
  persist(
    (set) => {
      const initialState: ExerciseRequest = {
        sex: '',
        age: null,
        height: null,
        weight: null,
        bench: { weight: null, reps: null },
        squat: { weight: null, reps: null },
        dead: { weight: null, reps: null },
        overhead: { weight: null, reps: null },
        pushup: { weight: null, reps: null },
        pullup: { weight: null, reps: null },
        supplePurpose: [],
      };

      // 상태 변화 로깅
      const logStateChange = (requestData: ExerciseRequest) => {
        console.log('Zustand requestData Changed:', requestData);
      };

      return {
        requestData: initialState,

        // 상태 업데이트 함수
        setRequestData: (newData: Partial<ExerciseRequest>) =>
          set((state) => {
            const updatedRequestData = { ...state.requestData, ...newData };
            logStateChange(updatedRequestData); // 상태 변화 로그
            return { requestData: updatedRequestData };
          }),

        // 상태 초기화 함수
        resetRequestData: () =>
          set(() => {
            logStateChange(initialState); // 초기 상태로 로그 출력
            return { requestData: initialState };
          }),
      };
    },
    {
      name: 'exerciseRequest', // sessionStorage에 저장될 key 이름
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

export default useExerciseRequestStore;
