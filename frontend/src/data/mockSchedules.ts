import { Schedule } from '../types/schedule';

let schedules: Schedule[] = [
  {
    id: 'schedule-001',
    fanId: 'fan-001',
    time: '07:00',
    daysOfWeek: [1, 2, 3, 4, 5], // Weekdays
    enabled: true,
    action: 'power-on',
  },
  {
    id: 'schedule-002',
    fanId: 'fan-001',
    time: '22:00',
    daysOfWeek: [1, 2, 3, 4, 5], // Weekdays
    enabled: true,
    action: 'power-off',
  },
  {
    id: 'schedule-003',
    fanId: 'fan-002',
    time: '23:00',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Daily
    enabled: true,
    action: 'set-speed',
    speedValue: 50,
  },
  {
    id: 'schedule-004',
    fanId: 'fan-003',
    time: '06:30',
    daysOfWeek: [0, 6], // Weekends
    enabled: false,
    action: 'power-on',
  },
  {
    id: 'schedule-005',
    fanId: 'fan-004',
    time: '18:00',
    daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
    enabled: true,
    action: 'set-speed',
    speedValue: 75,
  },
];

export function getSchedules(): Schedule[] {
  return [...schedules];
}

export function getScheduleById(id: string): Schedule | undefined {
  return schedules.find(schedule => schedule.id === id);
}

export function getSchedulesByFanId(fanId: string): Schedule[] {
  return schedules.filter(schedule => schedule.fanId === fanId);
}

export function createSchedule(schedule: Omit<Schedule, 'id'>): Schedule {
  const newSchedule: Schedule = {
    ...schedule,
    id: `schedule-${Date.now()}`,
  };
  schedules.push(newSchedule);
  return newSchedule;
}

export function updateSchedule(id: string, updates: Partial<Schedule>): Schedule | undefined {
  const index = schedules.findIndex(schedule => schedule.id === id);
  if (index === -1) return undefined;
  
  schedules[index] = { ...schedules[index], ...updates };
  return schedules[index];
}

export function deleteSchedule(id: string): boolean {
  const index = schedules.findIndex(schedule => schedule.id === id);
  if (index === -1) return false;
  
  schedules.splice(index, 1);
  return true;
}

export function toggleScheduleEnabled(id: string): Schedule | undefined {
  const schedule = schedules.find(s => s.id === id);
  if (!schedule) return undefined;
  
  schedule.enabled = !schedule.enabled;
  return schedule;
}
