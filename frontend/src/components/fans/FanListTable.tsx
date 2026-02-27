import { Fan } from '../../types/fan';
import { Power, AlertCircle } from 'lucide-react';

interface FanListTableProps {
  fans: Fan[];
  onFanClick: (fan: Fan) => void;
  onTogglePower: (fanId: string, isOn: boolean) => void;
}

export function FanListTable({ fans, onFanClick, onTogglePower }: FanListTableProps) {
  if (fans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <img 
          src="/assets/generated/empty-state-fans.dim_1200x600.png" 
          alt="No fans" 
          className="w-96 h-48 object-contain mb-6 opacity-50"
        />
        <p className="text-muted-foreground text-lg">No fans found</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Fan</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Room</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Speed</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Power</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Control</th>
          </tr>
        </thead>
        <tbody>
          {fans.map((fan) => (
            <tr 
              key={fan.id} 
              className="border-b border-border last:border-b-0 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-colors"
            >
              <td className="px-6 py-4">
                <button
                  onClick={() => onFanClick(fan)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/assets/generated/fan-icon.dim_256x256.png" 
                    alt="Fan" 
                    className="w-10 h-10"
                  />
                  <span className="font-medium text-foreground">{fan.name}</span>
                </button>
              </td>
              <td className="px-6 py-4 text-foreground">{fan.room}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {fan.status === 'online' && (
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                      <span className="text-success font-semibold">Online</span>
                    </span>
                  )}
                  {fan.status === 'offline' && (
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                      <span className="text-muted-foreground font-medium">Offline</span>
                    </span>
                  )}
                  {fan.status === 'error' && (
                    <span className="flex items-center gap-1.5 text-sm">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-destructive font-semibold">Error</span>
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-chart-1 via-chart-3 to-chart-5 transition-all"
                      style={{ width: `${fan.speed}%` }}
                    />
                  </div>
                  <span className="text-sm text-foreground font-semibold">{fan.speed}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-foreground font-semibold">{fan.powerConsumption}W</span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePower(fan.id, !fan.isOn);
                  }}
                  disabled={fan.status === 'offline'}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${
                    fan.isOn
                      ? 'bg-success hover:bg-success/90 text-success-foreground'
                      : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Power className="w-4 h-4" />
                    <span>{fan.isOn ? 'ON' : 'OFF'}</span>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
