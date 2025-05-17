
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, Home, BookOpen, Users, CreditCard, Settings, GraduationCap, BookCheck, MessageSquare,
  Bot, LayoutDashboard, ChartBar, ChartLine, Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/common/Logo';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

// Define user role type as a proper union type
type UserRole = 'admin' | 'instructor' | 'student' | 'guardian' | 'mentor';

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )
    }
  >
    {icon}
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="rounded-full bg-elimu-primary px-2 py-0.5 text-xs text-white">
        {badge}
      </span>
    )}
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  // This is a placeholder - in a real app you'd get this from auth state
  const userRole = 'admin' as UserRole; // Add type assertion to ensure userRole is treated as UserRole type

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 flex h-full w-64 flex-col border-r bg-background transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <div className="space-y-1">
            <NavItem to="/dashboard" icon={<Home className="h-4 w-4" />} label="Dashboard" />
            <NavItem to="/courses" icon={<BookOpen className="h-4 w-4" />} label="Courses" badge={3} />
            <NavItem to="/my-learning" icon={<BookCheck className="h-4 w-4" />} label="My Learning" />
            <NavItem to="/certificates" icon={<GraduationCap className="h-4 w-4" />} label="Certificates" />
            <NavItem to="/messages" icon={<MessageSquare className="h-4 w-4" />} label="Messages" badge={2} />
            <NavItem to="/ai-tutor" icon={<Bot className="h-4 w-4" />} label="AI Tutor" />
            <NavItem to="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            <NavItem to="/billing" icon={<CreditCard className="h-4 w-4" />} label="Billing" />
          </div>

          {/* Admin-only navigation */}
          {(userRole === 'admin' || userRole === 'instructor') && (
            <>
              <Separator className="my-4" />
              <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
                {userRole === 'admin' ? 'Administration' : 'Instructor'}
              </p>
              <div className="space-y-1">
                <NavItem to="/admin" icon={<LayoutDashboard className="h-4 w-4" />} label="Admin Dashboard" />
                <NavItem to="/admin/users" icon={<Users className="h-4 w-4" />} label="Users" />
                <NavItem to="/admin/payments" icon={<CreditCard className="h-4 w-4" />} label="Payments" />
                <NavItem to="/admin/earnings" icon={<Coins className="h-4 w-4" />} label="Earnings" />
                <NavItem to="/admin/analytics" icon={<ChartBar className="h-4 w-4" />} label="Analytics" />
              </div>
            </>
          )}
        </div>

        <div className="border-t p-4">
          <NavLink to="/profile" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
