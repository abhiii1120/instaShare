import {
  Home,
  PlusSquare,
  Search,
  CircleUserRound,
  Clapperboard,
} from "lucide-react";

const items = [
  { label: "Home", icon: Home, active: true },
  { label: "Search", icon: Search },
  { label: "Create", icon: PlusSquare },
  { label: "Reels", icon: Clapperboard },
  { label: "Profile", icon: CircleUserRound },
];

const BottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-120 grid-cols-5 px-2 py-2">
        {items.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors ${
              active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-950"
            }`}
            title={label}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;