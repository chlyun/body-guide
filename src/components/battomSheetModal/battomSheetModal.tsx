import ReactDOM from 'react-dom';

export default function BottomSheetModal({
  isVisible,
  onClose,
  children,
  title,
}) {
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
              className="basic_btn closeBtn "
              onClick={onClose}
            >
              확인
            </button>
          </div>
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
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          background-color: #ffffff;
          position: fixed;
          z-index: 10000;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
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
        }

        .inner .content_box.full {
          max-height: 534px;
          overflow-y: auto;
        }

        .inner .content_box.full .content {
          margin-bottom: 1.6rem;
        }

        .content_view {
          margin-top: 1rem;
          padding: 2.4rem 2rem 3.2rem 2rem;
          box-sizing: border-box;
          border-radius: 20px;
          border: 1px solid #d3d3d3;
          background: #fff;
          box-shadow: 0px 12px 16px -1px rgba(35, 48, 59, 0.1);
          display: flex;
          flex-direction: column;
          row-gap: 0.8rem;
        }

        .content_view p {
          color: #111111;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 185%;
          letter-spacing: -0.35px;
        }

        .content_title {
          color: #111;
          font-size: 1.8rem;
          font-weight: 600;
          line-height: 144%;
          letter-spacing: -0.45px;
        }

        .btn_area {
          margin-top: 1rem;
        }
      `}</style>
    </div>,
    document.body,
  );
}
