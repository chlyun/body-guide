'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Swiper from 'swiper/bundle'; // Swiper를 위한 라이브러리 import
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
          <Link href="#">
            <figure>
              <Image src="/svgs/arrow_left.svg" alt="뒤로가기 버튼" width={24} height={24} />
            </figure>
          </Link>
          <h2>제품 구매 추천</h2>
        </div>
      </header>

      <main className="main">
        <div className="inner">
          {/* 탄수화물 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <Image src="/svgs/check.svg" alt="체크 이미지" width={24} height={24} />
                  </figure>
                  <h6>탄수화물 제품 추천</h6>
                </div>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper list">
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image src="/images/nutri_product01.png" alt="" width={130} height={130} />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">신성에프엔비</span>
                          <p className="explain">해맑음 바로먹는 순수고구마, 130g, 10개</p>
                          <div className="price_area">
                            <span className="price">23,900원</span>
                            <div className="tag">
                              <span>#로켓배송</span>
                              <span>#탄수화물</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image src="/images/nutri_product02.png" alt="" width={130} height={130} />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">햇반</span>
                          <p className="explain">햇반 100% 현미로 지은 밥, 130g, 24개</p>
                          <div className="price_area">
                            <span className="price">19,660원</span>
                            <div className="tag">
                              <span>#로켓배송</span>
                              <span>#탄수화물</span>
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

          {/* 단백질 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <Image src="/svgs/check.svg" alt="체크 이미지" width={24} height={24} />
                  </figure>
                  <h6>단백질 제품 추천</h6>
                </div>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper list">
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image src="/images/nutri_product03.png" alt="" width={130} height={130} />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">햇살닭</span>
                          <p className="explain">
                            햇살닭 더촉촉한 소스 닭가슴살 외 12종 12팩(각 1팩씩) / 혼합구성
                          </p>
                          <div className="price_area">
                            <span className="price">19,900원</span>
                            <div className="tag">
                              <span>#로켓배송</span>
                              <span>#단백질</span>
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

          {/* 지방 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content">
                <div className="content_title">
                  <figure>
                    <Image src="/svgs/check.svg" alt="체크 이미지" width={24} height={24} />
                  </figure>
                  <h6>지방 제품 추천</h6>
                </div>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper list">
                    <div className="swiper-slide">
                      <Link href="#">
                        <figure>
                          <Image src="/images/nutri_product05.png" alt="" width={130} height={130} />
                        </figure>
                        <div className="txt_area">
                          <span className="brand">너트리</span>
                          <p className="explain">너트리 볶음캐슈넛, 400g, 1개</p>
                          <div className="price_area">
                            <span className="price">8,900원</span>
                            <div className="tag">
                              <span>#로켓배송</span>
                              <span>#지방</span>
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
            <button type="button" className="basic_btn" onClick={() => router.push('/nutri_detail')}>
              분석 완료
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
