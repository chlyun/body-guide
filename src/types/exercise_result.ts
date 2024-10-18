import { NutrientProfile } from './nutrient_profile';

export interface ExerciseResult {
  totalScore: number;
  totalLevel: String; //
  topPercent: number;
  bigThree: number;
  ability: ExerciseAbility;
  parts: BodyPart[];
  recommendByLevel: NutrientProfile[];
  purposeRecommends: PurposeRecommend[];
}

export interface ExerciseAbility {
  bench: ExerciseProfile;
  squat: ExerciseProfile;
  dead: ExerciseProfile;
  overhead: ExerciseProfile;
  pushup: ExerciseProfile;
  pullup: ExerciseProfile;
}

export interface ExerciseProfile {
  part: string;
  score: number;
  level: string;
  strength: number; // 1RM 기준 무게 OR 횟수
  average: number; // 1RM 기준 무게 OR 횟수
}

export interface BodyPart {
  strength: string;
  details: string[];
}

export interface PurposeRecommend {
  purpose: string;
  profiles: NutrientProfile[];
}
