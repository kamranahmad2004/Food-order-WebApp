import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Util/Button";
import { formatter } from "../../Util/Formetter";
import useToastNotification from "../../Util/useToastNotification";
import { cartActions } from "../../store/cartSlice";

const CartModal = ({ dialog, checkOut }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { showCustomToast } = useToastNotification();

  useEffect(() => {
    const total = cartItems.mealsItems.reduce((acc, meal) => {
      return acc + meal.price * meal.quantity;
    }, 0);
    dispatch(cartActions.setTotalPrice(total));
  }, [cartItems.mealsItems, dispatch]); 

  const handleIncreaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, name) => {
    const item = cartItems.mealsItems.find((meal) => meal.id === id);

    if (item.quantity === 1) {
      dispatch(cartActions.removeItem(id));
      showCustomToast(`${name} has been removed from the cart.`, {
        type: "error",
      });
    } else {
      dispatch(cartActions.decreaseQuantity(id));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (cartItems.mealsItems.length === 0) {
      showCustomToast("Cart is empty", { type: "error" });
    } else {
      checkOut();
    }
  };

  return (
    <>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cartItems.mealsItems.length > 0 ? (
            cartItems.mealsItems.map((meal) => (
              <li key={meal.id} className="cart-item">
                <div>
                  {meal.name} - {meal.quantity} ={" "}
                  {formatter.format(meal.price * meal.quantity)}
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => handleDecreaseQuantity(meal.id, meal.name)}
                  >
                    -
                  </button>
                  <span>{meal.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(meal.id)}>
                    +
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      <div className="cart-total">{formatter.format(cartItems.totalPrice)}</div>
      <form method="dialog" onSubmit={submitForm} className="modal-actions">
        <Button className="text-button" textOnly type="button" onClick={dialog}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </form>
    </>
  );
};

export default CartModal;
