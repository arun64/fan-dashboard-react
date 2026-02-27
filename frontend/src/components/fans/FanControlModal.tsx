import { useState, useEffect } from 'react';
import { Fan } from '../../types/fan';
import { X, Power, Gauge, Thermometer, Clock } from 'lucide-react';

interface FanControlModalProps {
  fan: Fan;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (fanId: string, updates: Partial<Fan>) => void;
}

export function FanControlModal({ fan, isOpen, onClose, onUpdate }: FanControlModalProps) {
  const [localSpeed, setLocalSpeed] = useState(fan.speed);
  const [localIsOn, setLocalIsOn] = useState(fan.isOn);

  useEffect(() => {
    setLocalSpeed(fan.speed);
    setLocalIsOn(fan.isOn);
  }, [fan]);

  if (!isOpen) return null;

  const handleTogglePower = () => {
    const newIsOn = !localIsOn;
    setLocalIsOn(newIsOn);
    onUpdate(fan.id, { isOn: newIsOn, speed: newIsOn ? localSpeed : 0 });
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    setLocalSpeed(newSpeed);
    if (localIsOn) {
      onUpdate(fan.id, { speed: newSpeed });
    }
  };

  const handleSpeedPreset = (speed: number) => {
    setLocalSpeed(speed);
    if (localIsOn) {
      onUpdate(fan.id, { speed });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">{fan.name}</h2>
            <p className="text-sm text-muted-foreground">{fan.room}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/30 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Section */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-chart-1/20 to-chart-1/10 rounded-lg p-4 border border-chart-1/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Power className="w-4 h-4" />
                <span className="text-xs font-medium">Status</span>
              </div>
              <p className="text-lg font-bold">
                {localIsOn ? (
                  <span className="text-success">ON</span>
                ) : (
                  <span className="text-muted-foreground">OFF</span>
                )}
              </p>
            </div>

            <div className="bg-gradient-to-br from-chart-2/20 to-chart-2/10 rounded-lg p-4 border border-chart-2/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Gauge className="w-4 h-4" />
                <span className="text-xs font-medium">Speed</span>
              </div>
              <p className="text-lg font-bold text-foreground">{localSpeed}%</p>
            </div>

            <div className="bg-gradient-to-br from-chart-4/20 to-chart-4/10 rounded-lg p-4 border border-chart-4/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Thermometer className="w-4 h-4" />
                <span className="text-xs font-medium">Temp</span>
              </div>
              <p className="text-lg font-bold text-foreground">{fan.temperature}°C</p>
            </div>

            <div className="bg-gradient-to-br from-chart-5/20 to-chart-5/10 rounded-lg p-4 border border-chart-5/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Runtime</span>
              </div>
              <p className="text-lg font-bold text-foreground">{fan.runtime}h</p>
            </div>
          </div>

          {/* Power Control */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Power Control</label>
            <button
              onClick={handleTogglePower}
              className={`w-full py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                localIsOn
                  ? 'bg-success hover:bg-success/90 text-success-foreground'
                  : 'bg-accent hover:bg-accent/90 text-accent-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Power className="w-5 h-5" />
                <span>{localIsOn ? 'Turn OFF' : 'Turn ON'}</span>
              </div>
            </button>
          </div>

          {/* Speed Control */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Speed Control</label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">0%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localSpeed}
                  onChange={handleSpeedChange}
                  disabled={!localIsOn}
                  className="flex-1 h-2.5 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">100%</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedPreset(speed)}
                    disabled={!localIsOn}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${
                      localSpeed === speed && localIsOn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent hover:bg-accent/80 text-accent-foreground'
                    }`}
                  >
                    {speed}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Power Consumption</span>
              <span className="text-lg font-bold text-foreground">{fan.powerConsumption}W</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
