import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NutrientRequest } from '@/types/nutrient_request';

interface NutrientRequestState {
  requestData: NutrientRequest;
  validationErrors: Partial<Record<keyof NutrientRequest, string>>;
  setRequestData: (newData: Partial<NutrientRequest>) => void;
  resetRequestData: () => void;
  validatePageOne: () => boolean;
  validatePageTwo: () => boolean;
}

const useNutrientRequestStore = create<NutrientRequestState>()(
  persist(
    (set, get) => {
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

      // 유효성 검사 함수
      const validateField = (
        field: keyof NutrientRequest,
        value: any,
      ): string | null => {
        if (
          value === '' ||
          value === null ||
          value === undefined ||
          (typeof value === 'number' && isNaN(value))
        ) {
          return `${field} 필드를 입력해주세요.`;
        }

        switch (field) {
          case 'sex':
            if (!value || value === '') return '성별을 선택해주세요.'; // 성별이 빈 값일 경우 오류 반환
            break;
          case 'age':
            if (value <= 0 || isNaN(value)) return '나이는 양수여야 합니다.';
            break;
          case 'height':
            if (value <= 0 || isNaN(value)) return '신장은 양수여야 합니다.';
            break;
          case 'weight':
            if (value <= 0 || isNaN(value)) return '체중은 양수여야 합니다.';
            break;
          case 'wakeup':
            if (!value || value === '') return '성별을 선택해주세요.';
            break;
          case 'sleep':
            if (!value || value === '') return '성별을 선택해주세요.';
            break;
          case 'PA':
            if (!value || value === '') return '성별을 선택해주세요.';
            break;
          case 'dietGoal':
            if (!value || value === '') return '성별을 선택해주세요.';
            break;
          case 'dietType':
            if (!value || value === '') return '성별을 선택해주세요.';
            break;
          default:
            return null;
        }
        return null;
      };

      // 상태 변화 로깅
      const logStateChange = (requestData: NutrientRequest) => {
        console.log('Zustand requestData Changed:', requestData);
      };

      return {
        requestData: initialState,
        validationErrors: {},

        // 상태 업데이트 함수
        setRequestData: (newData: Partial<NutrientRequest>) =>
          set((state) => {
            const updatedRequestData = { ...state.requestData, ...newData };
            const validationErrors = { ...state.validationErrors };

            // 각 필드의 유효성 검사 수행
            Object.keys(newData).forEach((key) => {
              const fieldKey = key as keyof NutrientRequest;
              const error = validateField(fieldKey, newData[fieldKey]);

              if (error) {
                // 빈 값 또는 잘못된 값일 경우 오류 추가
                validationErrors[fieldKey] = error;
              } else {
                // 유효한 값일 경우 오류 삭제
                delete validationErrors[fieldKey];
              }
            });

            logStateChange(updatedRequestData);
            return { requestData: updatedRequestData, validationErrors };
          }),

        // 상태 초기화 함수
        resetRequestData: () =>
          set(() => {
            logStateChange(initialState);
            return { requestData: initialState, validationErrors: {} };
          }),

        // Page 1 유효성 검사 함수
        validatePageOne: () => {
          const { requestData } = get();
          const errors: Partial<Record<keyof NutrientRequest, string>> = {};

          // Page 1 필드만 검사 (예: sex, age, height)
          errors.sex = validateField('sex', requestData.sex);
          errors.age = validateField('age', requestData.age);
          errors.height = validateField('height', requestData.height);
          errors.weight = validateField('height', requestData.weight);

          // 유효성 검사 결과 업데이트
          set({ validationErrors: errors });

          // 에러가 없으면 true 반환
          return Object.keys(errors).every(
            (key) => !errors[key as keyof NutrientRequest],
          );
        },

        // Page 2 유효성 검사 함수
        validatePageTwo: () => {
          const { requestData } = get();
          const errors: Partial<Record<keyof NutrientRequest, string>> = {};

          // Page 2 필드만 검사 (예: weight, wakeup, sleep)
          errors.wakeup = validateField('wakeup', requestData.wakeup);
          errors.sleep = validateField('sleep', requestData.sleep);
          errors.PA = validateField('PA', requestData.PA);
          errors.dietGoal = validateField('dietGoal', requestData.dietGoal);
          errors.dietType = validateField('dietType', requestData.dietType);

          // 유효성 검사 결과 업데이트
          set({ validationErrors: errors });

          // 에러가 없으면 true 반환
          return Object.keys(errors).every(
            (key) => !errors[key as keyof NutrientRequest],
          );
        },
      };
    },
    {
      name: 'nutrientRequest',
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
