import { NavLink } from "react-router";
import {
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
  CircleUserRound,
  Clapperboard,
  Menu,
} from "lucide-react";

import BrandMark from "../common/BrandMark";

const primaryNav = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Search", icon: Search },
  { label: "Explore", icon: Compass },
  { label: "Reels", icon: Clapperboard },
  { label: "Messages", icon: MessageCircle },
  { label: "Create", icon: PlusSquare },
  { label: "Notifications", icon: Heart },
  { label: "Profile", icon: CircleUserRound },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-61 shrink-0 border-r border-zinc-200 bg-[#fafafa] px-4 py-4 lg:flex lg:flex-col">
      <div className="px-2 py-3">
        <BrandMark compact />
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1">
        {primaryNav.map(({ label, icon: Icon, to }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-3 py-3 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-800 hover:bg-zinc-100"
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </NavLink>
          ) : (
            <button
              key={label}
              type="button"
              className="flex cursor-default items-center gap-4 rounded-2xl px-3 py-3 text-[15px] font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
              aria-disabled="true"
              title="Coming soon"
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </button>
          )
        )}
      </nav>

      <div className="mt-auto border-t border-zinc-200 pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left text-[15px] font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
        >
          <div className="h-9 w-9 rounded-full bg-zinc-200" />
          <span>Profile</span>
        </button>
      </div>

      <button
        type="button"
        className="mt-4 flex items-center gap-4 rounded-2xl px-3 py-3 text-[15px] font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
      >
        <Menu className="h-6 w-6" />
        <span>More</span>
      </button>
    </aside>
  );
};

export default Sidebar;