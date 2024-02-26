import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../helpers/axios";
const initialState={
    isloggedin:localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role')||"",
    data:localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {},
}
  export const createAccount = createAsyncThunk(
    "auth/signup",
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

const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
})
//export const {}=authslice;
export default  authslice.reducer;