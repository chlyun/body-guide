'use client';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';


export default function Result() {
    const router = useRouter();

    const handleNextStep = () => {
        router.push('/nutri/result_detail'); // 페이지 이동
      };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const $ = require('jquery');
            
            $(function () {
                $("#detailViewBtn").click(function () {
                    $("#detailViewPopUp").show();
                    $(".bg").fadeIn();
                    $('html, body').css({ 'overflow': 'hidden', 'height': '100%' });
                });
                $("#ratioViewBtn").click(function () {
                    $("#ratioViewPopUp").show();
                    $(".bg").fadeIn();
                    $('html, body').css({ 'overflow': 'hidden', 'height': '100%' });
                });
                $(".closeBtn").click(function () {
                    $("#detailViewPopUp").hide();
                    $("#ratioViewPopUp").hide();
                    $(".bg").fadeOut();
                    $('html, body').css({ 'overflow': 'auto', 'height': '100%' }); //scroll hidden 해제
                });
            });
        }
    }, []);

    const chartRef = useRef(null); // Store chart instance

    useEffect(() => {
        const initChart = async () => {
            if (typeof window !== 'undefined') {
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
                        const items = chart.options.plugins.legend.labels.generateLabels(chart);
                        const dataValue = chart.data.datasets[0].data;
                        items.forEach(item => {
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
                                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
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
                            boxSpan.style.height = '8px';
                            boxSpan.style.marginRight = '1rem';
                            boxSpan.style.width = '8px';
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
                            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

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
                            const dataValText = document.createTextNode(dataValue[item.index] + "%");
                            textContainerValue.append(dataValText);

                            li.appendChild(boxSpan);
                            li.appendChild(textContainer);
                            li.appendChild(textContainerValue);
                            ul.appendChild(li);
                        });
                    }
                };

                const ctx = document.getElementById('myChart');

                // Destroy previous chart instance if it exists
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Create new chart instance and store in ref
                chartRef.current = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['탄수화물', '단백질', '불포화지방', '포화지방'],
                        datasets: [{
                            data: [50, 30, 12, 8],
                            borderWidth: 0,
                            backgroundColor: function (context) {
                                var label = context.chart.data.labels[context.dataIndex];
                                if (label == '탄수화물') {
                                    return '#3BC482';
                                } else if (label == '단백질') {
                                    return '#FF4A4A';
                                } else if (label == '불포화지방') {
                                    return '#FFD460';
                                } else {
                                    return '#FCD9C5';
                                }
                            },
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            htmlLegend: {
                                containerID: 'legend-container',
                            },
                        }
                    },
                    plugins: [htmlLegendPlugin],
                });
            }
        };

        initChart();

        // Cleanup the chart instance on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

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
                        <a href="#">
                            <figure>
                                <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
                            </figure>
                        </a>
                        <h2>식단 분석 결과</h2>
                    </div>
                </header>
                <main className="main">
                    <div className="inner">
                        {/* 사용자 정보 분석 섹션 */}
                        <div className="box">
                            <div className="sub">
                                <span>영양분석 리포트</span>
                                <a href="#" id="detailViewBtn">
                                    <span>상세보기</span>
                                    <img src="/svgs/arrow_right_gray.svg" alt="상세보기 화살표 아이콘" style={{width: '16px', height: '16px'}}/>
                                </a>
                            </div>
                            <h5>사용자 정보 분석</h5>
                            <p>사용자의 입력 정보를 기반으로 분석을 제공합니다. <br />
                                자세한 계산방법은 상세보기를 눌러 알아보세요.</p>
                            <div className="result_area">
                                <ul className="result_list">
                                    <li>
                                        <span className="circle">과체중</span>
                                        <span className="label">체질량 지수</span>
                                    </li>
                                    <li>
                                        <span className="circle">체중감량</span>
                                        <span className="label">섭취목적</span>
                                    </li>
                                    <li className="line_02">
                                        <span className="circle">2,907 kcal</span>
                                        <span className="label">운동량을 고려한<br />총 대사량</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 식단 영양소 비율 섹션 */}
                        <div className="box">
                            <div className="sub">
                                <span>영양분석 리포트</span>
                                <a href="#" id="ratioViewBtn">
                                    <span>상세보기</span>
                                    <img src="/svgs/arrow_right_gray.svg" alt="상세보기 화살표 아이콘" style={{width: '16px', height: '16px'}}/>
                                </a>
                            </div>
                            <h5>식단 영양소 비율</h5>
                            <p>추천드리는 식단의 비율은 다음과 같습니다. <br />
                                설정 값: 탄수화물 50%, 단백질 30%, 지방 20%</p>
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
                                        <span className="total_calories">2000 kcal</span>
                                    </div>
                                    <div className="result_txt_list">
                                        <ul>
                                            <li>
                                                <div className="txt">
                                                    <span className="nutri_txt">탄수화물</span>
                                                    <span className="grams">250g</span>
                                                </div>
                                                <span className="kcalories">1000 kcal</span>
                                            </li>
                                            <li>
                                                <div className="txt">
                                                    <span className="nutri_txt">단백질</span>
                                                    <span className="grams">150g</span>
                                                </div>
                                                <span className="kcalories">600 kcal</span>
                                            </li>
                                            <li>
                                                <div className="txt">
                                                    <span className="nutri_txt">불포화지방</span>
                                                    <span className="grams">26g</span>
                                                </div>
                                                <span className="kcalories">234 kcal</span>
                                            </li>
                                            <li>
                                                <div className="txt">
                                                    <span className="nutri_txt">포화지방</span>
                                                    <span className="grams">16g</span>
                                                </div>
                                                <span className="kcalories">144 kcal</span>
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
                        <div className="bg"></div>
                        <div className="detail_view" id="detailViewPopUp" style={{ display: 'none' }}>
                            <div className="inner">
                                <div className="title">
                                    <h5>사용자 정보 분석 상세</h5>
                                    <button type="button" className="closeBtn"><img src="/svgs/close.svg" alt="닫기버튼아이콘" /></button>
                                </div>
                                <div className="content_box">
                                    <div className="content">
                                        <div className="content_title">
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
                                            <h6>체질량 지수(BMI)에 대한 정보</h6>
                                        </div>
                                        <div className="content_detail">
                                            <p>체질량 지수란 체중(kg)을 키(m)의 제곱으로 나눈 값으로, 비만도를 간접적으로 측정하는 방법입니다. 아래의 내용은 체질량 지수에 따른 측정 구간입니다.</p>
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
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
                                            <h6>섭취 목적에 따른 칼로리 계산</h6>
                                        </div>
                                        <div className="content_detail">
                                            <p>본 서비스에서 제공하는 운동량을 고려한 총 대사량(TDEE)에 대한 공식은 Harris-Benedict 방정식을 적용합니다.</p>
                                        </div>
                                        <div className="content_txt_list">
                                            <ul>
                                                <li>체중 감소: 총 대사량(TDEE) - 500kcal, 한 달 기준 2kg 감량</li>
                                                <li>체중 유지: 총 대사량(TDEE)</li>
                                                <li>체중 증가: 총 대사량(TDEE)의 120%, 한 달 기준 2kg 증량</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_area">
                                    <button type="button" className="basic_btn closeBtn" id="">확인</button>
                                </div>
                            </div>
                        </div>

                        <div className="detail_view" id="ratioViewPopUp" style={{ display: 'none' }}>
                            <div className="inner">
                                <div className="title">
                                    <h5>영양소 비율 상세</h5>
                                    <button type="button" className="closeBtn"><img src="/svgs/close.svg" alt="닫기버튼아이콘" /></button>
                                </div>
                                <div className="content_box">
                                    <div className="content">
                                        <div className="content_title">
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
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
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
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
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
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
                                            <figure><img src="/svgs/check.svg" alt="체크 이미지" /></figure>
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
                                <div className="btn_area">
                                    <button type="button" className="basic_btn closeBtn" id="">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* 스크립트 */}
            <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="beforeInteractive" />
        </>
    );
}