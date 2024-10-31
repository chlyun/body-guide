'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import useNutrientRequestStore from '@/store/nutrireqstore';

export default function Index() {
  const router = useRouter();
  const { requestData, setRequestData, validationErrors, validatePageOne } =
    useNutrientRequestStore();

  // 입력이 변경될 때 유효성 검사 즉시 실행
  const handleInputChange = (field: keyof typeof requestData, value: any) => {
    setRequestData({ [field]: value });
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (validatePageOne()) {
      // 유효성 검사가 통과되면 페이지 이동
      router.push('/nutri/detail');
    } else {
      // 유효성 검사가 실패하면 경고 메시지 출력
      alert('모든 필드를 올바르게 입력해주세요.');
    }
  };

  const getValidationClass = (field: keyof typeof validationErrors) => {
    if (validationErrors[field]) {
      return 'wrong';
    }
    if (requestData[field] !== null && requestData[field] !== '') {
      return 'ok';
    }
    return '';
  };

  const getErrorMessage = (field: keyof typeof validationErrors) => {
    return validationErrors[field];
  };

  const getGenderText = (sex) => {
    return sex === '남' ? '남성' : '여성';
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
            <button
              className="back-button"
              type="button"
              onClick={() => router.back()}
            >
              <figure>
                <img src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" />
              </figure>
            </button>
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
                {/* 성별 */}
                <div className="input_area radio">
                  <span className="input_label">성별</span>
                  <div className="radio_area">
                    {['남', '여'].map((sex) => (
                      <div className="radio_one" key={sex}>
                        <input
                          type="radio"
                          className="basic_radio"
                          name="sex"
                          id={sex}
                          value={sex}
                          checked={requestData['sex'] === sex}
                          onChange={(e) =>
                            handleInputChange('sex', e.target.value)
                          }
                        />
                        <label htmlFor={sex}>{getGenderText(sex)}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 나이 입력 필드 */}
                <div className="input_area">
                  <span className="input_label">나이 (만)</span>
                  <div className={`validate_type ${getValidationClass('age')}`}>
                    <input
                      type="number"
                      id="age"
                      className={`basic_input validate_chk ${getValidationClass('age')}`}
                      placeholder="나이를 입력해주세요."
                      value={requestData['age'] || ''}
                      onChange={(e) =>
                        handleInputChange('age', parseInt(e.target.value))
                      }
                    />
                    <span className="validate wrong">
                      {getErrorMessage('age')}
                    </span>
                  </div>
                </div>

                {/* 신장 입력 필드 */}
                <div className="input_area">
                  <span className="input_label">신장 (cm)</span>
                  <div
                    className={`validate_type ${getValidationClass('height')}`}
                  >
                    <input
                      type="number"
                      id="height"
                      className={`basic_input validate_chk ${getValidationClass('height')}`}
                      placeholder="신장을 입력해주세요."
                      value={requestData['height'] || ''}
                      onChange={(e) =>
                        handleInputChange('height', parseInt(e.target.value))
                      }
                    />
                    <span className="validate wrong">
                      {getErrorMessage('height')}
                    </span>
                  </div>
                </div>

                {/* 체중 입력 필드 */}
                <div className="input_area">
                  <span className="input_label">체중 (kg)</span>
                  <div
                    className={`validate_type ${getValidationClass('weight')}`}
                  >
                    <input
                      type="number"
                      id="weight"
                      className={`basic_input validate_chk ${getValidationClass('weight')}`}
                      placeholder="체중을 입력해주세요."
                      value={requestData['weight'] || ''}
                      onChange={(e) =>
                        handleInputChange('weight', parseInt(e.target.value))
                      }
                    />
                    <span className="validate wrong">
                      {getErrorMessage('weight')}
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
      </div>
    </>
  );
}
