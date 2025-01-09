"use client";
import { Rocket, Users, LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 bg-background backdrop-blur-md z-50 border-b dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            <span>TechnoMads</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Rocket size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/team"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/team") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users size={20} />
              <span>Our Team</span>
            </Link>

            <Link
              href="/insights"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/insights") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LineChart size={20} />
              <span>Insights</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
