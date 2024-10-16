'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useNutriresultStore from '@/store/nutriresstore';

export default function ResultDetail() {
  const router = useRouter();

  const { nutrientResult, setNutrientResult } = useNutriresultStore();

  const handleNextStep = () => {
    router.push('/nutri/shop'); // 페이지 이동
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <a href="#">
            <figure>
              <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
            </figure>
          </a>
          <h2>기본 정보 입력</h2>
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
                <span>이용자</span>님께 추천드리는 식사 간격은 3시간이며 총
                4끼로 구성합니다.
              </p>
            </div>
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <img src="/svgs/check.svg" alt="체크 이미지" />
                  </figure>
                  <h6>끼니 당 영양소 비율</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    <li>탄수화물: 약 69g</li>
                    <li>단백질: 약 41g</li>
                    <li>지방: 약 16g</li>
                  </ul>
                </div>
              </div>
              <div className="content">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/alarm_clock.svg" alt="알람시계 이미지" />
                  </figure>
                  <h6>식사 간격과 섭취 가이드</h6>
                </div>
                <div className="content_detail">
                  <p>
                    설정된 기상 예정 시간은 07:00이며 취침 예정 시간은
                    23:00입니다.
                  </p>
                </div>
                <div className="content_txt_list">
                  <ul>
                    <li>식사 시간 1 : 08:00</li>
                    <li>식사 시간 2 : 12:00</li>
                    <li>식사 시간 3 : 16:00</li>
                    <li>식사 시간 4 : 20:00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h6>추천드리는 급원</h6>
            <div className="content_area">
              <div className="content mgt12">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/cooked_rice.svg" alt="밥 이미지" />
                  </figure>
                  <h6>탄수화물</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.carbohydrate.map((source) => {
                      return <li>{source}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="content">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/protein.svg" alt="고기 이미지" />
                  </figure>
                  <h6>단백질</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.protein.map((source) => {
                      return <li>{source}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="content">
                <div className="content_title small">
                  <figure>
                    <img src="/svgs/peanuts.svg" alt="땅콩 이미지" />
                  </figure>
                  <h6>지방</h6>
                </div>
                <div className="content_txt_list">
                  <ul>
                    {nutrientResult.sources.fat.map((source) => {
                      return <li>{source}</li>;
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
