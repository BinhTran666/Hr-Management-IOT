import { createSlice } from "@reduxjs/toolkit";

// Kiểm tra localStorage để lấy trạng thái đăng nhập
const savedUser = JSON.parse(localStorage.getItem("user"));
const initialState = {
  currentUser: savedUser || null,
  isAuthenticated: !!savedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload; // Lưu thông tin người dùng
      state.isAuthenticated = true; // Đánh dấu đã đăng nhập

      // Lưu thông tin vào localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null; // Xóa thông tin người dùng
      state.isAuthenticated = false; // Đánh dấu chưa đăng nhập

      // Xóa thông tin khỏi localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
