import { DashboardCards } from "@/components/dashboard-cards";
import { CourseContextType } from "@/types";
import { useOutletContext } from "react-router-dom";

export default function InstructorDashboard() {
  const { instructorData } = useOutletContext<CourseContextType>();
  return <DashboardCards instructorData={instructorData} />;
}
