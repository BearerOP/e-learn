import { useOutletContext } from "react-router-dom"
import { CourseManagement as CourseManagementComponent } from "@/components/course-management"
import { CourseContextType } from "@/types";

export default function CourseManagement() {
    const { courses, setCourses } = useOutletContext<CourseContextType>();

    const handleUpdateCourse = (updatedCourse) => {
        const updatedCourses = courses.map(course => 
            course._id === updatedCourse._id ? updatedCourse : course
        );
        setCourses(updatedCourses);
    };

    return (
        <CourseManagementComponent 
        setActiveView={() => ''}
            courses={courses} 
            onUpdateCourse={handleUpdateCourse}
        />
    )
}
