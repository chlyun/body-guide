import ReactDOM from 'react-dom';

export default function AlertModal({ isVisible, onClose, children, title }) {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>
          <button type="button" className="closeBtn" onClick={onClose}>
            <img src="/svgs/close.svg" alt="닫기버튼아이콘" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal {
          padding: 20px;
          border-radius: 6px;
          background-color: #fff;
          width: 100%;
          max-width: 90%;
          z-index: 10000;
        }
        .modal-header {
          width: calc(100% - 5rem);
          margin: 0 auto 4rem;
          padding-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 1.4rem 0;
          box-sizing: border-box;
          h5 {
            color: #111111;
            font-size: 2rem;
            font-weight: 600;
            line-height: 150%;
            letter-spacing: -0.4px;
            margin: 0;
            position: absolute;
            left: 50%;
            transform: translateX(
              -50%
            ); // 실제로 중앙에 위치하게 하기 위해 -50% 이동
          }
          .closeBtn {
            position: absolute;
            right: 0.1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
          }
        }
      `}</style>
    </div>,
    document.body,
  );
}
