import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function BottomSheetModal({
  isVisible,
  onClose,
  children,
  title,
}) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="detail-view-overlay" onClick={onClose}>
      <div className="detail_view" onClick={(e) => e.stopPropagation()}>
        <div className="inner">
          <div className="title">
            <h5>{title}</h5>
            <button type="button" className="closeBtn" onClick={onClose}>
              <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
            </button>
          </div>
          <div className="content_box full">{children}</div>
          <div className="btn_area">
            <button
              type="button"
              className="basic_btn closeBtn"
              onClick={onClose}
            >
              확인
            </button>
          </div>
          <div className="safe_area"></div>
        </div>
      </div>
      <style jsx>{`
        .detail-view-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 9999;
        }

        .detail_view {
          max-width: 720px;
          width: 100%;
          height: auto;
          max-height: 80vh;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          background-color: #ffffff;
          position: fixed;
          z-index: 10000;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          /* 하단 안전 영역을 위한 패딩 추가 */
          padding-bottom: env(safe-area-inset-bottom, 2rem);
        }

        .inner {
          width: calc(100% - 4rem);
          margin: 0 auto;
          padding-bottom: 1rem;
        }

        .inner .title {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 1.4rem 0;
          box-sizing: border-box;
        }

        .inner .title h5 {
          color: #111111;
          font-size: 2rem;
          font-weight: 600;
          line-height: 140%;
          letter-spacing: -0.5px;
        }

        .inner .title button {
          position: absolute;
          background-color: #ffffff;
          width: 2.8rem;
          height: 2.8rem;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          border: none;
          cursor: pointer;
        }

        .inner .content_box.full {
          max-height: calc(80vh - 20rem); /* 하단 여백을 고려하여 조정 */
          overflow-y: auto;
        }

        .inner .content_box.full .content {
          margin-bottom: 1.6rem;
        }

        .btn_area {
          margin-top: 1rem;
          /* 하단 안전 영역만큼 마진 추가 */
          margin-bottom: env(safe-area-inset-bottom, 1rem);
        }

        .basic_btn {
          width: 100%;
          padding: 1.4rem; /* 버튼 높이 살짝 증가 */
          background: #111;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.6rem;
          cursor: pointer;
        }

        .basic_btn:hover {
          background: #333;
        }

        /* 안전 영역을 위한 추가 공간 */
        .safe_area {
          height: env(safe-area-inset-bottom, 2rem);
        }
      `}</style>
    </div>,
    document.body,
  );
}
