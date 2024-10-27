import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatter } from "../Util/Formetter";
import Button from "../Util/Button";
import { cartActions } from "../store/cartSlice";
import useToastNotification from "../Util/useToastNotification";
const MealItem = (mealData) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.mealsItems);
  const { showCustomToast } = useToastNotification();

  const addToCart = () => {
    const existingItem = cartItems.find((item) => item.id === mealData.meal.id);

    if (existingItem) {
      showCustomToast(`${mealData.meal.name} is already in the cart.`, { type: "info" });
    } else {
      dispatch(
        cartActions.addItem({
          id: mealData.meal.id,
          name: mealData.meal.name,
          price: mealData.meal.price,
        })
      );

      showCustomToast(`${mealData.meal.name} has been added to the cart!`, { type: "success" });
    }
  };

  return (
    <li className='meal-item'>
      <article>
        <img src={`https://deadpan-accidental-farm.glitch.me/${mealData.meal.image}`} alt={mealData.meal.name} />
        <h3>{mealData.meal.name}</h3>
        <div>
          <p className='meal-item-price'>{formatter.format(mealData.meal.price)}</p>
          <p className='meal-item-description'>{mealData.meal.description}</p>
          <div className='meal-item-actions'>
            <Button onClick={addToCart}>Add to Cart</Button>
          </div>
        </div>
      </article>
    </li>
  );
};

export default MealItem;
