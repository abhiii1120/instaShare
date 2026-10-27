import { Outlet } from "react-router";

import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import BottomNav from "../components/layout/BottomNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>

        <RightSidebar />
      </div>

      <BottomNav />
    </div>
  );
};

export default MainLayout;