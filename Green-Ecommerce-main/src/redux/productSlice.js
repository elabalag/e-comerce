import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client, urlFor } from "../client";

export const fetchAllProducts = createAsyncThunk('product/all', async () => {
    const query =
      '*[_type == "products"]{description, price, image, _id, subtitle, category, search, size, title, "imageUrl": thumbnail.asset->url}';
    const response = await client.fetch(query);
    return response;
})

const productSlice = createSlice({
    name: 'product',
    initialState: {products: [],  isLoading: 'idle', error: null},
    reducers: [],
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = "loading";
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = "succeeded";
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = "failed";
        })
    },
})

export default productSlice.reducer;