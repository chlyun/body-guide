'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Chart } from 'chart.js/auto';
import useExerciseresultStore from '@/store/exerresstire';
import Loading from '@/app/loading';

export default function Result() {
  const router = useRouter();

  const { exerciseResult, isExerciseResultAvailable } =
    useExerciseresultStore();

  const handleNextStep = () => {
    router.push('/exer/result_detail'); // 페이지 이동
  };

  const [loading, setLoading] = useState(true); // 리디렉션 로딩

  // 리디렉팅
  useEffect(() => {
    if (!isExerciseResultAvailable()) {
      router.push('/exer');
    } else {
      setLoading(false);
    }
  }, [isExerciseResultAvailable, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const $ = require('jquery');

      $(function () {
        $('#detailViewBtn').click(function () {
          $('#detailViewPopUp').show();
          $('.bg').fadeIn();
          $('html, body').css({ overflow: 'hidden', height: '100%' });
        });
        $('.closeBtn').click(function () {
          $('#detailViewPopUp').hide();
          $('.bg').fadeOut();
          $('html, body').css({ overflow: 'auto', height: '100%' }); //scroll hidden 해제
        });
        $('.basic_btn').click(function () {
          $('#detailViewPopUp').hide();
          $('.bg').fadeOut();
          $('html, body').css({ overflow: 'auto', height: '100%' }); //scroll hidden 해제
        });
      });
    }
  }, [loading]);

  const radarChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      // Radar Chart configuration
      const config = {
        type: 'radar',
        data: {
          labels: ['등', '하체', '팔', '코어', '어깨', '가슴'],
          datasets: [
            {
              label: 'My score',
              backgroundColor: 'rgba(232, 193, 160, 0.25)',
              borderColor: 'rgba(232, 193, 160, 1)',
              pointBackgroundColor: 'rgba(232, 193, 160, 1)',
              data: [
                exerciseResult.ability.pullup.score,
                exerciseResult.ability.squat.score,
                exerciseResult.ability.pushup.score,
                exerciseResult.ability.dead.score,
                exerciseResult.ability.overhead.score,
                exerciseResult.ability.bench.score,
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              grid: {
                circular: true,
              },
              beginAtZero: true,
              min: 0, // 최소값 설정
              max: 120,
              ticks: {
                display: true,
                stepSize: 20,
              },
              pointLabels: {
                font: function (context) {
                  const width = window.innerWidth;
                  if (width <= 768) {
                    return { size: 16 };
                  } else if (width <= 1024) {
                    return { size: 20 };
                  } else {
                    return { size: 24 };
                  }
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return 'My score: ' + tooltipItem.raw + '점';
                },
              },
            },
          },
        },
      };

      // Bar Chart configuration
      const barConfig = {
        type: 'bar',
        data: {
          labels: ['벤치프레스', '스쿼트', '데드리프트', '오버헤드프레스'],
          datasets: [
            {
              label: 'Average',
              backgroundColor: '#9EA3B2',
              data: [
                exerciseResult.ability.bench.average,
                exerciseResult.ability.squat.average,
                exerciseResult.ability.dead.average,
                exerciseResult.ability.overhead.average,
              ],
            },
            {
              label: 'User',
              backgroundColor: '#DE6E6A',
              data: [
                exerciseResult.ability.bench.strength,
                exerciseResult.ability.squat.strength,
                exerciseResult.ability.dead.strength,
                exerciseResult.ability.overhead.strength,
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              ticks: {
                callback: function (value) {
                  return value + ' kg';
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      };

      // Radar chart
      if (radarChartRef.current) {
        radarChartRef.current.destroy();
      }
      const radarCtx = document.getElementById('myChart');
      radarChartRef.current = new Chart(radarCtx, config);

      // Bar chart
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      const barCtx = document.getElementById('myChart2');
      barChartRef.current = new Chart(barCtx, barConfig);
    }
  }, [loading]);

  // 분석 결과를 매핑하는 함수
  const getClassNameByLevel = (level) => {
    switch (level) {
      case '운동선수':
        return 'analyze_level color_01';
      case '고급자':
        return 'analyze_level color_02';
      case '숙련자':
        return 'analyze_level color_03';
      case '중급자':
        return 'analyze_level color_04';
      case '초보자':
        return 'analyze_level color_05';
      case '입문자':
        return 'analyze_level color_06';
      default:
        return 'analyze_level';
    }
  };

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
          <h2>운동 분석 결과</h2>
        </div>
      </header>
      <main className="main">
        <div className="inner">
          <div className="box">
            <div className="sub">
              <span>운동 분석 리포트</span>
              <button id="detailViewBtn">
                <span>상세보기</span>
                <img
                  src="/svgs/arrow_right_gray.svg"
                  alt="상세보기 화살표 아이콘"
                />
              </button>
            </div>
            <h5>운동 수준 총평</h5>
            <p>
              <span id="user">이용자</span>님의 운동 수준은{' '}
              <span id="level">상위 {exerciseResult.topPercent}%</span>로
              추정됩니다.
              <br />
              자세한 계산방법은 상세보기를 눌러 알아보세요.
            </p>
            <ul className="exer_data">
              <li>
                <figure>
                  <Image
                    src="/svgs/exer_01.svg"
                    alt="메달 아이콘"
                    width={24}
                    height={24}
                  />
                </figure>
                <span className="exer_txt">운동 점수</span>
                <span className="exer_txt_sub" id="point">
                  {exerciseResult.totalScore}점
                </span>
              </li>
              <li>
                <figure>
                  <Image
                    src="/svgs/exer_02.svg"
                    alt="트로피 아이콘"
                    width={24}
                    height={24}
                  />
                </figure>
                <span className="exer_txt">운동 수준</span>
                <span className="exer_txt_sub" id="exerLevel">
                  {exerciseResult.totalLevel}
                </span>
              </li>
              <li>
                <figure>
                  <Image
                    src="/svgs/exer_03.svg"
                    alt="덤벨 아이콘"
                    width={24}
                    height={24}
                  />
                </figure>
                <span className="exer_txt">3대 중량</span>
                <span className="exer_txt_sub" id="wegiht">
                  {exerciseResult.bigThree}kg
                </span>
              </li>
            </ul>
          </div>

          {/* 분석 결과 영역 */}
          <div className="box">
            <div className="sub">
              <span className="sub_txt">운동분석 리포트</span>
            </div>
            <h5>종목별 수행능력에 대한 분석입니다.</h5>
            <p>
              종목별 예상 수행 능력을 추정하여 계산한 결과입니다. <br />
              수행 능력은 몸무게를 기준으로 평가합니다.
            </p>
            <div className="result_area">
              <div className="radar_chart_area">
                <div className="radar_canavs_area">
                  <canvas id="myChart"></canvas>
                </div>
              </div>
              <div className="result_txt content2">
                <div className="content_title">
                  <figure>
                    <Image
                      src="/svgs/check.svg"
                      alt="체크 이미지"
                      width={24}
                      height={24}
                    />
                  </figure>
                  <h6>수행능력 분석 상세</h6>
                </div>
                <div className="analyze_detail">
                  {/* 수행능력 분석 리스트 */}
                  <ul>
                    <li>
                      <span className="analyze_title">벤치프레스</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.bench.strength}kg
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.bench.level,
                          )}
                        >
                          [{exerciseResult.ability.bench.level}]
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="analyze_title">스쿼트</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.squat.strength}kg
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.squat.level,
                          )}
                        >
                          [{exerciseResult.ability.squat.level}]
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="analyze_title">데드리프트</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.dead.strength}kg
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.dead.level,
                          )}
                        >
                          [{exerciseResult.ability.dead.level}]
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="analyze_title">오버헤드프레스</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.overhead.strength}kg
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.overhead.level,
                          )}
                        >
                          [{exerciseResult.ability.overhead.level}]
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="analyze_title">푸쉬업</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.pushup.strength}회
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.pushup.level,
                          )}
                        >
                          [{exerciseResult.ability.pushup.level}]
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="analyze_title">풀업</span>
                      <div className="analyze_txt">
                        <span className="analyze_weight">
                          {exerciseResult.ability.pullup.strength}회
                        </span>
                        <span
                          className={getClassNameByLevel(
                            exerciseResult.ability.pullup.level,
                          )}
                        >
                          [{exerciseResult.ability.pullup.level}]
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="result_txt content2">
                <div className="content_title">
                  <figure>
                    <Image
                      src="/svgs/check.svg"
                      alt="체크 이미지"
                      width={24}
                      height={24}
                    />
                  </figure>
                  <h6>수행능력 비교</h6>
                </div>
                <div className="content_detail">
                  <p>몸무게를 기준으로 평균값을 비교한 수행능력입니다.</p>
                </div>
                <div className="chart_area">
                  <div
                    className="bar_chart"
                    style={{
                      width: '100%',
                      height: '340px',
                    }}
                  >
                    <canvas id="myChart2"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 취약 부위 분석 영역 */}
          <div className="box">
            <div className="content_box">
              <div className="result_txt content2">
                <div className="content_title">
                  <figure>
                    <Image
                      src="/svgs/check.svg"
                      alt="체크 이미지"
                      width={24}
                      height={24}
                    />
                  </figure>
                  <h6>상대적으로 약한 부위</h6>
                </div>
                <div className="content_detail">
                  <p>
                    수행 능력을 기반으로 취약 부위에 대한 분석을 제공합니다.
                  </p>
                </div>
                <div className="content_txt_02_area">
                  {exerciseResult.parts.map((part, index) => {
                    const formattedString = part.details
                      .map((str) => str)
                      .join(', ');

                    return (
                      <div className="content_txt_02" key={index}>
                        <span className="txt_02_title">{part.strength}</span>
                        <span className="txt_02_sub">
                          해당 부위: {formattedString} 등
                        </span>
                      </div>
                    );
                  })}
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

      {/* 상세보기 팝업 */}
      <div className="bg"></div>
      <div
        className="detail_view"
        id="detailViewPopUp"
        style={{ display: 'none' }}
      >
        <div className="inner">
          <div className="title">
            <h5>운동 분석 리포트 상세</h5>
            <button type="button" className="closeBtn">
              <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
            </button>
          </div>
          <div className="content_box full">
            <div className="content2">
              <div className="content_title">
                <figure>
                  <Image
                    src="/svgs/check.svg"
                    alt="체크 이미지"
                    width={24}
                    height={24}
                  />
                </figure>
                <h6>운동 수준과 점수</h6>
              </div>
              <div className="content_title title_v02">
                <p>아래의 기준에 따라 운동 점수 및 수준이 결정됩니다.</p>
              </div>
              <div className="content_title full">
                <figure>
                  <Image
                    src="/images/pyramid_02.png"
                    alt="운동수준 피라미드 이미지"
                    width={400}
                    height={400}
                  />
                </figure>
              </div>
            </div>
            <div className="content bottom_02">
              <div className="content_txt_list list_v03">
                <ul>
                  <li>
                    <span className="color_01">운동선수</span>(100~120점)
                  </li>
                  <li>
                    <span className="color_02">고급자</span>(80~99점)
                  </li>
                  <li>
                    <span className="color_03">숙련자</span>(60~79점)
                  </li>
                  <li>
                    <span className="color_04">중급자</span>(40~59점)
                  </li>
                  <li>
                    <span className="color_05">초보자</span>(20~39점)
                  </li>
                  <li>
                    <span className="color_06">입문자</span>(1~19점)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button type="button" className="basic_btn">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
