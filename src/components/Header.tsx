import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Fixture Estimate Assistant</span>
        </Link>
        <nav className="flex items-center gap-4">
          {location.pathname !== "/estimate" && (
            <Link to="/estimate">
              <Button variant="hero" size="sm">Start an Estimate</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
