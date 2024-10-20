'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Picker from 'pickerjs';
import '@/styles/picker.css';
import useNutrientRequestStore from '@/store/nutrireqstore';
import ReactDOM from 'react-dom';
import Link from 'next/link';

const Modal = ({ isVisible, onClose, children, title }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>
          <button type="button" className="closeBtn" onClick={onClose}>
            <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          padding: 20px;
          border-radius: 6px;
          background-color: #fff;
          width: 100%;
          max-width: 90%;
        }
        .modal-header {
          width: calc(100% - 5rem);
          margin: 0 auto 4rem;
          padding-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 1.4rem 0;
          box-sizing: border-box;
          h5 {
            color: #111111;
            font-size: 2rem;
            font-weight: 600;
            line-height: 150%;
            letter-spacing: -0.4px;
            margin: 0;
            position: absolute;
            left: 50%;
            transform: translateX(
              -50%
            ); // 실제로 중앙에 위치하게 하기 위해 -50% 이동
          }
          .closeBtn {
            position: absolute;
            right: 0.1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
          }
        }
      `}</style>
    </div>,
    document.body,
  );
};
const BottomSheetModal = ({ isVisible, onClose, children, title }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="detail-view-overlay" onClick={onClose}>
      <div className="detail_view" onClick={(e) => e.stopPropagation()}>
        <div className="inner">
          <div className="title">
            <h5>{title}</h5>
            <button type="button" className="closeBtn" onClick={onClose}>
              <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
            </button>
          </div>
          <div className="content_box full">{children}</div>
          <div className="btn_area">
            <button
              type="button"
              className="basic_btn closeBtn "
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .detail-view-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 202;
        }

        .detail_view {
          max-width: 720px;
          width: 100%;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          background-color: #ffffff;
          position: fixed;
          z-index: 203;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .inner {
          width: calc(100% - 4rem);
          margin: 0 auto;
          padding-bottom: 1rem;
        }

        .inner .title {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 1.4rem 0;
          box-sizing: border-box;
        }

        .inner .title h5 {
          color: #111111;
          font-size: 2rem;
          font-weight: 600;
          line-height: 140%;
          letter-spacing: -0.5px;
        }

        .inner .title button {
          position: absolute;
          background-color: #ffffff;
          width: 2.8rem;
          height: 2.8rem;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }

        .inner .content_box.full {
          max-height: 534px;
          overflow-y: auto;
        }

        .inner .content_box.full .content {
          margin-bottom: 1.6rem;
        }

        .content_view {
          margin-top: 1rem;
          padding: 2.4rem 2rem 3.2rem 2rem;
          box-sizing: border-box;
          border-radius: 20px;
          border: 1px solid #d3d3d3;
          background: #fff;
          box-shadow: 0px 12px 16px -1px rgba(35, 48, 59, 0.1);
          display: flex;
          flex-direction: column;
          row-gap: 0.8rem;
        }

        .content_view p {
          color: #111111;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 185%;
          letter-spacing: -0.35px;
        }

        .content_title {
          color: #111;
          font-size: 1.8rem;
          font-weight: 600;
          line-height: 144%;
          letter-spacing: -0.45px;
        }

        .btn_area {
          margin-top: 1rem;
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default function Detail() {
  const router = useRouter();
  const { requestData, setRequestData, validationErrors, validatePageTwo } =
    useNutrientRequestStore();

  const handleInputChange = (field, value) => {
    setRequestData({ [field]: value });
  };

  const handleNextStep = () => {
    if (validatePageTwo()) {
      router.push('/nutri/loading');
    } else {
      alert('모든 필드를 올바르게 입력해주세요.');
    }
  };

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAlertOpen = () => setAlertVisible(true);
  const handlePopupOpen = () => setPopupVisible(true);
  const handleCloseModal = () => {
    setAlertVisible(false);
    setPopupVisible(false);
  };

  const getErrorMessage = (field: keyof typeof validationErrors) => {
    return validationErrors[field];
  };

  return (
    <>
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
            <h2>상세 정보 입력</h2>
          </div>
        </header>
        <main className="main">
          <div className="inner">
            <div className="box">
              <h6>사용자의 상세 정보를 입력해주세요.</h6>
              <p>
                사용자의 정보를 기반으로 칼로리 계산 및 섭취 목적에 따른 식단을
                추천해드립니다.
              </p>
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
                    id="timeInput"
                    name="wakeup"
                    placeholder="기상 시간을 선택해주세요."
                    value={requestData['wakeup']}
                    readOnly
                  />
                  <div
                    id="timePickerContainer"
                    className="pickerContainer"
                  ></div>
                </div>

                {/* 취침 시간 */}
                <div className="input_area">
                  <span className="input_label">취침 시간</span>
                  <input
                    type="text"
                    className="basic_input"
                    id="timeInput02"
                    name="sleep"
                    placeholder="취침 시간을 선택해주세요."
                    value={requestData['sleep']}
                    readOnly
                  />
                  <div
                    id="timePickerContainer02"
                    className="pickerContainer02"
                  ></div>
                </div>

                <span className="validate wrong">
                  {getErrorMessage('interval')}
                </span>

                {/* 활동 계수 */}
                <div className="input_area">
                  <div className="input_title">
                    <span className="input_label">활동 계수(PA)</span>
                    <button
                      type="button"
                      onClick={handleAlertOpen}
                      className="icon_btn"
                    >
                      <img src="/svgs/circle_mark.svg" alt="도움말 버튼" />
                    </button>
                  </div>
                  <div className="radio_area">
                    {[
                      '비활동적',
                      '저활동적',
                      '활동적',
                      '고활동적',
                      '매우활동적',
                    ].map((PA) => (
                      <div className="radio_one" key={PA}>
                        <input
                          type="radio"
                          className="basic_radio radio_v2"
                          name="PA"
                          id={PA}
                          value={PA}
                          checked={requestData['PA'] === PA}
                          onChange={(e) =>
                            handleInputChange('PA', e.target.value)
                          }
                        />
                        <label htmlFor={PA}>{PA}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 섭취 목적 */}
                <div className="input_area">
                  <span className="input_label">식단 섭취 목적</span>
                  <div className="radio_area">
                    {['체중 감량', '체중 유지', '체중 증가'].map((goal) => (
                      <div className="radio_one" key={goal}>
                        <input
                          type="radio"
                          className="basic_radio radio_v2"
                          name="dietGoal"
                          id={goal}
                          value={goal}
                          checked={requestData['dietGoal'] === goal}
                          onChange={(e) =>
                            handleInputChange('dietGoal', e.target.value)
                          }
                        />
                        <label htmlFor={goal}>{goal}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 식단 유형 선택 */}
                <div className="input_area">
                  <div className="input_title">
                    <span className="input_label">식단 유형 선택</span>
                    <button
                      type="button"
                      onClick={handlePopupOpen}
                      className="icon_btn"
                    >
                      <img src="/svgs/circle_mark.svg" alt="도움말 버튼" />
                    </button>
                  </div>
                  <div className="radio_area">
                    {[
                      '일반적',
                      '저탄수화물',
                      '고탄수화물',
                      '저지방',
                      '비건',
                    ].map((type) => (
                      <div className="radio_one" key={type}>
                        <input
                          type="radio"
                          className="basic_radio radio_v2"
                          name="dietType"
                          id={type}
                          value={type}
                          checked={requestData['dietType'] === type}
                          onChange={(e) =>
                            handleInputChange('dietType', e.target.value)
                          }
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
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

      {/* 활동 계수 모달 */}
      <Modal
        isVisible={isAlertVisible}
        onClose={handleCloseModal}
        title="활동 계수"
      >
        <div className="content">
          <div className="content_title small">
            <h6>신체활동단계별 계수(PA)</h6>
          </div>
          <div className="content_detail">
            <p>
              신체활동단계별 계수 (PA)는 에너지필요추정량(EER) 산출 공식에
              적용되는 값으로, 하루 동안의 신체 활동의 강도에 대한 분류입니다.
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
      </Modal>

      {/* 식단 유형 모달 */}
      <BottomSheetModal
        isVisible={isPopupVisible}
        onClose={handleCloseModal}
        title="영양소 비율 상세"
      >
        <div className="content_box2">
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
      </BottomSheetModal>
    </>
  );
}
