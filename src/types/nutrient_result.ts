import { ShopProduct } from './shop_product';

export interface NutrientResult {
  BMI: number;
  BMR: number;
  TDEE: number;
  targetCalory: number;
  dietGoal: string;
  composition: NutrientComposition;
  wakeup: string;
  sleep: string;
  mealTimes: string[];
  sources: RecommendSource;
  products: Recommendproduct;
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

export interface Recommendproduct {
  carbohydrate: ShopProduct[];
  protein: ShopProduct[];
  fat: ShopProduct[];
}
