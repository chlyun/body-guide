import { ShopProduct } from '@/types/shop_product';
import Link from 'next/link';
import Image from 'next/image';
import Rating from '../rating/rating';

export default function ShopProductCard(product: ShopProduct) {
  return (
    <Link href={product.url}>
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
          <div className="tag">
            <span>#{product.keyword}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
