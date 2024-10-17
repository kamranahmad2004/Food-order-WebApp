import React from "react";
import Button from "../../Util/Button";
import useToastNotification from "../../Util/useToastNotification";

const SuccessModal = ({ dialog }) => {
  const { showCustomToast } = useToastNotification();

  const handleSuccess = () => {
    showCustomToast("Proceeding your order..", { type: "success" });
    dialog(); 
  };

  return (
    <div>
      <h2>Success</h2>
      <p>Your order has been placed</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <div className="modal-actions">
        <Button onClick={handleSuccess}>Okay</Button>
      </div>
    </div>
  );
};

export default SuccessModal;
