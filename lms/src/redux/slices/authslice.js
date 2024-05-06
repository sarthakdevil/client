import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../helpers/axios";
import Cookies from 'js-cookie'
const initialState={
    isloggedIn:localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem('role')||"",
    data:localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {},
}
  export const createAccount = createAsyncThunk(
    "/auth/signup",
    async (data) => {
      try {
        const res = await axiosInstance.post("/auth/register", data);
        toast.promise(res, {
          loading: "Wait! Creating your account",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to create account"
        });
        return res.data;
      } catch (error) {
        toast.error("Failed to create account:", error);
      }
    }
  );

  export const login = createAsyncThunk("/auth/register", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        const token = res.token; // Assuming the token is in the response data
        Cookies.set("token", token);
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

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
      const res = axiosInstance.get("user/logout");
      toast.promise(res, {
          loading: "Wait! logout in progress...",
          success: (data) => {
              return data?.data?.message;
          },
          error: "Failed to log out"
      });
      return (await res).data;
  } catch(error) {
      toast.error(error?.response?.data?.message);
  }
});

export const getUserData = createAsyncThunk("/user/profile", async () => {
  try {
      const token = Cookies.get(token);
      console.log(token)
      const res = await axiosInstance.get("/user/me", {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return res.data;
  } catch (error) {
      throw new Error(error.message); // Throw the error to be handled in the UI
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
          state.isloggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role
      })
      .addCase(logout.fulfilled,(state,action)=>{
        localStorage.removeItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn",false)
        localStorage.removeItem("role", action?.payload?.user?.role);
        state.isloggedIn= false;
        state.data = null
        state.role = null
      })
}})

//export const {}=authslice;
export default  authslice.reducer;