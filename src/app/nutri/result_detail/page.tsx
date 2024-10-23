'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useNutriresultStore from '@/store/nutriresstore';
import Loading from '@/app/loading';

export default function ResultDetail() {
  const router = useRouter();

  const { nutrientResult, isNutrientResultAvailable } = useNutriresultStore();

  const [loading, setLoading] = useState(true); // 로딩 상태

  // 리디렉팅
  useEffect(() => {
    if (!isNutrientResultAvailable()) {
      router.push('/nutri');
    } else {
      setLoading(false);
    }
  }, [isNutrientResultAvailable, router]);

  const handleNextStep = () => {
    router.push('/nutri/shop'); // 페이지 이동
  };

  if (loading) {
    return <Loading />;
  }

  function calculateMealIntervals(mealTimes: string[]): number {
    if (mealTimes.length < 2) {
      throw new Error('적어도 두 개의 시간(아침, 저녁)이 필요합니다.');
    }

    // "HH:MM" 형식을 분 단위로 변환하는 함수
    const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    // 아침 시간과 저녁 시간 추출 (첫 번째와 마지막 시간)
    const breakfastTime = mealTimes[0];
    const dinnerTime = mealTimes[mealTimes.length - 1];

    // 아침 시간과 저녁 시간을 분으로 변환
    const breakfastInMinutes = timeToMinutes(breakfastTime);
    const dinnerInMinutes = timeToMinutes(dinnerTime);

    // 저녁 시간에서 아침 시간을 뺀 차이 계산 (분 단위)
    let timeDifference = dinnerInMinutes - breakfastInMinutes;

    // 다음날로 넘어가는 경우 (예: 저녁 시간이 22:00이고 아침 시간이 07:00인 경우)
    if (timeDifference < 0) {
      timeDifference += 24 * 60; // 24시간(1440분)을 더해줌
    }

    // n은 리스트 길이에서 1을 뺀 값 (식사 횟수는 시간 구간 수)
    const n = mealTimes.length - 1;

    // 차이를 n으로 나눈 값을 반환 (한 끼 식사 간격을 분으로 계산)
    return timeDifference / n;
  }

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <button
            className="back-button"
            type="button"
            onClick={() => router.back()}
          >
            <figure>
              <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
            </figure>
          </button>
          <h2>영양 분석 리포트</h2>
        </div>
      </header>
      <main className="main">
        <div className="inner">
          <div className="box">
            <div className="sub">
              <span>영양분석 리포트</span>
            </div>
            <div className="box_title">
              <h5>식사 시기와 형태</h5>
              <p>
                <span>이용자</span>님께 추천드리는 식사 간격은{' '}
                {calculateMealIntervals(nutrientResult.mealTimes)}분이며 총{' '}
                {nutrientResult.mealTimes.length}끼로 구성합니다.
              </p>
            </div>
            <div className="content_area">
              <div className="content2">
                <div className="content_title">
                  <figure>
                    <img src="/svgs/check.svg" alt="체크 이미지" />
                  </figure>
                  <h6>끼니 당 영양소 비율</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    <li>
                      탄수화물: 약{' '}
                      {Math.floor(
                        nutrientResult.composition.carbohydrate.gram /
                          nutrientResult.mealTimes.length,
                      )}
                      g
                    </li>
                    <li>
                      단백질: 약{' '}
                      {Math.floor(
                        nutrientResult.composition.protein.gram /
                          nutrientResult.mealTimes.length,
                      )}
                      g
                    </li>
                    <li>
                      지방: 약{' '}
                      {Math.floor(
                        (nutrientResult.composition.satFat.gram +
                          nutrientResult.composition.unFat.gram) /
                          nutrientResult.mealTimes.length,
                      )}
                      g
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content2">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/alarm_clock.svg" alt="알람시계 이미지" />
                  </figure>
                  <h6>식사 간격과 섭취 가이드</h6>
                </div>
                <div className="content_detail">
                  <p>
                    설정된 기상 예정 시간은 {nutrientResult.wakeup}이며 취침
                    예정 시간은 {nutrientResult.sleep}입니다.
                  </p>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.mealTimes.map((time, index) => {
                      return (
                        <li>
                          식사 시간 {index + 1} : {time}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h6>추천드리는 급원</h6>
            <div className="content_area" style={{ marginTop: '20px' }}>
              <div className="content2">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/cooked_rice.svg" alt="밥 이미지" />
                  </figure>
                  <h6>탄수화물</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.carbohydrate.map(
                      (source, index) => {
                        return <li key={`carbohydrate-${index}`}>{source}</li>;
                      },
                    )}
                  </ul>
                </div>
              </div>
              <div className="content2">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/protein.svg" alt="고기 이미지" />
                  </figure>
                  <h6>단백질</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.protein.map((source, index) => {
                      return <li key={`protein-${index}`}>{source}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="content2">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/peanuts.svg" alt="땅콩 이미지" />
                  </figure>
                  <h6>지방</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.fat.map((source, index) => {
                      return <li key={`fat-${index}`}>{source}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button
              type="button"
              className="basic_btn"
              onClick={handleNextStep}
            >
              다음 단계로
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
