import { useState, useEffect } from 'react';
import { Schedule, ScheduleAction } from '../../types/schedule';
import { Fan } from '../../types/fan';
import { X, Clock, Calendar } from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';

interface ScheduleFormModalProps {
  mode: 'create' | 'edit';
  schedule?: Schedule;
  fans: Fan[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Omit<Schedule, 'id'> | Schedule) => void;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ScheduleFormModal({ mode, schedule, fans, isOpen, onClose, onSave }: ScheduleFormModalProps) {
  const [fanId, setFanId] = useState(schedule?.fanId || '');
  const [time, setTime] = useState(schedule?.time || '07:00');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(schedule?.daysOfWeek || []);
  const [action, setAction] = useState<ScheduleAction>(schedule?.action || 'power-on');
  const [speedValue, setSpeedValue] = useState(schedule?.speedValue || 50);
  const [enabled, setEnabled] = useState(schedule?.enabled ?? true);

  useEffect(() => {
    if (schedule) {
      setFanId(schedule.fanId);
      setTime(schedule.time);
      setDaysOfWeek(schedule.daysOfWeek);
      setAction(schedule.action);
      setSpeedValue(schedule.speedValue || 50);
      setEnabled(schedule.enabled);
    }
  }, [schedule]);

  if (!isOpen) return null;

  const handleDayToggle = (day: number) => {
    setDaysOfWeek(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fanId || daysOfWeek.length === 0) {
      return;
    }

    const scheduleData = {
      fanId,
      time,
      daysOfWeek,
      action,
      speedValue: action === 'set-speed' ? speedValue : undefined,
      enabled,
    };

    if (mode === 'edit' && schedule) {
      onSave({ ...scheduleData, id: schedule.id });
    } else {
      onSave(scheduleData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              {mode === 'create' ? 'Create Schedule' : 'Edit Schedule'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/30 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Fan Selection */}
          <div className="space-y-2">
            <Label htmlFor="fan-select" className="text-sm font-semibold">Select Fan</Label>
            <Select value={fanId} onValueChange={setFanId}>
              <SelectTrigger id="fan-select" className="w-full">
                <SelectValue placeholder="Choose a fan" />
              </SelectTrigger>
              <SelectContent>
                {fans.map(fan => (
                  <SelectItem key={fan.id} value={fan.id}>
                    {fan.name} - {fan.room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time-input" className="text-sm font-semibold">Time</Label>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <Input
                id="time-input"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Days of Week */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Repeat On</Label>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDayToggle(index)}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                    daysOfWeek.includes(index)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Selection */}
          <div className="space-y-2">
            <Label htmlFor="action-select" className="text-sm font-semibold">Action</Label>
            <Select value={action} onValueChange={(value) => setAction(value as ScheduleAction)}>
              <SelectTrigger id="action-select" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="power-on">Power On</SelectItem>
                <SelectItem value="power-off">Power Off</SelectItem>
                <SelectItem value="set-speed">Set Speed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Speed Value (only for set-speed action) */}
          {action === 'set-speed' && (
            <div className="space-y-2">
              <Label htmlFor="speed-input" className="text-sm font-semibold">Speed Value</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="speed-input"
                  type="range"
                  min="0"
                  max="100"
                  value={speedValue}
                  onChange={(e) => setSpeedValue(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-foreground w-12 text-right">{speedValue}%</span>
              </div>
            </div>
          )}

          {/* Enabled Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <Label htmlFor="enabled-switch" className="text-sm font-semibold cursor-pointer">
              Enable Schedule
            </Label>
            <Switch
              id="enabled-switch"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-sm bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!fanId || daysOfWeek.length === 0}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-sm bg-primary hover:bg-primary/90 text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {mode === 'create' ? 'Create Schedule' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
