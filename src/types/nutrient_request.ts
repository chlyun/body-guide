export interface NutrientRequest {
  sex: string; // 남 / 여
  age: number | null;
  height: number | null;
  weight: number | null;
  wakeup: string; // "12:30"
  sleep: string; // "12:30"
  PA: string; // 비활동적 / 저활동적 / 활동적 / 고활동적 / 매우활동적
  dietGoal: string; // 체중 감량 / 체중 유지 / 체중 증가
  dietType: string; // 일반적 / 저탄수화물 / 고탄수화물 / 저지방 / 비건
}
