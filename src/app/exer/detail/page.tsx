'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Detail(){

    const router = useRouter();

    const handleNextStep = () => {
        router.push('/exer/purpose'); // 페이지 이동
      };

  const [alertVisible, setAlertVisible] = useState(false);



  const handleAlertOpen = () => {
    setAlertVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    document.body.style.overflow = 'scroll';
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="inner">
          <Link href="#">
            <figure>
              <Image src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" width={24} height={24} />
            </figure>
          </Link>
          <h2>사용자 정보 입력</h2>
        </div>
      </header>
      <main className="main">
        <div className="inner">
          <div className="box">
            <h6>사용자의 정보를 입력해주세요.</h6>
            <p>사용자의 정보를 기반으로 운동 점수를 계산하고 스포츠 영양제의 조합을 추천드립니다.</p>
          </div>
          <div className="box">
            <div className="box_title_style02">
              <h6>운동 수준 평가</h6>
              <button type="button" className="icon_btn" onClick={handleAlertOpen}>
                <Image src="/svgs/circle_mark.svg" alt="도움말 버튼" width={24} height={24} />
              </button>
            </div>
            <p>최대 무게와 수행 횟수를 입력해주세요.</p>
            <div className="user_input">
              {/* 각 입력 필드를 반복적으로 표시 */}
              {['바벨 벤치프레스', '풀 스쿼트', '컨벤셔널 데드리프트', '바벨 오버헤드프레스'].map((exercise, index) => (
                <div className="input_area" key={index}>
                  <span>{`${exercise} (최대 무게 / 수행 횟수)`}</span>
                  <ul className="input_area_02">
                    <li className="validate_type">
                      <input type="number" className="basic_input validate_chk" placeholder="최대 무게(kg)" />
                      <span className="validate"></span>
                    </li>
                    <li className="validate_type">
                      <input type="number" className="basic_input validate_chk" placeholder="수행 횟수" />
                      <span className="validate"></span>
                    </li>
                  </ul>
                </div>
              ))}
              {/* 맨몸 운동 입력 필드 */}
              <div className="input_area">
                <span>맨몸 푸쉬업 (최대 수행 횟수)</span>
                <div className="validate_type">
                  <input type="number" className="basic_input validate_chk" placeholder="최대 수행 횟수를 입력하세요." />
                  <span className="validate"></span>
                </div>
              </div>
              <div className="input_area">
                <span>맨몸 풀업 (최대 수행 횟수)</span>
                <div className="validate_type">
                  <input type="number" className="basic_input validate_chk" placeholder="최대 수행 횟수를 입력하세요." />
                  <span className="validate"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button type="button" className="basic_btn" onClick={handleNextStep}>
              다음 단계로
            </button>
          </div>
        </div>
      </main>

      {alertVisible && (
        <>
          <div className="bg" onClick={handleAlertClose}></div>
          <div className="alert" id="alert">
            <div className="inner">
              <div className="title">
                <h5>운동 수준 평가</h5>
                <button type="button" className="closeBtn" onClick={handleAlertClose}>
                  <Image src="/svgs/close.svg" alt="닫기 버튼 아이콘" width={24} height={24} />
                </button>
              </div>
              <div className="content">
                <div className="content_title small">
                  <h6>1RM 추정에 대한 계산</h6>
                </div>
                <div className="content_detail">
                  <p>
                    1RM(1 Rep Max, 1회 최대 중량)은 한 번에 들 수 있는 최대 무게를 의미합니다. 이는 근력 운동에서 중요한 기준으로 사용되며,
                    개인이 특정 운동을 한 번만 수행할 수 있는 최대 중량을 측정하는 방법입니다.
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
                      -> 100 + 100 * 0.025 * 3 = 107.5kg 추정
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
