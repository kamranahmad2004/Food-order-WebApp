import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MealItem from "./MealItem";
import { fetchData } from "../store/actionCreater";
import useLoadingAndError from "../hooks/useLoadingAndError"; 

const Meals = () => {
  const dispatch = useDispatch();
  const cartMeals = useSelector((state) => state.cart.meals);

  const { loading, error, startLoading, stopLoading, setErrorState } =
    useLoadingAndError();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        startLoading();

        await dispatch(fetchData());

        stopLoading(); 
      } catch (err) {
        setErrorState("Failed to fetch meals. Please try again later.");
      }
    };

    fetchMeals();
  }, [dispatch, startLoading, stopLoading, setErrorState]);

  // Show loading message if loading state is true
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading your meals...</p>;
  }

  // Show error message if there's an error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ul id="meals">
        {cartMeals.length > 0 ? (
          cartMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
        ) : (
          <p>No meals found.</p>
        )}
      </ul>
    </>
  );
};

export default Meals;
