'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Purpose(){

    const router = useRouter();

    const handleNextStep = () => {
        router.push('/exer/result'); // 페이지 이동
        };

  const [selectedPurposes, setSelectedPurposes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedPurposes([...selectedPurposes, id]);
    } else {
      setSelectedPurposes(selectedPurposes.filter((purpose) => purpose !== id));
    }
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <a href="#">
            <figure>
              <Image src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" width={24} height={24} />
            </figure>
          </a>
          <h2>보충제 섭취 목적</h2>
        </div>
      </header>

      <main className="main">
        <div className="inner">
          <div className="box">
            <h6>보충제의 섭취 목적</h6>
            <p>
              해당되는 보충제 섭취 목적을 선택하세요.
              <br />
              선택하신 목적에 맞는 성분을 추천드립니다.
            </p>
            <div className="chk_area">
              <ul className="chk_group">
                {[
                  '각성효과',
                  '근력 향상',
                  '근지구력 향상',
                  '수행능력향상',
                  '혈류개선',
                  '체지방 감소',
                  '산소공급개선',
                  '근합성촉진',
                  '장 건강',
                  '근회복 증진',
                  '근손실방지',
                  '에너지 보충',
                  '탈수예방',
                  '포만감 제공',
                  '변비 예방',
                  '소화 촉진',
                  '항산화 작용',
                  '면역력 증진',
                  '항암효과',
                  '중금속해독',
                  '스트레스 완화',
                  '혈당 조절',
                  '수면질 향상',
                  '피부건강',
                  '성장호르몬 분비',
                  '혈압 건강',
                  '염증억제',
                  '심혈관건강',
                  '골다공증예방',
                  '뇌기능향상',
                  '콜레스테롤 감소',
                  '여성호르몬 균형',
                  '관절건강유지',
                ].map((purpose, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      className="basic_chk"
                      name="exer_purpose"
                      id={`purpose${index + 1}`}
                      onChange={handleCheckboxChange}
                    />
                    <label className="basic_chk_label" htmlFor={`purpose${index + 1}`}>
                      {purpose}
                    </label>
                    <span className="badge"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="btn_area">
            <button type="button" className="basic_btn" onClick={handleNextStep}>
              다음 단계로
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
