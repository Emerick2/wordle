interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="modalClose" onClick={onClose}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;