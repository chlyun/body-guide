'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Picker from 'pickerjs';
import '@/styles/picker.css';
import useNutrientRequestStore from '@/store/nutrireqstore';
import AlertModal from '@/components/alertModal/alertModal';
import BottomSheetModal from '@/components/battomSheetModal/battomSheetModal';

export default function Detail() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // 모달 상태를 쿼리 파라미터로 관리
  const isAlertVisible = searchParams.get('modal') === 'alert';
  const isBottomSheetVisible = searchParams.get('modal') === 'bottomSheet';

  const handleAlertOpen = () => {
    router.push('?modal=alert');
  };
  const handleBottomSheetOpen = () => {
    router.push('?modal=bottomSheet');
  };

  const handleCloseModal = () => {
    router.back(); // 쿼리 제거 (기본 URL로 돌아감)
  };

  // Picker 관련 상태 및 설정
  const [timeInput, setTimeInput] = useState<HTMLInputElement | null>(null);
  const [pickerContainer, setPickerContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const [timeInput02, setTimeInput02] = useState<HTMLInputElement | null>(null);
  const [pickerContainer02, setPickerContainer02] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeInputElement = document.getElementById(
      'timeInput',
    ) as HTMLInputElement;
    const pickerContainerElement = document.getElementById(
      'timePickerContainer',
    ) as HTMLDivElement;
    const timeInput02Element = document.getElementById(
      'timeInput02',
    ) as HTMLInputElement;
    const pickerContainer02Element = document.getElementById(
      'timePickerContainer02',
    ) as HTMLDivElement;

    setTimeInput(timeInputElement);
    setPickerContainer(pickerContainerElement);
    setTimeInput02(timeInput02Element);
    setPickerContainer02(pickerContainer02Element);
  }, []);

  useEffect(() => {
    if (!timeInput || !pickerContainer || !timeInput02 || !pickerContainer02) {
      return;
    }

    pickerContainer.style.display = 'none';
    pickerContainer02.style.display = 'none';

    const picker = new Picker(timeInput, {
      format: 'HH:mm',
      controls: false,
      date: requestData.wakeup || '07:00',
      increment: {
        hour: 1,
        minute: 10,
      },
      inline: true,
      container: pickerContainer,
      rows: 3,
      pick: function (event: CustomEvent) {
        const selectedValue = picker.getDate();
        const date =
          typeof selectedValue === 'string'
            ? new Date(selectedValue)
            : selectedValue;

        const formattedDate = picker.formatDate(date);
        timeInput.value = formattedDate;
        handleInputChange('wakeup', formattedDate);
      },
    });

    const picker02 = new Picker(timeInput02, {
      format: 'HH:mm',
      controls: false,
      date: requestData.sleep || '21:00',
      increment: {
        hour: 1,
        minute: 10,
      },
      inline: true,
      container: pickerContainer02,
      rows: 3,
      pick: function (event: CustomEvent) {
        const selectedValue = picker02.getDate();
        const date =
          typeof selectedValue === 'string'
            ? new Date(selectedValue)
            : selectedValue;

        const formattedDate = picker02.formatDate(date);
        timeInput02.value = formattedDate;
        handleInputChange('sleep', formattedDate);
      },
    });

    const togglePicker = (
      container: HTMLElement,
      pickerInstance: Picker,
      time: string,
    ) => {
      if (container.style.display === 'none') {
        if (requestData[time] === '') {
          const selectedValue = pickerInstance.getDate();
          const date =
            typeof selectedValue === 'string'
              ? new Date(selectedValue)
              : selectedValue;

          const formattedDate = pickerInstance.formatDate(date);
          handleInputChange(time, formattedDate);
        }
        container.style.display = 'block';
        pickerInstance.show();
      } else {
        container.style.display = 'none';
      }
    };

    const handleTimeInputClick = () =>
      togglePicker(pickerContainer, picker, 'wakeup');
    const handleTimeInput02Click = () =>
      togglePicker(pickerContainer02, picker02, 'sleep');

    timeInput.addEventListener('click', handleTimeInputClick);
    timeInput02.addEventListener('click', handleTimeInput02Click);

    return () => {
      timeInput.removeEventListener('click', handleTimeInputClick);
      timeInput02.removeEventListener('click', handleTimeInput02Click);
    };
  }, [timeInput, pickerContainer, timeInput02, pickerContainer02]);

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
                      onClick={handleBottomSheetOpen}
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
      <AlertModal
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
      </AlertModal>

      {/* 식단 유형 모달 */}
      <BottomSheetModal
        isVisible={isBottomSheetVisible}
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
