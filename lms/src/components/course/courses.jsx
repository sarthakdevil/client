import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../course/coursecard.jsx";
import HomeLayout from "../../layout/homelayout.jsx";
import { getAllCourses, setSelectedCourse } from "../../redux/slices/courseslice.js";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const handleCourseSelect = (course) => {
        console.log(course);
        dispatch(setSelectedCourse(course));
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by
                    <span className="font-bold text-yellow-500">
                        Industry experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element) => (
                        <CourseCard key={element._id} data={element} onClick={() => handleCourseSelect(element)} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
