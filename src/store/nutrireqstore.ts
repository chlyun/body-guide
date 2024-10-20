import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NutrientRequest } from '@/types/nutrient_request';

interface NutrientRequestState {
  requestData: NutrientRequest;
  validationErrors: Partial<Record<string, string>>;
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

      const fieldDescriptions = {
        sex: '성별',
        age: '나이',
        height: '신장',
        weight: '체중',
        wakeup: '기상 시간',
        sleep: '취침 시간',
        PA: '활동 계수',
        dietGoal: '식단 섭취 목적',
        dietType: '식단 유형',
      };

      // 유효성 검사 함수
      const validateField = (
        field: keyof NutrientRequest,
        value: any,
      ): string | null => {
        const fieldDescription = fieldDescriptions[field];

        if (
          value === '' ||
          value === null ||
          value === undefined ||
          (typeof value === 'number' && isNaN(value))
        ) {
          return fieldDescription
            ? `${fieldDescription}를 입력해주세요.`
            : '필수 입력 항목입니다.';
        }

        switch (field) {
          case 'sex':
            if (!value || value === '') return '성별을 선택해주세요.'; // 성별이 빈 값일 경우 오류 반환
            break;
          case 'age':
            if (value < 1 || value > 99)
              return '유효한 나이를 입력하세요 (1~99세)';
            break;
          case 'height':
            if (value < 100 || value > 250)
              return '유효한 신장을 입력하세요 (100~250cm)';
            break;
          case 'weight':
            if (value < 10 || value > 300)
              return '유효한 체중을 입력하세요 (10~300kg)';
            break;
          case 'wakeup':
            if (!value || value === '')
              return `${fieldDescription}을 선택해주세요.`;
            break;
          case 'sleep':
            if (!value || value === '')
              return `${fieldDescription}을 선택해주세요.`;
            break;
          case 'PA':
            if (!value || value === '')
              return `${fieldDescription}을 선택해주세요.`;
            break;
          case 'dietGoal':
            if (!value || value === '')
              return `${fieldDescription}을 선택해주세요.`;
            break;
          case 'dietType':
            if (!value || value === '')
              return `${fieldDescription}을 선택해주세요.`;
            break;
          default:
            return null;
        }
        return null;
      };

      // 수면 시간 구하는 로직
      function getSleepDuration(wakeTime, sleepTime) {
        // 시간을 분으로 변환하는 함수
        function timeToMinutes(time) {
          const [hours, minutes] = time.split(':').map(Number);
          return hours * 60 + minutes;
        }

        const sleepMinutes = timeToMinutes(sleepTime);
        let wakeMinutes = timeToMinutes(wakeTime);

        // 자정을 넘긴 경우를 포함하여 수면 시간 계산
        if (wakeMinutes < sleepMinutes) {
          wakeMinutes += 24 * 60; // 자정을 넘기는 경우를 처리
        }

        const duration = Math.abs(wakeMinutes - sleepMinutes); // Math.abs는 필요 없음

        return duration;
      }

      // 분 -> 시간:분
      function convertMinutesToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60); // 주어진 분을 시간으로 변환
        const remainingMinutes = minutes % 60; // 남은 분 계산
        return `${hours}시간 ${remainingMinutes}분`;
      }

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
          errors.weight = validateField('weight', requestData.weight);

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
          const errors: Record<string, string> = {};

          // Page 2 fields validation (e.g., weight, wakeup, sleep)
          errors.wakeup = validateField('wakeup', requestData.wakeup);
          errors.sleep = validateField('sleep', requestData.sleep);
          errors.PA = validateField('PA', requestData.PA);
          errors.dietGoal = validateField('dietGoal', requestData.dietGoal);
          errors.dietType = validateField('dietType', requestData.dietType);

          // Check wakeup and sleep time interval validity
          const sleepInterval = getSleepDuration(
            requestData.wakeup,
            requestData.sleep,
          );

          if (sleepInterval < 4 * 60 || sleepInterval > 12 * 60) {
            const minutes = convertMinutesToHoursAndMinutes(sleepInterval);
            errors.interval = `수면 시간이 4 ~ 12 시간 사이여야 합니다. ( 현재 ${minutes} )`;
          }

          // Update validation errors
          set({ validationErrors: errors });

          // Return true if no errors, including 'interval'
          return Object.keys(errors).every((key) => !errors[key]);
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
