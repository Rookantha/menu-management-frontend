import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface MenuItem {
id: number;
name: string;
parentId: number | null;
}

interface MenuState {
items: MenuItem[];
loading: boolean;
}

const initialState: MenuState = {
items: [],
loading: false,
};

// Load backend URL from environment variables
const BASE_URL = process.env.BACKEND_URL || "http://localhost:3002/menu";

// Fetch all menus from API
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
const response = await axios.get(BASE_URL);
return response.data;
});

// Add new menu item
export const addItem = createAsyncThunk("menu/addItem", async (newItem: Omit<MenuItem, "id">) => {
const response = await axios.post(BASE_URL, newItem);
return response.data;
});

// Update existing menu item
export const updateItem = createAsyncThunk(
"menu/updateItem",
async ({ id, name }: { id: number; name: string }) => {
    await axios.put(`${BASE_URL}/${id}`, { name });
    return { id, name };
  }
);

// Delete menu item
export const deleteItem = createAsyncThunk("menu/deleteItem", async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) item.name = action.payload.name;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export default menuSlice.reducer;
