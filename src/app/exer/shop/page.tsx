'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swiper from 'swiper/bundle'; // Swiper는 일반 import 사용
import 'swiper/swiper-bundle.min.css'; // Swiper 스타일 import

export default function Shop() {
  const router = useRouter();

  useEffect(() => {
    // Swiper 초기화
    new Swiper('.mySwiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        720: {
          spaceBetween: 20,
        },
      },
    });
  }, []);

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
          <h2>제품 구매 추천</h2>
        </div>
      </header>

      <main className="main">
        <div className="inner">
          {/* 운동 수준에 따른 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <Image
                      src="/svgs/check.svg"
                      alt="체크 이미지"
                      width={24}
                      height={24}
                    />
                  </figure>
                  <h6>운동 수준에 따른 제품 추천</h6>
                </div>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper list">
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image
                            src="/images/exer_product01.png"
                            alt="제품 이미지"
                            width={130}
                            height={130}
                          />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">BSN</span>
                          <p className="explain">
                            신타-6 프로틴 파우더 드링크 믹스 단백질 보충제
                            초콜릿 밀크셰이크, 2.27kg, 1개
                          </p>
                          <div className="price_area">
                            <span className="price">75,150원</span>
                            <div className="tag">
                              <span>#로켓직구</span>
                              <span>#프로틴</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image
                            src="/images/exer_product02.png"
                            alt="제품 이미지"
                            width={130}
                            height={130}
                          />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">뉴트리코스트</span>
                          <p className="explain">
                            뉴트리코스트 베타-알라닌 언플레이버드 글루텐 프리,
                            500g, 1개
                          </p>
                          <div className="price_area">
                            <span className="price">23,620원</span>
                            <div className="tag">
                              <span>#로켓직구</span>
                              <span>#베타알라닌</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 운동 목적에 따른 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <Image
                      src="/svgs/check.svg"
                      alt="체크 이미지"
                      width={24}
                      height={24}
                    />
                  </figure>
                  <h6>운동 목적에 따른 제품 추천</h6>
                </div>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper list">
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image
                            src="/images/exer_product03.png"
                            alt="제품 이미지"
                            width={130}
                            height={130}
                          />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">나우푸드</span>
                          <p className="explain">
                            나우푸드 가르시니아 1000mg 타블렛, 120정, 1개
                          </p>
                          <div className="price_area">
                            <span className="price">17,090원</span>
                            <div className="tag">
                              <span>#로켓직구</span>
                              <span>#체지방감소</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image
                            src="/images/exer_product04.png"
                            alt="제품 이미지"
                            width={130}
                            height={130}
                          />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">삼대오백</span>
                          <p className="explain">
                            삼대오백 글리세롤 펌프 15p, 300g, 1개
                          </p>
                          <div className="price_area">
                            <span className="price">11,490원</span>
                            <div className="tag">
                              <span>#로켓배송</span>
                              <span>#수행능력향상</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 분석 완료 버튼 */}
          <div className="btn_area">
            <button
              type="button"
              className="basic_btn"
              onClick={() => router.push('/nutri_detail')}
            >
              분석 완료
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
