import { Rocket, Users, LineChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            <span>InnovateLab</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Rocket size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/team"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/team") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users size={20} />
              <span>Our Team</span>
            </Link>
            
            <Link
              to="/analytics"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/analytics") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LineChart size={20} />
              <span>Insights</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;