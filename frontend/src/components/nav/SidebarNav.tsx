import { Fan, Zap, Filter, Calendar, Settings, LayoutDashboard } from 'lucide-react';

type CurrentView = 'fans' | 'energy' | 'selection' | 'schedules' | 'settings' | 'dashboard';

interface SidebarNavProps {
  selectedView: CurrentView;
  onViewChange: (view: CurrentView) => void;
}

export function SidebarNav({ selectedView, onViewChange }: SidebarNavProps) {
  const navItems: Array<{ id: CurrentView; label: string; icon: typeof Fan }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fans', label: 'Fans', icon: Fan },
    { id: 'energy', label: 'Energy Consumption', icon: Zap },
    { id: 'selection', label: 'Fan Selection', icon: Filter },
    { id: 'schedules', label: 'Schedules', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/bldc-fan-logo.dim_512x512.png" 
            alt="BLDC Fan Controller" 
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">BLDC Controller</h1>
            <p className="text-xs text-muted-foreground">Fan Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-foreground'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-sidebar-accent-foreground' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="p-4 border-t border-sidebar-border text-xs text-muted-foreground">
        <p className="text-center">
          © {new Date().getFullYear()} Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'bldc-fan-controller'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sidebar-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </aside>
  );
}
