import { toast } from "react-toastify";

const useToastNotification = () => {
  const showCustomToast = (message, options = {}) => {
    toast(message, {
      position: options.position || "top-right",
      type: options.type || "default", // 'info', 'success', 'warning', 'error'
      autoClose: options.autoClose || 2000,
      hideProgressBar: options.hideProgressBar || false,
      closeOnClick: options.closeOnClick || true,
      pauseOnHover: options.pauseOnHover || true,
      draggable: options.draggable || true,
      progress: options.progress,
    });
  };

  return { showCustomToast };
};

export default useToastNotification;
