import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggleDropdown } from "../mode-toggle-dropdown";

interface HeaderProps {
    activeView: string;
}

export function Header({ activeView }: HeaderProps) {
    return (
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-6">
            <div className="flex h-16 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-6" />
            <h1 className="text-lg font-semibold">
                {activeView === "dashboard" && "Instructor Dashboard"}
                {activeView === "createCourse" && "Create New Course"}
                {activeView === "myCourses" && "My Courses"}
            </h1>
            </div>
            <ModeToggleDropdown/>
        </header>
    )
}

