import React from "react";
import { formatter } from "../../Util/Formetter";
import Button from "../../Util/Button";
import Input from "../../Util/Input";
import { submitData } from "../../store/actionCreater"; // Ensure this is correctly imported
import { useSelector, useDispatch } from "react-redux";

const FormModal = ({ dialog, showSuccess }) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const submitForm =  (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const userInfo = Object.fromEntries(fd.entries());

    dispatch(submitData(userInfo, cartItems.mealsItems));

    showSuccess();
  };

  return (
    <form onSubmit={submitForm}>
      <h2>Checkout</h2>
      <div>Total Amount: {formatter.format(cartItems.totalPrice)}</div>
      <Input label="Name" name="name" defineType="text" forId="name" />
      <Input label="Email" name="email" defineType="email" forId="email" />
      <Input label="Street" name="street" defineType="text" forId="street" />
      <div className="control-row">
        <Input
          label="Postal Code"
          defineType="text"
          name="postal-code"
          forId="postal-code"
        />
        <Input label="City" defineType="text" name="city" forId="city" />
      </div>

      <div className="modal-actions">
        <Button textOnly onClick={dialog}>
          Close
        </Button>
        <Button type="submit">Add to Cart</Button>
      </div>
    </form>
  );
};

export default FormModal;
