import { ShopProduct } from '@/types/shop_product';
import Link from 'next/link';
import Image from 'next/image';
import Rating from '../rating/rating';
import { postProductClickData } from '@/api/postProductClickData';

export default function ShopProductCard(product: ShopProduct) {
  const handleLinkClick = (productId: number) => {
    return () => {
      try {
        postProductClickData(productId);
      } catch (e) {
        console.error('Error posting product click data:', e);
      }
    };
  };

  return (
    <Link
      href={product.url}
      target="_blank"
      onClick={handleLinkClick(product.product_id)}
    >
      <figure>
        <Image src={product.img_url} alt="" width={130} height={130} />
      </figure>
      <div className="txt_area">
        <span className="brand">
          {product.brand ? product.brand : '\u00A0'}
        </span>
        <p className="explain">{product.name}</p>

        {/* Rating과 리뷰 텍스트를 수평으로 배치 */}
        <div
          style={{ marginTop: '6px', display: 'flex', alignItems: 'center' }}
        >
          <Rating rating={product.rating} />
          <span className="ml-4 text-lg text-black-800 font-pretendard">
            리뷰 {product.review.toLocaleString()}
          </span>
        </div>

        <div className="price_area">
          {product.is_rocket_delivery && (
            <div className="tag">
              <span>#로켓배송</span>
            </div>
          )}
          {product.is_rocket_fresh && (
            <div className="tag">
              <span>#로켓프레시</span>
            </div>
          )}
          {product.keyword && (
            <div className="tag">
              <span>#{product.keyword}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
