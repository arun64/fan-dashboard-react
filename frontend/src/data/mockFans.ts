import { Fan } from '../types/fan';

export const mockFans: Fan[] = [
  {
    id: 'fan-001',
    name: 'Ceiling Fan 1',
    room: 'Living Room',
    isOn: true,
    speed: 75,
    status: 'online',
    powerConsumption: 45,
    temperature: 42,
    runtime: 1247
  },
  {
    id: 'fan-002',
    name: 'Ceiling Fan 2',
    room: 'Bedroom',
    isOn: false,
    speed: 0,
    status: 'online',
    powerConsumption: 0,
    temperature: 28,
    runtime: 892
  },
  {
    id: 'fan-003',
    name: 'Wall Fan',
    room: 'Kitchen',
    isOn: true,
    speed: 50,
    status: 'online',
    powerConsumption: 32,
    temperature: 38,
    runtime: 654
  },
  {
    id: 'fan-004',
    name: 'Exhaust Fan',
    room: 'Bathroom',
    isOn: true,
    speed: 100,
    status: 'online',
    powerConsumption: 28,
    temperature: 45,
    runtime: 2103
  },
  {
    id: 'fan-005',
    name: 'Ceiling Fan 3',
    room: 'Office',
    isOn: false,
    speed: 0,
    status: 'offline',
    powerConsumption: 0,
    temperature: 25,
    runtime: 445
  },
  {
    id: 'fan-006',
    name: 'Pedestal Fan',
    room: 'Garage',
    isOn: true,
    speed: 60,
    status: 'online',
    powerConsumption: 38,
    temperature: 40,
    runtime: 321
  }
];

export function getFanById(id: string): Fan | undefined {
  return mockFans.find(fan => fan.id === id);
}

export function getTotalPowerConsumption(): number {
  return mockFans.reduce((total, fan) => total + fan.powerConsumption, 0);
}

export function getActiveFansCount(): number {
  return mockFans.filter(fan => fan.isOn).length;
}

export function getFansByRoom(room: string): Fan[] {
  return mockFans.filter(fan => fan.room === room);
}

export function getUniqueRooms(): string[] {
  return Array.from(new Set(mockFans.map(fan => fan.room)));
}
