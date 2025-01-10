import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCoursesByCategory } from "@/lib/api";
import CategoryCourses from "@/components/category-courses";
import { toast } from "sonner";

export default function CategoryPage() {
  const { category } = useParams(); // Get category from URL params
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) return; // Skip fetching if category is not available yet

    const fetchCourses = async () => {
      try {
        const fetchedCourses = await fetchCoursesByCategory(category);
        if (!fetchedCourses) {
          toast.error("Failed to fetch courses");
        } else {
          setCourses(fetchedCourses.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch courses");
        console.error("Error fetching courses:", error);
        // navigate('/')
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category, navigate]);

  return (
    <CategoryCourses
      category={category}
      loading={loading}
      initialCourses={courses}
      course={courses[0]}
    />
  );
}
