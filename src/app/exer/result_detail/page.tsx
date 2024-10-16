'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useExerciseresultStore from '@/store/exerresstire';

export default function ResultDetail() {
  const router = useRouter();

  const { exerciseResult, setExerciseResult } = useExerciseresultStore();

  const handleNextStep = () => {
    router.push('/exer/shop'); // 페이지 이동
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const $ = require('jquery');

      $(function () {
        $('#detailViewBtn').click(function () {
          $('#detailViewPopUp').show();
          $('.bg').fadeIn();
          $('html, body').css({ overflow: 'hidden', height: '100%' });
        });
        $('#purposeBtn').click(function () {
          $('#purposePopup').show();
          $('.bg').fadeIn();
          $('html, body').css({ overflow: 'hidden', height: '100%' });
        });
        $('.closeBtn').click(function () {
          $('#detailViewPopUp').hide();
          $('#purposePopup').hide();
          $('.bg').fadeOut();
          $('html, body').css({ overflow: 'auto', height: '100%' }); //scroll hidden 해제
        });
      });
    }
  }, []);

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <Link href="#">
            <figure>
              <Image
                src="/svgs/arrow_left.svg"
                alt="뒤로가기 버튼"
                width={24}
                height={24}
              />
            </figure>
          </Link>
          <h2>스포츠 영양제 추천</h2>
        </div>
      </header>

      <main className="main">
        <div className="inner">
          <div className="box">
            <div className="sub">
              <span>스포츠 영양제 조합 추천</span>
            </div>
            <div className="box_title">
              <h5>스포츠 영양제 조합 추천</h5>
              <p>
                본 내용은 운동 수준 및 생활 습관에 따라 상이할 수 있으며
                전문적인 소견을 대신하지 않습니다.
              </p>
            </div>
          </div>

          <div className="box">
            <div className="sub">
              <span>스포츠 영양제 조합 추천</span>
              <button id="detailViewBtn">
                <span>상세보기</span>
                <Image
                  src="/svgs/arrow_right_gray.svg"
                  alt="상세보기 화살표 아이콘"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="box_title small">
              <h5>운동 수준에 따른 추천</h5>
              <p>
                본 내용은 운동 수준 및 생활 습관에 따라 상이할 수 있으며
                전문적인 소견을 대신하지 않습니다.
              </p>
            </div>
            <div className="content_area">
              <div className="content">
                <div className="content_txt_list">
                  <ul>
                    {exerciseResult.recommendByLevel.map((recommend) => {
                      return <li>{recommend.name}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="sub">
              <span>스포츠 영양제 조합 추천</span>
              <button id="purposeBtn">
                <span>상세보기</span>
                <Image
                  src="/svgs/arrow_right_gray.svg"
                  alt="상세보기 화살표 아이콘"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="box_title">
              <h5>운동 목적에 따른 추천</h5>
              <p>
                이윤구님이 선택하신 운동 목적은 체지방 감소, 수행능력
                향상입니다.
              </p>
            </div>
            <div className="content_area">
              {exerciseResult.purposeRecommends.map((recommend) => {
                return (
                  <div className="content" key={recommend.purpose}>
                    <div className="content_title small">
                      <h6 className="small">
                        {recommend.purpose}에 도움이 되는 보충제
                      </h6>
                    </div>
                    <div className="content_txt_list list_v02">
                      <ul>
                        {recommend.profiles.map((profile) => {
                          return <li key={profile.name}>{profile.name}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
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

      {/* 상세보기 팝업 */}
      <div className="bg"></div>
      <div
        className="detail_view"
        id="detailViewPopUp"
        style={{ display: 'none' }}
      >
        <div className="inner">
          <div className="title">
            <h5>영양제 상세 정보</h5>
            <button type="button" className="closeBtn">
              <Image
                src="/svgs/close.svg"
                alt="닫기버튼아이콘"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="content_box full">
            <div className="content">
              <h6>혈류 개선에 도움이 되는 보충제</h6>
              <div className="content_view mb20">
                <span className="content_title">아르기닌</span>
                <p>
                  아르기닌 보충제는 혈류 개선에 도움이 됩니다. 공복에 섭취하는
                  것이 효과적이며 운동 전 20-30분 전에 섭취하세요.
                </p>
                <div className="content_txt_list">
                  <ul>
                    <li>주요 기능: 혈관 확장, 근육 내 산소 공급 증가</li>
                    <li>권장 섭취량: 3-6g / day</li>
                    <li>부작용: 설사, 복통, 혈압 문제에 대한 발생 주의</li>
                    <li>주의사항: 혈압약(ACE 억제제 등)과 함께 섭취 주의</li>
                  </ul>
                </div>
              </div>
              <div className="content_view">
                <span className="content_title">시트룰린</span>
                <p>
                  시트룰린 보충제는 혈류 개선에 도움이 됩니다. 운동 전 20-30분
                  전에 섭취하세요.
                </p>
                <div className="content_txt_list">
                  <ul>
                    <li>주요 기능: 혈관 확장, 근육 내 산소 공급 증가</li>
                    <li>권장 섭취량: 6-8g / day (혈압에 따라)</li>
                    <li>부작용: 메스꺼움, 위장 불편감</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button type="button" className="basic_btn closeBtn">
              확인
            </button>
          </div>
        </div>
      </div>

      {/* 목적에 따른 상세보기 팝업 */}
      <div
        className="detail_view"
        id="purposePopup"
        style={{ display: 'none' }}
      >
        <div className="inner">
          <div className="title">
            <h5>영양제 상세 정보</h5>
            <button type="button" className="closeBtn">
              <Image
                src="/svgs/close.svg"
                alt="닫기버튼아이콘"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="content_box full">
            <div className="content">
              <h6>체지방 감소에 도움이 되는 보충제</h6>
              <div className="content_view mb20">
                <span className="content_title">카르니틴</span>
                <p>
                  카르니틴 보충제는 체지방 감소에 도움이 됩니다. 공복에 섭취하는
                  것이 효과적이며 운동 전 20-30분 전에 섭취하세요.
                </p>
                <div className="content_txt_list">
                  <ul>
                    <li>주요 기능: 지방 대사 촉진, 체지방 감소 도움</li>
                    <li>권장 섭취량: 2-3g / day</li>
                    <li>부작용: 메스꺼움, 설사 유발 가능성</li>
                    <li>주의사항: 신장 질환 환자 섭취 주의</li>
                  </ul>
                </div>
              </div>
              <div className="content_view">
                <span className="content_title">CLA(공액 리놀레산)</span>
                <p>
                  CLA(공액 리놀레산) 보충제는 체지방 감소에 도움이 됩니다. 식사
                  전에 섭취하세요.
                </p>
                <div className="content_txt_list">
                  <ul>
                    <li>주요 기능: 체지방 감소, 대사 촉진</li>
                    <li>권장 섭취량: 500-1500mg / day (체중에 따라)</li>
                    <li>부작용: 위장 장애, 혈당 수치 감소</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button type="button" className="basic_btn closeBtn">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
