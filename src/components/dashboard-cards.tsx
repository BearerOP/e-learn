import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, CreditCard, BadgeCheck } from 'lucide-react'

interface DashboardCardsProps {
    instructorData: {
        publishedCourses: number;
        totalStudents: number;
        totalEarnings: number;
    };
}

export function DashboardCards({ instructorData }: DashboardCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Courses
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{instructorData.publishedCourses}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Students
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{instructorData.totalStudents}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Earnings
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${instructorData.totalEarnings.toFixed(2)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Instructor Rating
                    </CardTitle>
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4.8</div>
                </CardContent>
            </Card>
        </div>
    )
}

