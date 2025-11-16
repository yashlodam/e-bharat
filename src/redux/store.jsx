import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from "./cartSlice.jsx"

export const store = configureStore({
  reducer: {
      cart: cartSlice,
  },
  devTools:true
})