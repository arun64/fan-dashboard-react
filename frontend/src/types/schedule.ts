export type ScheduleAction = 'power-on' | 'power-off' | 'set-speed';

export interface Schedule {
  id: string;
  fanId: string;
  time: string; // HH:MM format
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  enabled: boolean;
  action: ScheduleAction;
  speedValue?: number; // Only for 'set-speed' action
}
