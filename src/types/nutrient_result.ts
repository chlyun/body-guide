export interface NutrientResult {
  BMI: string;
  BMR: number;
  TDEE: number;
  targetCalory: number;
  dietGoal: string;
  composition: NutrientComposition;
  mealTimes: string[];
  sources: RecommendSource;
}

export interface NutrientComposition {
  carbohydrate: NutrientInfo; // 탄수화물
  protein: NutrientInfo; // 단백질
  unFat: NutrientInfo; // 불포화지방
  satFat: NutrientInfo; // 포화지방
}

export interface NutrientInfo {
  ratio: number; // 식단에서 비율
  calory: number; // 칼로리
  gram: number; // 그램
}

export interface RecommendSource {
  carbohydrate: string[];
  protein: string[];
  fat: string[];
}
