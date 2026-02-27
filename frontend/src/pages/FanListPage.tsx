import { useState } from 'react';
import { Fan } from '../types/fan';
import { FanListTable } from '../components/fans/FanListTable';
import { FanControlModal } from '../components/fans/FanControlModal';
import { mockFans, getActiveFansCount, getTotalPowerConsumption } from '../data/mockFans';
import { Fan as FanIcon, Zap, Activity } from 'lucide-react';

export function FanListPage() {
  const [fans, setFans] = useState<Fan[]>(mockFans);
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFanClick = (fan: Fan) => {
    setSelectedFan(fan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTogglePower = (fanId: string, isOn: boolean) => {
    setFans(prevFans =>
      prevFans.map(fan =>
        fan.id === fanId
          ? { ...fan, isOn, speed: isOn ? fan.speed : 0, powerConsumption: isOn ? fan.powerConsumption : 0 }
          : fan
      )
    );
  };

  const handleUpdateFan = (fanId: string, updates: Partial<Fan>) => {
    setFans(prevFans =>
      prevFans.map(fan =>
        fan.id === fanId ? { ...fan, ...updates } : fan
      )
    );
    if (selectedFan && selectedFan.id === fanId) {
      setSelectedFan({ ...selectedFan, ...updates });
    }
  };

  const activeFans = getActiveFansCount();
  const totalPower = getTotalPowerConsumption();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Fan Management</h1>
        <p className="text-muted-foreground">Monitor and control all BLDC fans</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FanIcon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Fans</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{fans.length}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/20 rounded-lg">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Active Fans</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{activeFans}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Power</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalPower}W</p>
        </div>
      </div>

      <FanListTable 
        fans={fans} 
        onFanClick={handleFanClick}
        onTogglePower={handleTogglePower}
      />

      {selectedFan && (
        <FanControlModal
          fan={selectedFan}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateFan}
        />
      )}
    </div>
  );
}
