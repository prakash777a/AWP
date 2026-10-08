import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ toast, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Add slide-out animation just before it unmounts naturally
    const closingTimer = setTimeout(() => {
      setIsClosing(true);
    }, 2700); // 3000ms duration - 300ms animation overlap

    return () => clearTimeout(closingTimer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // allow animation to finish
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`toast toast-${toast.type} ${isClosing ? 'toast-exit' : 'toast-enter'}`}>
      <div className="toast-icon">
        {icons[toast.type] || icons.info}
      </div>
      <div className="toast-message">
        {toast.message}
      </div>
      <button className="toast-close" onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
