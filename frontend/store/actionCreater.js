import { cartActions } from "./cartSlice";

// Action creator for fetching data using redux-thunk
export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        throw new Error("Fetching data failed");
      }

      const data = await response.json();
      dispatch(cartActions.setMeals(data)); 
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
};


export const submitData = (userData, orderItems) => {
    return async (dispatch) => {
      const orderPayload = {
        customer: userData,
        items: orderItems,
      
      };
  
      try {
        const response = await fetch("http://localhost:3000/orders", {
          method: "POST",
          body: JSON.stringify({ order: orderPayload }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const resData = await response.json();
        console.log("Order submitted successfully:", resData);

        if (!response.ok) {
          throw new Error(resData.message || "Sending order data failed");
        }
  
        
        dispatch(cartActions.submitOrder(resData)); 
        return resData; 
  
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  };

