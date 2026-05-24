import { Link, useLocation } from "react-router-dom";
import { Wrench } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <span className="text-base font-semibold tracking-tight">PricingPro</span>
        </Link>
        <nav className="flex items-center gap-4">
          {location.pathname !== "/estimate" && (
            <Link to="/estimate">
              <button className="rounded-full bg-primary text-white text-sm font-medium px-5 py-2 hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
