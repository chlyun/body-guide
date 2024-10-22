'use client';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useNutriresultStore from '@/store/nutriresstore';
import Loading from '@/app/loading';
import BottomSheetModal from '@/components/battomSheetModal/battomSheetModal';

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { nutrientResult, isNutrientResultAvailable } = useNutriresultStore();

  const handleNextStep = () => {
    router.push('/nutri/result_detail'); // 페이지 이동
  };

  const [loading, setLoading] = useState(true); // 리디렉션 로딩

  // 리디렉팅
  useEffect(() => {
    if (!isNutrientResultAvailable()) {
      router.push('/nutri');
    } else {
      setLoading(false);
    }
  }, [isNutrientResultAvailable, router]);

  // 모달 상태를 쿼리 파라미터로 관리
  const isBottomSheetVisible = searchParams.get('modal') === 'bottomSheet';
  const isBottomSheet02Visible = searchParams.get('modal') === 'bottomSheet02';

  const handleBottomSheetOpen = () => {
    router.push('?modal=bottomSheet');
  };
  const handleBottomSheet02Open = () => {
    router.push('?modal=bottomSheet02');
  };

  const handleCloseModal = () => {
    router.back(); // 쿼리 제거 (기본 URL로 돌아감)
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const initChart = async () => {
      const Chart = (await import('chart.js/auto')).default;

      const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');

        if (!listContainer) {
          listContainer = document.createElement('ul');
          listContainer.style.display = 'flex';
          listContainer.style.flexDirection = 'column';
          listContainer.style.rowGap = '0.8rem';
          listContainer.style.margin = '0';
          listContainer.style.padding = '0';

          legendContainer.appendChild(listContainer);
        }

        return listContainer;
      };

      const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
          const ul = getOrCreateLegendList(chart, options.containerID);

          // Remove old legend items
          while (ul.firstChild) {
            ul.firstChild.remove();
          }

          // Reuse the built-in legendItems generator
          const items =
            chart.options.plugins.legend.labels.generateLabels(chart);
          const dataValue = chart.data.datasets[0].data;
          items.forEach((item) => {
            const li = document.createElement('li');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';

            li.onclick = () => {
              const { type } = chart.config;
              if (type === 'pie' || type === 'doughnut') {
                chart.toggleDataVisibility(item.index);
              } else {
                chart.setDatasetVisibility(
                  item.datasetIndex,
                  !chart.isDatasetVisible(item.datasetIndex),
                );
              }
              chart.update();
            };

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.flexShrink = '0';
            boxSpan.style.height = '12px';
            boxSpan.style.marginRight = '1rem';
            boxSpan.style.width = '12px';
            boxSpan.style.borderRadius = '8px';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = '#111111';
            textContainer.style.fontSize = '1.4rem';
            textContainer.style.fontWeight = '400';
            textContainer.style.lineHeight = '140%';
            textContainer.style.letterSpacing = '-0.35px';
            textContainer.style.margin = '0';
            textContainer.style.marginRight = '0.6rem';
            textContainer.style.padding = '0';
            textContainer.style.textDecoration = item.hidden
              ? 'line-through'
              : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            const textContainerValue = document.createElement('p');
            textContainerValue.style.color = '#111111';
            textContainerValue.style.fontSize = '1.4rem';
            textContainerValue.style.fontWeight = '400';
            textContainerValue.style.lineHeight = '140%';
            textContainerValue.style.letterSpacing = '-0.35px';
            textContainerValue.style.margin = '0';
            textContainerValue.style.padding = '0';
            const dataValText = document.createTextNode(
              dataValue[item.index] + '%',
            );
            textContainerValue.append(dataValText);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            li.appendChild(textContainerValue);
            ul.appendChild(li);
          });
        },
      };

      const ctx = document.getElementById('myChart');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['탄수화물', '단백질', '불포화지방', '포화지방'],
          datasets: [
            {
              data: [
                nutrientResult.composition.carbohydrate.ratio,
                nutrientResult.composition.protein.ratio,
                nutrientResult.composition.unFat.ratio,
                nutrientResult.composition.satFat.ratio,
              ],
              backgroundColor: ['#3BC482', '#FF4A4A', '#FFD460', '#FCD9C5'],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            htmlLegend: {
              containerID: 'legend-container',
            },
          },
        },
        plugins: [htmlLegendPlugin],
      });
    };

    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>식단 분석 결과</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
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
            <h2>식단 분석 결과</h2>
          </div>
        </header>
        <main className="main">
          <div className="inner">
            {/* 사용자 정보 분석 섹션 */}
            <div className="box">
              <div className="sub">
                <span>영양분석 리포트</span>
                <button id="detailViewBtn" onClick={handleBottomSheetOpen}>
                  <span>상세보기</span>
                  <img
                    src="/svgs/arrow_right_gray.svg"
                    alt="상세보기 화살표 아이콘"
                  />
                </button>
              </div>
              <h5>사용자 정보 분석</h5>
              <p>
                사용자의 입력 정보를 기반으로 분석을 제공합니다. <br />
                자세한 계산방법은 상세보기를 눌러 알아보세요.
              </p>
              <div className="result_area">
                <ul className="result_list">
                  <li>
                    <span className="circle">{nutrientResult.BMI}</span>
                    <span className="label">체질량 지수</span>
                  </li>
                  <li>
                    <span className="circle">{nutrientResult.dietGoal}</span>
                    <span className="label">섭취목적</span>
                  </li>
                  <li className="line_02">
                    <span className="circle">{nutrientResult.TDEE} kcal</span>
                    <span className="label">
                      운동량을 고려한
                      <br />총 대사량
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 식단 영양소 비율 섹션 */}
            <div className="box">
              <div className="sub">
                <span>영양분석 리포트</span>
                <button id="ratioViewBtn" onClick={handleBottomSheet02Open}>
                  <span>상세보기</span>
                  <img
                    src="/svgs/arrow_right_gray.svg"
                    alt="상세보기 화살표 아이콘"
                  />
                </button>
              </div>
              <h5>식단 영양소 비율</h5>
              <p>
                추천드리는 식단의 비율은 다음과 같습니다. <br />
                설정 값: 탄수화물{' '}
                {nutrientResult.composition.carbohydrate.ratio}%, 단백질{' '}
                {nutrientResult.composition.protein.ratio}%, 지방{' '}
                {nutrientResult.composition.unFat.ratio +
                  nutrientResult.composition.satFat.ratio}
                %
              </p>
              <div className="result_area">
                <div className="chart_area">
                  <div className="canvas_area">
                    <canvas id="myChart"></canvas>
                  </div>
                  <div className="legend" id="legend-container"></div>
                </div>
                <div className="result_txt">
                  <div className="result_txt_total">
                    <span className="total_txt">전체 섭취 칼로리</span>
                    <span className="total_calories">
                      {nutrientResult.targetCalory} kcal
                    </span>
                  </div>
                  <div className="result_txt_list">
                    <ul>
                      <li>
                        <div className="txt">
                          <span className="nutri_txt">탄수화물</span>
                          <span className="grams">
                            {nutrientResult.composition.carbohydrate.gram}g
                          </span>
                        </div>
                        <span className="kcalories">
                          {nutrientResult.composition.carbohydrate.calory} kcal
                        </span>
                      </li>
                      <li>
                        <div className="txt">
                          <span className="nutri_txt">단백질</span>
                          <span className="grams">
                            {nutrientResult.composition.protein.gram}g
                          </span>
                        </div>
                        <span className="kcalories">
                          {nutrientResult.composition.protein.calory} kcal
                        </span>
                      </li>
                      <li>
                        <div className="txt">
                          <span className="nutri_txt">불포화지방</span>
                          <span className="grams">
                            {nutrientResult.composition.unFat.gram}g
                          </span>
                        </div>
                        <span className="kcalories">
                          {nutrientResult.composition.unFat.calory} kcal
                        </span>
                      </li>
                      <li>
                        <div className="txt">
                          <span className="nutri_txt">포화지방</span>
                          <span className="grams">
                            {nutrientResult.composition.satFat.gram}g
                          </span>
                        </div>
                        <span className="kcalories">
                          {nutrientResult.composition.satFat.calory} kcal
                        </span>
                      </li>
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

            {/* 팝업 상세보기 모달 */}
            <BottomSheetModal
              isVisible={isBottomSheetVisible}
              onClose={handleCloseModal}
              title="사용자 정보 분석 상세"
            >
              <div className="content_box">
                <div className="content">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>체질량 지수(BMI)에 대한 정보</h6>
                  </div>
                  <div className="content_detail">
                    <p>
                      체질량 지수란 체중(kg)을 키(m)의 제곱으로 나눈 값으로,
                      비만도를 간접적으로 측정하는 방법입니다. 아래의 내용은
                      체질량 지수에 따른 측정 구간입니다.
                    </p>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>저체중: 18.5 이하</li>
                      <li>정상 체중: 18.5~22.9 구간</li>
                      <li>비만 전 단계: 23~24.9 구간</li>
                      <li>비만 1단계: 25~29.9 구간</li>
                      <li>비만 2단계: 30~34.9 구간</li>
                      <li>비만 3단계: 35 이상</li>
                    </ul>
                  </div>
                </div>
                <div className="content bottom_02">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>섭취 목적에 따른 칼로리 계산</h6>
                  </div>
                  <div className="content_detail">
                    <p>
                      본 서비스에서 제공하는 운동량을 고려한 총 대사량(TDEE)에
                      대한 공식은 Harris-Benedict 방정식을 적용합니다.
                    </p>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>
                        체중 감소: 총 대사량(TDEE) - 500kcal, 한 달 기준 2kg
                        감량
                      </li>
                      <li>체중 유지: 총 대사량(TDEE)</li>
                      <li>
                        체중 증가: 총 대사량(TDEE)의 120%, 한 달 기준 2kg 증량
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BottomSheetModal>

            <BottomSheetModal
              isVisible={isBottomSheet02Visible}
              onClose={handleCloseModal}
              title="영양소 비율 상세"
            >
              <div className="content_box">
                <div className="content">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>일반적 식단</h6>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>탄수화물: 50%</li>
                      <li>단백질: 30%</li>
                      <li>불포화지방: 12%</li>
                      <li>포화지방: 8%</li>
                    </ul>
                  </div>
                </div>
                <div className="content">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>저탄수화물 식단</h6>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>탄수화물: 20%</li>
                      <li>단백질: 40%</li>
                      <li>불포화지방: 25%</li>
                      <li>포화지방: 15%</li>
                    </ul>
                  </div>
                </div>
                <div className="content">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>고탄수화물 식단</h6>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>탄수화물: 60%</li>
                      <li>단백질: 20%</li>
                      <li>불포화지방: 15%</li>
                      <li>포화지방: 5%</li>
                    </ul>
                  </div>
                </div>
                <div className="content bottom_last">
                  <div className="content_title">
                    <figure>
                      <img src="/svgs/check.svg" alt="체크 이미지" />
                    </figure>
                    <h6>저지방 식단</h6>
                  </div>
                  <div className="content_txt_list">
                    <ul>
                      <li>탄수화물: 50%</li>
                      <li>단백질: 35%</li>
                      <li>불포화지방: 10%</li>
                      <li>포화지방: 5%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </BottomSheetModal>
          </div>
        </main>
      </div>
    </>
  );
}
