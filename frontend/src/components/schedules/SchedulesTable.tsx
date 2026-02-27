import { Schedule } from '../../types/schedule';
import { Fan } from '../../types/fan';
import { Clock, Edit, Trash2, Calendar } from 'lucide-react';
import { Switch } from '../ui/switch';

interface SchedulesTableProps {
  schedules: Schedule[];
  fans: Fan[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (schedule: Schedule) => void;
  onToggleEnabled: (scheduleId: string) => void;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDays(daysOfWeek: number[]): string {
  if (daysOfWeek.length === 7) return 'Daily';
  if (daysOfWeek.length === 5 && daysOfWeek.every(d => d >= 1 && d <= 5)) return 'Weekdays';
  if (daysOfWeek.length === 2 && daysOfWeek.includes(0) && daysOfWeek.includes(6)) return 'Weekends';
  return daysOfWeek.map(d => dayNames[d]).join(', ');
}

function formatAction(schedule: Schedule): string {
  switch (schedule.action) {
    case 'power-on':
      return 'Power On';
    case 'power-off':
      return 'Power Off';
    case 'set-speed':
      return `Set Speed ${schedule.speedValue}%`;
    default:
      return 'Unknown';
  }
}

export function SchedulesTable({ schedules, fans, onEdit, onDelete, onToggleEnabled }: SchedulesTableProps) {
  if (schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-card border border-border rounded-lg">
        <Calendar className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground text-lg">No schedules configured</p>
        <p className="text-muted-foreground text-sm mt-2">Create your first schedule to automate fan control</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Fan</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Time</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Days</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Action</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => {
            const fan = fans.find(f => f.id === schedule.fanId);
            return (
              <tr 
                key={schedule.id} 
                className="border-b border-border last:border-b-0 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/assets/generated/fan-icon.dim_256x256.png" 
                      alt="Fan" 
                      className="w-8 h-8"
                    />
                    <div>
                      <p className="font-medium text-foreground">{fan?.name || 'Unknown Fan'}</p>
                      <p className="text-xs text-muted-foreground">{fan?.room || ''}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{schedule.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{formatDays(schedule.daysOfWeek)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    schedule.action === 'power-on' 
                      ? 'bg-success/20 text-success' 
                      : schedule.action === 'power-off'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {formatAction(schedule)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Switch
                    checked={schedule.enabled}
                    onCheckedChange={() => onToggleEnabled(schedule.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(schedule)}
                      className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary"
                      title="Edit schedule"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(schedule)}
                      className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive"
                      title="Delete schedule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
