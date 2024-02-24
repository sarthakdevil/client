import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isloggedin:localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role')||"",
    data:localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {},
}

const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
})

//export const {}=authslice;
export default  authslice.reducer;