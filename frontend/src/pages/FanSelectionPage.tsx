import { useState } from 'react';
import { mockFans, getUniqueRooms } from '../data/mockFans';
import { Fan } from '../types/fan';
import { Filter } from 'lucide-react';

export function FanSelectionPage() {
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPowerState, setSelectedPowerState] = useState<string>('all');

  const rooms = getUniqueRooms();

  const filteredFans = mockFans.filter((fan) => {
    if (selectedRoom !== 'all' && fan.room !== selectedRoom) return false;
    if (selectedStatus !== 'all' && fan.status !== selectedStatus) return false;
    if (selectedPowerState === 'on' && !fan.isOn) return false;
    if (selectedPowerState === 'off' && fan.isOn) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Fan Selection</h1>
        <p className="text-muted-foreground">Filter and find specific fans</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Filters</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Room</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="all">All Rooms</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Power State</label>
            <select
              value={selectedPowerState}
              onChange={(e) => setSelectedPowerState(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="all">All States</option>
              <option value="on">ON</option>
              <option value="off">OFF</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found <span className="font-bold text-foreground">{filteredFans.length}</span> fan(s)
        </p>
      </div>

      {filteredFans.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <img 
            src="/assets/generated/empty-state-fans.dim_1200x600.png" 
            alt="No fans found" 
            className="w-96 h-48 object-contain mx-auto mb-6 opacity-50"
          />
          <p className="text-muted-foreground text-lg">No fans match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredFans.map((fan) => (
            <div
              key={fan.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/fan-icon.dim_256x256.png" 
                  alt="Fan" 
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{fan.name}</h3>
                  <p className="text-sm text-muted-foreground">{fan.room}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`text-sm font-semibold ${
                    fan.status === 'online' ? 'text-success' :
                    fan.status === 'error' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {fan.status.charAt(0).toUpperCase() + fan.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Power</span>
                  <span className={`text-sm font-semibold ${
                    fan.isOn ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {fan.isOn ? 'ON' : 'OFF'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Speed</span>
                  <span className="text-sm font-semibold text-foreground">{fan.speed}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Power Usage</span>
                  <span className="text-sm font-semibold text-foreground">{fan.powerConsumption}W</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
