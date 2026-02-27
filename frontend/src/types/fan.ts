export interface Fan {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  speed: number; // 0-100
  status: 'online' | 'offline' | 'error';
  powerConsumption: number; // watts
  temperature?: number; // celsius
  runtime?: number; // hours
}

export interface FanControlState {
  isOn: boolean;
  speed: number;
}
