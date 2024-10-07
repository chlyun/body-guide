interface NutrientResult {
  BMI: string;
  DIETGOL: string;
  BMR: number;
  TDEE: number;
  composition: NutrientComposition;
  mealTimes: string[];
}

interface NutrientComposition {
  carbohydrate: NutrientProfile; // 탄수화물
  protein: NutrientProfile; // 단백질
  unFat: NutrientProfile; // 불포화지방
  satFat: NutrientProfile; // 포화지방
}

interface NutrientProfile {
  ratio: number; // 식단에서 비율
  calory: number; // 칼로리
  gram: number; // 그램
}
