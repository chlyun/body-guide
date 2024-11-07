'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swiper from 'swiper/bundle'; // Swiper는 일반 import 사용
import 'swiper/swiper-bundle.min.css'; // Swiper 스타일 import
import useExerciseresultStore from '@/store/exerresstire';
import Loading from '@/app/loading';
import { getHomePage } from '@/api/getHomePage';
import ShopProductCard from '@/components/shopProductCard/shopProductCard';
import PartnersContainer from '@/components/partnersContainer/partnersContainer';

export default function Shop() {
  const router = useRouter();

  const { exerciseResult, isExerciseResultAvailable } =
    useExerciseresultStore();

  const [loading, setLoading] = useState(true); // 로딩 상태

  // 리디렉팅
  useEffect(() => {
    if (!isExerciseResultAvailable()) {
      router.push('/exer');
    } else {
      setLoading(false);
    }
  }, [isExerciseResultAvailable, router]);

  const [homeUrl, sethomeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      const result = await getHomePage();

      sethomeUrl(result['homePage']);
    };

    fetchHomePage();
  }, []);

  const handleNextStep = () => {
    // homeUrl이 유효한지 확인
    if (homeUrl && typeof homeUrl === 'string') {
      window.location.href = homeUrl;
    } else {
      console.error('Invalid homeUrl:', homeUrl);
    }
  };

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
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

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
        <PartnersContainer imageUrl="/images/pills.png" />
        <div className="inner">
          {/* 운동 수준에 따른 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content2">
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
                    {exerciseResult.levelProducts.map((product, index) => {
                      return (
                        <div className="swiper-slide">
                          <ShopProductCard {...product}></ShopProductCard>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 운동 목적에 따른 제품 추천 */}
          <div className="box">
            <div className="content_area">
              <div className="content2">
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
                    {exerciseResult.puporseProducts.map((product, index) => {
                      return (
                        <div className="swiper-slide">
                          <ShopProductCard {...product}></ShopProductCard>
                        </div>
                      );
                    })}
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
              onClick={handleNextStep}
            >
              분석 완료
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
