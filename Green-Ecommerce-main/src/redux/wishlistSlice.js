import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlist = createAsyncThunk(
  "product/addtowishlist",
  async ({ product, token }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/wishlist`,
      { product },
      { headers: { authorization: "Bearer " + token } }
    );
    console.log("added");
    return response.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "product/removefromwishlist",
  async ({ productId, token }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/user/wishlist/${productId}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    console.log("removed")
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlist: [], status: "idle", error: null },
  reducers: {
    removeProductFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((wishlist) => wishlist._id !== action.payload);
    },
    setToWishlist: (state, action) => {
      action.payload.forEach((product) => {
        if (!state.wishlist.some((wishlist) => wishlist._id === product._id)) {
          state.wishlist.push(product);
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.isLoading = "succeeded";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state) => {
        state.isLoading = "succeeded";
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload
      });
  },
});

export const {removeProductFromWishlist, setToWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
