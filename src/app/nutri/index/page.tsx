'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useNutrientRequestStore from '@/store/nutrireqstore';

export default function Index() {
  const router = useRouter();
  const { requestData, setRequestData } = useNutrientRequestStore();

  const handleInputChange = (field, value) => {
    setRequestData({ [field]: value });
  };

  const handleNextStep = () => {
    router.push('/nutri/detail'); // 페이지 이동
  };

  return (
    <>
      <Head>
        <title>식단 기본 정보 입력</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
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
              <h6>사용자의 정보를 입력해주세요.</h6>
              <p>
                사용자의 정보를 기반으로 칼로리 계산 및 섭취 목적에 따른 식단을
                추천해드립니다.
              </p>
            </div>
            <div className="box">
              <h6>사용자 기본 정보</h6>
              <p>사용자의 기본 정보를 입력해주세요.</p>
              <div className="user_input">
                <div className="input_area radio">
                  <span className="input_label">성별</span>
                  <div className="radio_area">
                    {['남성', '여성'].map((gender) => (
                      <div className="radio_one" key={gender}>
                        <input
                          type="radio"
                          className="basic_radio"
                          name="gender"
                          id={gender} // 성별에 따라 ID 설정
                          value={gender === '남성' ? '남성' : '여성'} // value 설정
                          checked={
                            requestData['sex'] ===
                            (gender === '남성' ? '남성' : '여성')
                          } // 선택된 값 확인
                          onChange={(e) =>
                            handleInputChange('sex', e.target.value)
                          } // 상태 변경 함수
                        />
                        <label htmlFor={gender}>{gender}</label>{' '}
                        {/* 레이블에 성별 표시 */}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="input_area">
                  <span className="input_label">나이 (만)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="age"
                      className="basic_input validate_chk"
                      placeholder="나이를 입력해주세요."
                      value={requestData['age'] || ''}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                    <span className="validate"></span>
                  </div>
                </div>
                <div className="input_area">
                  <span className="input_label">신장 (cm)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="height"
                      className="basic_input validate_chk"
                      placeholder="신장을 입력해주세요."
                      value={requestData['height'] || ''}
                      onChange={(e) =>
                        handleInputChange('height', e.target.value)
                      }
                    />
                    <span className="validate"></span>
                  </div>
                </div>
                <div className="input_area">
                  <span className="input_label">체중 (kg)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="weight"
                      className="basic_input validate_chk"
                      placeholder="체중을 입력해주세요."
                      value={requestData['weight'] || ''}
                      onChange={(e) =>
                        handleInputChange('weight', e.target.value)
                      }
                    />
                    <span className="validate"></span>
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
    </>
  );
}
