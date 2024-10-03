interface ExerciseRequest{
    sex : string;             // 남 / 여
    age : number;
    height : number;
    weight : number;
    bench : ExerciseSet;      // 벤치프레스
    squat : ExerciseSet;      // 스쿼트
    dead : ExerciseSet;       // 데드리프트
    overhead : ExerciseSet;   // 오버헤드프레스
    pushup : ExerciseSet;     // 푸쉬업
    pullup : ExerciseSet;     // 풀업
    supplePupose : string[];  // 보충제 섭취 목적
}

interface ExerciseSet{
    weight: number;           // 무게
    rep : number;             // 수행 횟수
}