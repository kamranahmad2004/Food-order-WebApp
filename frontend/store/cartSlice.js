import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "meal",
  initialState: {
    meals: [],
    mealsItems: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.mealsItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return; 
      }

      state.mealsItems.push({
        id: newItem.id,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price,
        name: newItem.name,
      });
      state.totalPrice += newItem.price;
      state.totalQuantity++;
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.mealsItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalPrice += existingItem.price;
      }
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.mealsItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalPrice -= existingItem.price;

        if (existingItem.quantity === 0) {
          state.mealsItems = state.mealsItems.filter((item) => item.id !== id);
        }
      }
    },

    submitOrder(state, action) {
      state.order = action.payload; 
    },
    
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },

    setMeals(state, action) {
      state.meals = action.payload;
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.mealsItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.mealsItems = state.mealsItems.filter((item) => item.id !== id);
      }
    },

    clearCart(state) {
      state.mealsItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
  }  
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
