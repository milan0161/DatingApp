import ReactDOM from 'react-dom';

type BackDropProps = {
  onConfirm: () => void;
};

type ModalOverlayProps = {
  children?: React.ReactNode;
  className: string;
};
type ModalProps = {
  onConfirmBackdrop: () => void;
  children?: React.ReactNode;
  className: string;
};

const Backdrop = ({ onConfirm }: BackDropProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-[100%] z-10 h-screen bg-black opacity-75"
      onClick={onConfirm}
    />
  );
};

const ModalOverlay = ({ children, className }: ModalOverlayProps) => {
  return <div className={className}>{children}</div>;
};

const Modal = ({ children, onConfirmBackdrop, className }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirmBackdrop} />,
        document.getElementById('backdrop-root')!,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay children={children} className={className} />,
        document.getElementById('overlay-root')!,
      )}
    </>
  );
};

export default Modal;
