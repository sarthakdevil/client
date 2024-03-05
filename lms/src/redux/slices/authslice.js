import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../helpers/axios";
const initialState={
    isloggedin:localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role')||"",
    data:localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {},
}
  export const createAccount = createAsyncThunk(
    "/auth/register",
    async (data) => {
      try {
        const res = await axiosInstance.post("user/register", data);
        toast.promise(res, {
          loading: "Wait! Creating your account",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to create account"
        });
        return (await res).data;
      } catch (error) {
        toast.error("Failed to create account:", error);
      }
    }
  );

  export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
      .addCase(login.fulfilled, (state, action) => {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role
      })
}})

//export const {}=authslice;
export default  authslice.reducer;