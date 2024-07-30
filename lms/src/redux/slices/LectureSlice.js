import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../../helpers/axios.js";

const initialState = {
    lectures: [],
    loading: false,
    error: null,
};

// Thunks
export const getCourseLectures = createAsyncThunk(
    "course/lecture/get",
    async (cid, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/courses/${cid}`);
            toast.promise(response, {
                loading: "Fetching course lectures",
                success: "Lectures fetched successfully",
                error: "Failed to load the lectures",
            });
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const addCourseLecture = createAsyncThunk(
    "course/lecture/add",
    async (data, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("lecture", data.lecture);
            formData.append("title", data.title);
            formData.append("description", data.description);

            const response = await axiosInstance.post(`/courses/${data.id}`, formData);
            toast.promise(response, {
                loading: "Adding course lecture",
                success: "Lecture added successfully",
                error: "Failed to add the lecture",
            });
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const deleteCourseLecture = createAsyncThunk(
    "course/lecture/delete",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
            );
            toast.promise(response, {
                loading: "Deleting course lecture",
                success: "Lecture deleted successfully",
                error: "Failed to delete the lecture",
            });
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Slice
const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseLectures.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourseLectures.fulfilled, (state, action) => {
                state.loading = false;
                state.lectures = action.payload?.lectures || [];
            })
            .addCase(getCourseLectures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch lectures";
            })
            .addCase(addCourseLecture.fulfilled, (state, action) => {
                state.lectures.push(action.payload.lecture);
            })
            .addCase(deleteCourseLecture.fulfilled, (state, action) => {
                state.lectures = state.lectures.filter(
                    (lecture) => lecture._id !== action.meta.arg.lectureId
                );
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default lectureSlice.reducer;
