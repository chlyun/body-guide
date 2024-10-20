'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import $ from 'jquery';
import Link from 'next/link';
import Image from 'next/image';
import useExerciseRequestStore from '@/store/exerreqstore';
import { ExerciseRequest, ExerciseSet } from '@/types/exercise_request';

export default function Detail() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { requestData, setRequestData, validationErrors, validatePageTwo } =
    useExerciseRequestStore();

  const handleInputChange = (field, value) => {
    setRequestData({ [field]: value });
  };

  const handleNextStep = () => {
    if (validatePageTwo()) {
      router.push('/exer/purpose');
    } else {
      console.log(validationErrors);
      alert('모든 필드를 올바르게 입력해주세요.');
    }
  };

  const handleBackButton = () => {
    if (isModalOpen) {
      closeModal();
    } else {
      router.back();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ modal: true }, '', window.location.pathname);
      $('#alert').show();
      $('.bg').fadeIn();
      $('body').css('overflow', 'hidden');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
      $('#alert').hide();
      $('.bg').fadeOut();
      $('body').css('overflow', 'scroll');
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (isModalOpen) {
        closeModal(); // Properly close the modal on back button press
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  const getValidationClass = (field, subField) => {
    const fullField = subField ? `${field}.${subField}` : field;

    if (validationErrors[fullField]) {
      return 'wrong';
    }

    const value = subField
      ? requestData[field]?.[subField]
      : requestData[field];
    if (value !== null && value !== '') {
      return 'ok';
    }

    return '';
  };

  const getErrorMessage = (field, subField) => {
    const fullField = subField ? `${field}.${subField}` : field;
    return validationErrors[fullField] || '';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const $ = require('jquery');

      $(function () {
        $('#alertBtn').on('click', openModal);
        $('.closeBtn').on('click', closeModal);
      });
    }
  }, []);

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <button
            className="back-button"
            type="button"
            onClick={handleBackButton}
          >
            <figure>
              <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
            </figure>
          </button>
          <h2>사용자 정보 입력</h2>
        </div>
      </header>
      <main className="main">
        <div className="inner">
          <div className="box">
            <h6>사용자의 정보를 입력해주세요.</h6>
            <p>
              사용자의 정보를 기반으로 운동 점수를 계산하고 스포츠 영양제의
              조합을 추천드립니다.
            </p>
          </div>
          <div className="box">
            <div className="box_title_style02">
              <h6>운동 수준 평가</h6>
              <button type="button" id="alertBtn" className="icon_btn">
                <Image
                  src="/svgs/circle_mark.svg"
                  alt="도움말 버튼"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <p>최대 무게와 수행 횟수를 입력해주세요.</p>
            <div className="user_input">
              {[
                { label: '바벨 벤치프레스', field: 'bench' },
                { label: '풀 스쿼트', field: 'squat' },
                { label: '컨벤셔널 데드리프트', field: 'dead' },
                { label: '바벨 오버헤드프레스', field: 'overhead' },
              ].map((exercise, index) => (
                <div className="input_area" key={index}>
                  <span>{`${exercise.label} (최대 무게 / 수행 횟수)`}</span>
                  <ul className="input_area_02">
                    <li
                      className={`validate_type ${getValidationClass(exercise.field, 'weight')}`}
                    >
                      <input
                        type="number"
                        className={`basic_input validate_chk ${getValidationClass(exercise.field, 'weight')}`}
                        placeholder="최대 무게(kg)"
                        value={requestData[exercise.field]?.weight || ''}
                        onChange={(e) =>
                          handleInputChange(exercise.field, {
                            ...requestData[exercise.field],
                            weight: e.target.value,
                          })
                        }
                      />
                      <span className="validate wrong">
                        {getErrorMessage(exercise.field, 'weight')}
                      </span>
                    </li>
                    <li
                      className={`validate_type ${getValidationClass(exercise.field, 'reps')}`}
                    >
                      <input
                        type="number"
                        className={`basic_input validate_chk ${getValidationClass(exercise.field, 'reps')}`}
                        placeholder="수행 횟수"
                        value={requestData[exercise.field]?.reps || ''}
                        onChange={(e) =>
                          handleInputChange(exercise.field, {
                            ...requestData[exercise.field],
                            reps: e.target.value,
                          })
                        }
                      />
                      <span className="validate wrong">
                        {getErrorMessage(exercise.field, 'reps')}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
              <div className="input_area">
                <span>맨몸 푸쉬업 (최대 수행 횟수)</span>
                <div
                  className={`validate_type ${getValidationClass('pushup', 'reps')}`}
                >
                  <input
                    type="number"
                    className={`basic_input validate_chk ${getValidationClass('pushup', 'reps')}`}
                    placeholder="최대 수행 횟수를 입력하세요."
                    value={requestData.pushup?.reps || ''}
                    onChange={(e) =>
                      handleInputChange('pushup', {
                        ...requestData.pushup,
                        reps: e.target.value,
                      })
                    }
                  />
                  <span className="validate wrong">
                    {getErrorMessage('pushup', 'reps')}
                  </span>
                </div>
              </div>
              <div className="input_area">
                <span>맨몸 풀업 (최대 수행 횟수)</span>
                <div
                  className={`validate_type ${getValidationClass('pullup', 'reps')}`}
                >
                  <input
                    type="number"
                    className={`basic_input validate_chk ${getValidationClass('pullup', 'reps')}`}
                    placeholder="최대 수행 횟수를 입력하세요."
                    value={requestData.pullup?.reps || ''}
                    onChange={(e) =>
                      handleInputChange('pullup', {
                        ...requestData.pullup,
                        reps: e.target.value,
                      })
                    }
                  />
                  <span className="validate wrong">
                    {getErrorMessage('pullup', 'reps')}
                  </span>
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

      <>
        <div className="bg"></div>
        <div className="alert" id="alert">
          <div className="inner">
            <div className="title">
              <h5>운동 수준 평가</h5>
              <button type="button" className="closeBtn" id="closeBtn">
                <Image
                  src="/svgs/close.svg"
                  alt="닫기 버튼 아이콘"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="content">
              <div className="content_title small">
                <h6>1RM 추정에 대한 계산</h6>
              </div>
              <div className="content_detail">
                <p>
                  1RM(1 Rep Max, 1회 최대 중량)은 한 번에 들 수 있는 최대 무게를
                  의미합니다. 이는 근력 운동에서 중요한 기준으로 사용되며,
                  개인이 특정 운동을 한 번만 수행할 수 있는 최대 중량을 측정하는
                  방법입니다.
                  <br />
                  <b>최대 수행 횟수는 1회에서 10회 이하로 설정하여야 합니다.</b>
                </p>
              </div>
              <div className="content_txt_list list_v04">
                <ul>
                  <li>1RM(1 Repetition Maximum) = Wo + Wl</li>
                  <li>Wo = 수행 중량</li>
                  <li>Wl = Wo * 0.025 * R (R = 실제 반복 횟수)</li>
                  <li>
                    (예시 1) 벤치프레스 100kg 3회 실시 <br />
                    -&gt; 100 + 100 * 0.025 * 3 = 107.5kg 추정
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
