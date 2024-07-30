import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../helpers/axios.js";

const initialState = {
    courseData: [],
    selectedCourse: null,
};

export const getAllCourses = createAsyncThunk("/courses/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "Loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course...",
            success: "Course deleted successfully",
            error: "Failed to delete the course",
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course",
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// Define a new action for setting the selected course
export const setSelectedCourse = createAsyncThunk("/course/select", async (course) => {
    return course;
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if (action.payload) {
                    state.courseData = [...action.payload];
                }
            })
            // Add case for setting the selected course
            .addCase(setSelectedCourse.fulfilled, (state, action) => {
                state.selectedCourse = action.payload;
            });
    },
});

export default courseSlice.reducer;
