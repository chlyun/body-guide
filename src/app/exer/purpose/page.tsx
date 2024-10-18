'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useExerciseRequestStore from '@/store/exerreqstore';
import { getTags } from '@/api/getTags';
import Link from 'next/link';

export default function Purpose() {
  const router = useRouter();

  const [tags, setTags] = useState<string[] | null>(null); // 상태 초기화 null로 수정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태 타입 지정

  const { requestData, setRequestData, validatePageThree } =
    useExerciseRequestStore();

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      const result = await getTags();

      if (result.error) {
        setError(result.error);
      } else {
        setTags(result);
      }
      setLoading(false);
    };

    fetchTags();
  }, []);

  const handleNextStep = () => {
    if (validatePageThree()) {
      router.push('/exer/loading');
    } else {
      alert('보충제의 섭취 목적을 1개 이상 5개 이하로 선택해주세요.');
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const purpose = value;

    setRequestData({
      ...requestData,
      supplePurpose: checked
        ? [...requestData.supplePurpose, purpose]
        : requestData.supplePurpose.filter((item) => item !== purpose),
    });
  };

  return (
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
                {loading ? (
                  <p>로딩 중...</p>
                ) : error ? (
                  <p>에러가 발생했습니다: {error}</p>
                ) : (
                  tags?.map((purpose, index) => {
                    // supplePurpose 배열에서 현재 purpose의 인덱스 찾기
                    const purposeIndex = requestData.supplePurpose.findIndex(
                      (item) => item === purpose,
                    );

                    return (
                      <li key={index}>
                        <input
                          type="checkbox"
                          className="basic_chk"
                          name="exer_purpose"
                          id={`${index + 1}`}
                          value={purpose}
                          checked={requestData.supplePurpose.includes(purpose)} // 선택 상태 유지
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="basic_chk_label"
                          htmlFor={`${index + 1}`}
                        >
                          {purpose}
                        </label>
                        {/* supplePurpose에 현재 purpose가 있는 경우에만 badge 표시 */}
                        {purposeIndex !== -1 && (
                          <span className="badge">{purposeIndex + 1}</span>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
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
  );
}
