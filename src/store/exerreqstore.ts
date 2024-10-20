import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExerciseRequest, ExerciseSet } from '@/types/exercise_request';

interface ExerciseRequestState {
  requestData: ExerciseRequest;
  validationErrors: Partial<Record<string, string>>;
  setRequestData: (newData: Partial<ExerciseRequest>) => void;
  resetRequestData: () => void;
  validatePageOne: () => boolean;
  validatePageTwo: () => boolean;
  validatePageThree: () => boolean;
}

const useExerciseRequestStore = create<ExerciseRequestState>()(
  persist(
    (set, get) => {
      const initialState: ExerciseRequest = {
        sex: '',
        age: null,
        height: null,
        weight: null,
        bench: { weight: null, reps: null },
        squat: { weight: null, reps: null },
        dead: { weight: null, reps: null },
        overhead: { weight: null, reps: null },
        pushup: { weight: 0, reps: null },
        pullup: { weight: 0, reps: null },
        supplePurpose: [],
      };

      const fieldDescriptions = {
        sex: '성별',
        age: '나이',
        height: '신장',
        weight: '체중',
        bench: {
          weight: '벤치프레스 중량',
          reps: '벤치프레스 횟수',
        },
        squat: {
          weight: '스쿼트 중량',
          reps: '스쿼트 횟수',
        },
        dead: {
          weight: '데드리프트 중량',
          reps: '데드리프트 횟수',
        },
        overhead: {
          weight: '오버헤드프레스 중량',
          reps: '오버헤드프레스 횟수',
        },
        pushup: {
          reps: '푸시업 횟수',
        },
        pullup: {
          reps: '풀업 횟수',
        },
      };

      // 유효한 중량과 횟수의 범위를 저장하는 객체
      const exerciseLimits = {
        bench: { weight: { min: 1, max: 300 }, reps: { min: 1, max: 10 } },
        squat: { weight: { min: 1, max: 500 }, reps: { min: 1, max: 10 } },
        dead: { weight: { min: 1, max: 500 }, reps: { min: 1, max: 10 } },
        overhead: { weight: { min: 1, max: 300 }, reps: { min: 1, max: 10 } },
        pushup: { reps: { min: 0, max: 200 } }, // 푸시업은 중량 없음
        pullup: { reps: { min: 0, max: 200 } }, // 풀업도 중량 없음
      };

      // 유효성 검사 함수
      const validateField = (field: string, value: any): string | null => {
        const [mainField, subField] = field.split('.');

        if (
          value === '' ||
          value === null ||
          value === undefined ||
          (typeof value === 'number' && isNaN(value))
        ) {
          const fieldDescription = subField
            ? fieldDescriptions[mainField]?.[subField]
            : fieldDescriptions[mainField];

          return fieldDescription
            ? `${fieldDescription}를 입력해주세요.`
            : '필수 입력 항목입니다.';
        }

        switch (mainField) {
          case 'sex':
            if (!value || value === '') return '성별을 선택해주세요.';
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
          default:
            // 운동 관련 유효성 검사
            if (exerciseLimits[mainField]) {
              const limits = exerciseLimits[mainField];
              if (subField === 'weight' && limits.weight) {
                if (value === null)
                  return `중량을 입력하세요 (${limits.weight.min}~${limits.weight.max}kg)`;
                if (value < limits.weight.min || value > limits.weight.max)
                  return `유효한 중량을 입력하세요 (${limits.weight.min}~${limits.weight.max}kg)`;
              }
              if (subField === 'reps' && limits.reps) {
                if (value === null)
                  return `횟수를 입력하세요 (${limits.reps.min}~${limits.reps.max}회)`;
                if (value < limits.reps.min || value > limits.reps.max)
                  return `유효한 횟수를 입력하세요 (${limits.reps.min}~${limits.reps.max}회)`;
              }
            }
            break;
        }
        return null;
      };

      // 상태 변화 로깅
      const logStateChange = (requestData: ExerciseRequest) => {
        console.log('Zustand requestData Changed:', requestData);
      };

      return {
        requestData: initialState,
        validationErrors: {},

        // 상태 업데이트 함수
        setRequestData: (newData: Partial<ExerciseRequest>) =>
          set((state) => {
            const updatedRequestData = { ...state.requestData, ...newData };
            const validationErrors = { ...state.validationErrors };

            // 새로운 데이터 필드 및 하위 필드 유효성 검사
            Object.keys(newData).forEach((key) => {
              const fieldValue = newData[key as keyof ExerciseRequest];

              if (typeof fieldValue === 'object' && fieldValue !== null) {
                Object.keys(fieldValue).forEach((subKey) => {
                  const fieldKey = `${key}.${subKey}`;
                  const error = validateField(
                    fieldKey,
                    fieldValue[subKey as keyof ExerciseSet],
                  );

                  if (error) {
                    validationErrors[fieldKey] = error;
                  } else {
                    delete validationErrors[fieldKey];
                  }
                });
              } else {
                const error = validateField(key, fieldValue);
                if (error) {
                  validationErrors[key] = error;
                } else {
                  delete validationErrors[key];
                }
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

        // Page 1 유효성 검사 함수 (sex, age, height, weight)
        validatePageOne: () => {
          const { requestData } = get();
          const errors: Partial<Record<string, string>> = {};

          errors.sex = validateField('sex', requestData.sex);
          errors.age = validateField('age', requestData.age);
          errors.height = validateField('height', requestData.height);
          errors.weight = validateField('weight', requestData.weight);

          set({ validationErrors: errors });

          return Object.keys(errors).every((key) => !errors[key]);
        },

        // Page 2 유효성 검사 함수 (bench, squat, dead, overhead, pushup, pullup)
        validatePageTwo: () => {
          const { requestData } = get();
          const errors: Partial<Record<string, string>> = {};

          errors['bench.weight'] = validateField(
            'bench.weight',
            requestData.bench.weight,
          );
          errors['bench.reps'] = validateField(
            'bench.reps',
            requestData.bench.reps,
          );

          errors['squat.weight'] = validateField(
            'squat.weight',
            requestData.squat.weight,
          );
          errors['squat.reps'] = validateField(
            'squat.reps',
            requestData.squat.reps,
          );

          errors['dead.weight'] = validateField(
            'dead.weight',
            requestData.dead.weight,
          );
          errors['dead.reps'] = validateField(
            'dead.reps',
            requestData.dead.reps,
          );

          errors['overhead.weight'] = validateField(
            'overhead.weight',
            requestData.overhead.weight,
          );
          errors['overhead.reps'] = validateField(
            'overhead.reps',
            requestData.overhead.reps,
          );

          errors['pushup.reps'] = validateField(
            'pushup.reps',
            requestData.pushup.reps,
          );
          errors['pullup.reps'] = validateField(
            'pullup.reps',
            requestData.pullup.reps,
          );

          set({ validationErrors: errors });

          return Object.keys(errors).every((key) => !errors[key]);
        },

        // Page 3 유효성 검사 함수 (supplePurpose)
        validatePageThree: () => {
          const { requestData } = get();
          const errors: Partial<Record<string, string>> = {};

          if (
            requestData.supplePurpose.length < 1 ||
            requestData.supplePurpose.length > 5
          ) {
            errors.supplePurpose =
              '보충제의 섭취 목적을 1개 이상 5개 이하로 선택해주세요.';
          }

          set({ validationErrors: errors });

          return Object.keys(errors).every((key) => !errors[key]);
        },
      };
    },
    {
      name: 'exerciseRequest', // sessionStorage에 저장될 key 이름
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : undefined; // 기본값이 없으면 undefined 반환
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
