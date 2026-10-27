import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] text-zinc-950">
            <Outlet />
        </div>
    )
}

export default AuthLayout;