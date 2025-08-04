import { Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <div>
            <div className="bg-[url('/Dbg.png')] bg-center bg-cover w-screen h-screen">
                <Outlet />
            </div>
        </div>
    )
}
