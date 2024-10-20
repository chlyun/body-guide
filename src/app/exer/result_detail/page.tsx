'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useExerciseresultStore from '@/store/exerresstire';
import Loading from '@/app/loading';

export default function ResultDetail() {
  const router = useRouter();

  const { exerciseResult, isExerciseResultAvailable } =
    useExerciseresultStore();

  const [loading, setLoading] = useState(true); // 로딩 상태

  // 리디렉팅
  useEffect(() => {
    if (!isExerciseResultAvailable()) {
      router.push('/exer');
    } else {
      setLoading(false);
    }
  }, [isExerciseResultAvailable, router]);

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
  }, [loading]);

  if (loading) {
    return <Loading />;
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
                    {exerciseResult.recommendByLevel.map((recommend, index) => {
                      return <li key={index}>{recommend.name}</li>;
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
                이용자님이 선택하신 운동 목적은{' '}
                {exerciseResult.purposeRecommends
                  .map((recommend) => recommend.purpose)
                  .join(', ')}
                입니다.
              </p>
            </div>
            <div className="content_area">
              {exerciseResult.purposeRecommends.map((recommend, index) => {
                return (
                  <div className="content" key={index}>
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
              <h6>이용자님의 운동 수준에 맞는 보충제</h6>
              {exerciseResult.recommendByLevel.map((recommend, index) => {
                return (
                  <div className="content_view mb20" key={index}>
                    <span className="content_title">{recommend.name}</span>
                    <p>{recommend.mention}</p>
                    <div className="content_txt_list">
                      <ul>
                        <li>주요 기능: {recommend.function}</li>
                        <li>권장 섭취량: {recommend.RDI}</li>
                        <li>섭취 시점: {recommend.timing}</li>
                        <li>부작용: {recommend.sideEffect}</li>
                        <li>주의사항: {recommend.precaution}</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
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
            {exerciseResult.purposeRecommends.map((recommend, index) => {
              return (
                <div className="content" key={index}>
                  <h6>{recommend.purpose}에 도움이 되는 보충제</h6>
                  {recommend.profiles.map((profile) => {
                    return (
                      <div className="content_view mb20" key={profile.name}>
                        <span className="content_title">{profile.name}</span>
                        <p>{profile.summary}</p>
                        <div className="content_txt_list">
                          <ul>
                            <li>주요 기능: {profile.function}</li>
                            <li>권장 섭취량: {profile.RDI}</li>
                            <li>섭취 시점: {profile.timing}</li>
                            <li>부작용: {profile.sideEffect}</li>
                            <li>주의사항: {profile.precaution}</li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
