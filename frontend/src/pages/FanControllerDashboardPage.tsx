import { useState } from 'react';
import { mockFans, getActiveFansCount, getTotalPowerConsumption } from '../data/mockFans';
import { Fan as FanIcon, Zap, Activity, TrendingUp, Clock, Power, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function FanControllerDashboardPage() {
  const [bulkSpeed, setBulkSpeed] = useState([50]);
  
  const totalFans = mockFans.length;
  const activeFans = getActiveFansCount();
  const totalPower = getTotalPowerConsumption();
  const onlineFans = mockFans.filter(f => f.status === 'online').length;
  
  // Energy calculations
  const dailyConsumption = (totalPower * 24) / 1000;
  const monthlyConsumption = dailyConsumption * 30;

  const handleTurnAllOn = () => {
    console.log('Turning all fans on');
    // In a real app, this would update the state
  };

  const handleTurnAllOff = () => {
    console.log('Turning all fans off');
    // In a real app, this would update the state
  };

  const handleSetBulkSpeed = () => {
    console.log(`Setting all active fans to speed: ${bulkSpeed[0]}%`);
    // In a real app, this would update the state
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Fan Controller Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive overview and quick controls</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FanIcon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Fans</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalFans}</p>
          <p className="text-xs text-muted-foreground mt-1">{onlineFans} online</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-success/5 to-success/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/20 rounded-lg">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Active Fans</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{activeFans}</p>
          <p className="text-xs text-muted-foreground mt-1">{((activeFans / totalFans) * 100).toFixed(0)}% running</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-warning/5 to-warning/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Power</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalPower}W</p>
          <p className="text-xs text-muted-foreground mt-1">Current draw</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-chart-2/5 to-chart-2/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-chart-2/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-chart-2" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Avg Power/Fan</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {activeFans > 0 ? (totalPower / activeFans).toFixed(1) : '0'}W
          </p>
          <p className="text-xs text-muted-foreground mt-1">Per active fan</p>
        </div>
      </div>

      {/* Energy Summary */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Energy Usage Summary</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-chart-2/20 rounded-lg">
                <Clock className="w-8 h-8 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Daily Consumption</p>
                <p className="text-2xl font-bold text-foreground">{dailyConsumption.toFixed(2)} kWh</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Monthly Consumption</p>
                <p className="text-2xl font-bold text-foreground">{monthlyConsumption.toFixed(1)} kWh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Quick Controls</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Power Controls */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Power className="w-4 h-4" />
              Power Management
            </h3>
            <div className="flex gap-3">
              <Button 
                onClick={handleTurnAllOn}
                className="flex-1 bg-success hover:bg-success/90 text-white shadow-md"
              >
                <Power className="w-4 h-4 mr-2" />
                Turn All On
              </Button>
              <Button 
                onClick={handleTurnAllOff}
                variant="destructive"
                className="flex-1 shadow-md"
              >
                <Power className="w-4 h-4 mr-2" />
                Turn All Off
              </Button>
            </div>
          </div>

          {/* Speed Control */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Bulk Speed Adjustment
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground min-w-[60px]">Speed:</span>
                <Slider
                  value={bulkSpeed}
                  onValueChange={setBulkSpeed}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-foreground min-w-[50px] text-right">
                  {bulkSpeed[0]}%
                </span>
              </div>
              <Button 
                onClick={handleSetBulkSpeed}
                className="w-full bg-primary hover:bg-primary/90 shadow-md"
              >
                <Gauge className="w-4 h-4 mr-2" />
                Apply Speed to All Active Fans
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fan Status Overview */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-secondary/10 via-accent/10 to-primary/10 px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Fan Status Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFans.map((fan) => (
              <div 
                key={fan.id}
                className={`p-4 rounded-lg border transition-all ${
                  fan.isOn 
                    ? 'border-success/30 bg-gradient-to-br from-success/5 to-success/10' 
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{fan.name}</h4>
                    <p className="text-xs text-muted-foreground">{fan.room}</p>
                  </div>
                  <div className={`p-1.5 rounded-full ${
                    fan.isOn ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    <FanIcon className={`w-4 h-4 ${
                      fan.isOn ? 'text-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="font-semibold text-foreground">{fan.speed}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-semibold text-foreground">{fan.powerConsumption}W</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-semibold ${
                      fan.status === 'online' ? 'text-success' : 'text-destructive'
                    }`}>
                      {fan.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
