import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, fetchApi } from "../../lib/fatchApi";
const wrong = "Something went wrong";
export const basketActionTypes = {
  ADD_ITEM_SUCCESS: "ADD_ITEM_SUCCESS",
  GET_ITEM_SUCCESS: "GET_ITEM_SUCCESS",
};

const initialState = {
  items: [],
  error: "",
  isLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(getBasket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updatedBasketItem.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updatedBasketItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBasketItem.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteBasketItem.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/basket`, {
        headers: {
          "Content-Type": "application/json",
          UserId: "Dilmurat",
        },
      });
      return data.data.items;
    } catch (error) {
      return rejectWithValue(wrong);
    }
  }
);

export const addToBasket = createAsyncThunk(
  "basket/addToBasket",
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/foods/${newItem.id}/addToBasket`,
        {
          amount: newItem.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            UserId: "Dilmurat",
          },
        }
      );
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(wrong);
    }
  }
);

export const updatedBasketItem = createAsyncThunk(
  "basket/updateBasketItem",
  async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(
        `${BASE_URL}/basketItem/${id}/update`,
        {
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            UserId: "Dilmurat",
          },
        }
      );
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(wrong);
    }
  }
);

export const deleteBasketItem = createAsyncThunk(
  "basket/deleteBasketItem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/basketItem/${id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          UserId: "Dilmurat",
        },
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(wrong);
    }
  }
);

export const submitOrder = createAsyncThunk(
  "basket/submitOrder",
  async ({ orderData }, { dispatch, rejectWithValue }) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: orderData,
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(wrong);
    }
  }
);
