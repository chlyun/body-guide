'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  gender: string;
  age: string;
  height: string;
  weight: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
  });

  const router = useRouter();

  const handleNextStep = () => {
    router.push('/exer/detail'); // 페이지 이동
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>식단_기본 정보 입력</title>
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
            <h2>기본 정보 입력</h2>
          </div>
        </header>
        <main className="main">
          <div className="inner">
            <div className="box">
              <h6>사용자의 정보를 입력해주세요.</h6>
              <p>
                사용자의 정보를 기반으로 운동 점수를 계산하고 스포츠 영양제의 조합을 추천드립니다.
              </p>
            </div>
            <div className="box">
              <h6>사용자 기본 정보</h6>
              <p>사용자의 기본 정보를 입력해주세요.</p>
              <div className="user_input">
                <div className="input_area radio">
                  <span className="input_label">성별</span>
                  <div className="radio_area">
                    <div className="radio_one">
                      <input
                        type="radio"
                        className="basic_radio"
                        name="gender"
                        id="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                      />
                      <label htmlFor="male">남성</label>
                    </div>
                    <div className="radio_one">
                      <input
                        type="radio"
                        className="basic_radio"
                        name="gender"
                        id="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                      />
                      <label htmlFor="female">여성</label>
                    </div>
                  </div>
                </div>
                <div className="input_area">
                  <span className="input_label">나이 (만)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="age"
                      className="basic_input validate_chk"
                      placeholder="나이를 입력해주세요."
                      value={formData.age}
                      onChange={handleChange}
                    />
                    <span className="validate"></span>
                  </div>
                </div>
                <div className="input_area">
                  <span className="input_label">신장 (cm)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="height"
                      className="basic_input validate_chk"
                      placeholder="신장을 입력해주세요."
                      value={formData.height}
                      onChange={handleChange}
                    />
                    <span className="validate"></span>
                  </div>
                </div>
                <div className="input_area">
                  <span className="input_label">체중 (kg)</span>
                  <div className="validate_type">
                    <input
                      type="number"
                      id="weight"
                      className="basic_input validate_chk"
                      placeholder="체중을 입력해주세요."
                      value={formData.weight}
                      onChange={handleChange}
                    />
                    <span className="validate"></span>
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
