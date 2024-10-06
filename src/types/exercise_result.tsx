interface ExerciseResult{
    totalScore : number;
    totalLevel : String;              // 
    topPercent : number;
    bigThree : number;
    ability : ExerciseAbility;
}

interface ExerciseAbility{
    bench : ExerciseProfile;
    squat : ExerciseProfile;
    dead : ExerciseProfile;
    overhead : ExerciseProfile;
    pushup : ExerciseProfile;
    pullup : ExerciseProfile;
}

interface ExerciseProfile{
    score : number;
    level : string;
    strength : number;                 // 1RM 기준 무게 OR 횟수
    average : number;                  // 1RM 기준 무게 OR 횟수
}