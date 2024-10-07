'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { useState } from 'react';
import Picker from 'pickerjs';

export default function Detail() {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isNutriPopupVisible, setNutriPopupVisible] = useState(false);
    const [wakeTime, setWakeTime] = useState('');
    const [sleepTime, setSleepTime] = useState('');
    
    useEffect(() => {
        const input = document.querySelector('#myPickerInput');
        if (input) {
          new Picker(input, {
            format: 'YYYY/MM/DD',  // 예시로 날짜 형식 지정
          });
        }
      }, []);

    return (
        <>
            <div className="wrap">
                <header className="header">
                    <div className="inner">
                        <a href="#">
                            <figure>
                                <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
                            </figure>
                        </a>
                        <h2>상세 정보 입력</h2>
                    </div>
                </header>
                <main className="main">
                    <div className="inner">
                        <div className="box">
                            <h6>사용자의 상세 정보를 입력해주세요.</h6>
                            <p>사용자의 정보를 기반으로 칼로리 계산 및 섭취 목적에 따른 식단을 추천해드립니다.</p>
                        </div>
                        <div className="box">
                            <h6>사용자 상세 정보</h6>
                            <p>사용자의 상세 정보를 입력해주세요.</p>
                            <div className="user_input">
                                {/* 기상 시간 */}
                                <div className="input_area">
                                    <span className="input_label">기상 시간</span>
                                    <input
                                        type="text"
                                        className="basic_input"
                                        id="myPickerInput"
                                        placeholder="기상 시간을 선택해주세요."
                                    />
                                    <div id="timePickerContainer" className="picker-container"></div>
                                </div>

                                {/* 취침 시간 */}
                                <div className="input_area">
                                    <span className="input_label">취침 시간</span>
                                    <input
                                        type="text"
                                        className="basic_input"
                                        id="timeInput02"
                                        placeholder="취침 시간을 선택해주세요."
                                    />
                                    <div id="timePickerContainer02" className="picker-container"></div>
                                </div>

                                {/* 활동 계수 */}
                                <div className="input_area">
                                    <div className="input_title">
                                        <span className="input_label">활동 계수(PA)</span>
                                        <button
                                            type="button"
                                            className="icon_btn"
                                            onClick={() => setAlertVisible(true)}
                                        >
                                            <img src="/svgs/circle_mark.svg" alt="도움말 버튼" />
                                        </button>
                                    </div>
                                    <div className="radio_area">
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="pa"
                                                id="none"
                                                defaultChecked
                                            />
                                            <label htmlFor="none">비활동적</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="pa"
                                                id="low"
                                            />
                                            <label htmlFor="low">저활동적</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="pa"
                                                id="normal"
                                            />
                                            <label htmlFor="normal">활동적</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="pa"
                                                id="high"
                                            />
                                            <label htmlFor="high">고활동적</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="pa"
                                                id="heavy"
                                            />
                                            <label htmlFor="heavy">매우활동적</label>
                                        </div>
                                    </div>
                                </div>

                                {/* 섭취 목적 */}
                                <div className="input_area">
                                    <span className="input_label">식단 섭취 목적</span>
                                    <div className="radio_area">
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="purpose"
                                                id="lose"
                                                defaultChecked
                                            />
                                            <label htmlFor="lose">체중 감량</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="purpose"
                                                id="maintain"
                                            />
                                            <label htmlFor="maintain">체중 유지</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="purpose"
                                                id="gain"
                                            />
                                            <label htmlFor="gain">체중 증가</label>
                                        </div>
                                    </div>
                                </div>

                                {/* 식단 유형 선택 */}
                                <div className="input_area">
                                    <div className="input_title">
                                        <span className="input_label">식단 유형 선택</span>
                                        <button
                                            type="button"
                                            className="icon_btn"
                                            onClick={() => setNutriPopupVisible(true)}
                                        >
                                            <img src="/svgs/circle_mark.svg" alt="도움말 버튼" />
                                        </button>
                                    </div>
                                    <div className="radio_area">
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="nutri"
                                                id="normal"
                                                defaultChecked
                                            />
                                            <label htmlFor="normal">일반적</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="nutri"
                                                id="lowC"
                                            />
                                            <label htmlFor="lowC">저탄수화물</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="nutri"
                                                id="highC"
                                            />
                                            <label htmlFor="highC">고탄수화물</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="nutri"
                                                id="lowP"
                                            />
                                            <label htmlFor="lowP">저지방</label>
                                        </div>
                                        <div className="radio_one">
                                            <input
                                                type="radio"
                                                className="basic_radio radio_v2"
                                                name="nutri"
                                                id="vegan"
                                            />
                                            <label htmlFor="vegan">비건</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_area">
                            <button
                                type="button"
                                className="basic_btn"
                                onClick={() => (window.location.href = '/nutri_result.html')}
                            >
                                다음 단계로
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* 활동 계수 팝업 */}
            {isAlertVisible && (
                <div className="bg">
                    <div className="alert" id="alert">
                        <div className="inner">
                            <div className="title">
                                <h5>활동 계수</h5>
                                <button
                                    type="button"
                                    className="closeBtn"
                                    onClick={() => setAlertVisible(false)}
                                >
                                    <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
                                </button>
                            </div>
                            <div className="content">
                                <div className="content_title small">
                                    <h6>신체활동단계별 계수(PA)</h6>
                                </div>
                                <div className="content_detail">
                                    <p>
                                        신체활동단계별 계수 (PA)는 에너지필요추정량(EER) 산출 공식에 적용되는
                                        값으로, 하루 동안의 신체 활동의 강도에 대한 분류입니다.
                                    </p>
                                </div>
                                <div className="content_txt_list">
                                    <ul>
                                        <li>비활동적: 휴식기에 비해 1.00-1.39의 강도</li>
                                        <li>저활동적: 휴식기에 비해 1.40-1.59의 강도</li>
                                        <li>활동적: 휴식기에 비해 1.60-1.89의 강도</li>
                                        <li>고활동적: 휴식기에 비해 1.90-2.09의 강도</li>
                                        <li>매우 활동적: 휴식기에 비해 2.09-2.50의 강도</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 식단 유형 팝업 */}
            {isNutriPopupVisible && (
                <div className="bg">
                    <div className="detail_view" id="nutriPopup">
                        <div className="inner">
                            <div className="title">
                                <h5>영양소 비율 상세</h5>
                                <button
                                    type="button"
                                    className="closeBtn"
                                    onClick={() => setNutriPopupVisible(false)}
                                >
                                    <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
                                </button>
                            </div>
                            <div className="content_box full">
                                <div className="content_view mb20">
                                    <span className="content_title title_v03">일반적 식단</span>
                                    <div className="content_txt_list">
                                        <ul>
                                            <li>탄수화물: 50%</li>
                                            <li>단백질: 30%</li>
                                            <li>불포화지방: 12%</li>
                                            <li>포화지방: 8%</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_view">
                                    <span className="content_title title_v03">저탄수화물 식단</span>
                                    <div className="content_txt_list">
                                        <ul>
                                            <li>탄수화물: 20%</li>
                                            <li>단백질: 40%</li>
                                            <li>불포화지방: 25%</li>
                                            <li>포화지방: 15%</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_view">
                                    <span className="content_title title_v03">고탄수화물 식단</span>
                                    <div className="content_txt_list">
                                        <ul>
                                            <li>탄수화물: 60%</li>
                                            <li>단백질: 20%</li>
                                            <li>불포화지방: 15%</li>
                                            <li>포화지방: 5%</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_view">
                                    <span className="content_title title_v03">저지방 식단</span>
                                    <div className="content_txt_list">
                                        <ul>
                                            <li>탄수화물: 50%</li>
                                            <li>단백질: 35%</li>
                                            <li>불포화지방: 10%</li>
                                            <li>포화지방: 5%</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_view">
                                    <span className="content_title title_v03">비건 식단</span>
                                    <div className="content_txt_list">
                                        <ul>
                                            <li>탄수화물: 50%</li>
                                            <li>식물성 단백질: 25%</li>
                                            <li>불포화지방: 20%</li>
                                            <li>포화지방: 5%</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="btn_area">
                                <button
                                    type="button"
                                    className="basic_btn closeBtn"
                                    onClick={() => setNutriPopupVisible(false)}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 스크립트 */}
            <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
            <Script src="/js/picker.js" strategy="beforeInteractive" />
        </>
    );
}
