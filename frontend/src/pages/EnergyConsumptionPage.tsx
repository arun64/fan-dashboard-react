import { mockFans, getTotalPowerConsumption } from '../data/mockFans';
import { Zap, TrendingUp, Clock, DollarSign } from 'lucide-react';

export function EnergyConsumptionPage() {
  const totalPower = getTotalPowerConsumption();
  const activeFans = mockFans.filter(f => f.isOn);
  const avgPowerPerFan = activeFans.length > 0 ? totalPower / activeFans.length : 0;
  
  // Mock daily consumption (kWh)
  const dailyConsumption = (totalPower * 24) / 1000;
  const monthlyConsumption = dailyConsumption * 30;
  const estimatedCost = monthlyConsumption * 0.12; // $0.12 per kWh

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Energy Consumption</h1>
        <p className="text-muted-foreground">Monitor power usage and efficiency</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Current Power</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalPower}W</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-chart-2/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-chart-2" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Daily Usage</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{dailyConsumption.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">kWh</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Monthly Usage</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{monthlyConsumption.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground mt-1">kWh</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Est. Cost/Month</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${estimatedCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Per-Fan Consumption</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left pb-3 text-sm font-semibold text-foreground">Fan Name</th>
                <th className="text-left pb-3 text-sm font-semibold text-foreground">Room</th>
                <th className="text-left pb-3 text-sm font-semibold text-foreground">Status</th>
                <th className="text-right pb-3 text-sm font-semibold text-foreground">Current Power</th>
                <th className="text-right pb-3 text-sm font-semibold text-foreground">Daily (kWh)</th>
                <th className="text-right pb-3 text-sm font-semibold text-foreground">Monthly (kWh)</th>
                <th className="text-right pb-3 text-sm font-semibold text-foreground">Runtime (h)</th>
              </tr>
            </thead>
            <tbody>
              {mockFans.map((fan) => {
                const dailyKwh = (fan.powerConsumption * 24) / 1000;
                const monthlyKwh = dailyKwh * 30;
                return (
                  <tr key={fan.id} className="border-b border-border last:border-b-0 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-colors">
                    <td className="py-4 font-medium text-foreground">{fan.name}</td>
                    <td className="py-4 text-foreground">{fan.room}</td>
                    <td className="py-4">
                      {fan.isOn ? (
                        <span className="text-success text-sm font-semibold">Active</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Inactive</span>
                      )}
                    </td>
                    <td className="py-4 text-right font-semibold text-foreground">{fan.powerConsumption}W</td>
                    <td className="py-4 text-right text-foreground">{dailyKwh.toFixed(2)}</td>
                    <td className="py-4 text-right text-foreground">{monthlyKwh.toFixed(1)}</td>
                    <td className="py-4 text-right text-foreground">{fan.runtime}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-2 border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <tr>
                <td colSpan={3} className="py-4 font-bold text-foreground">Total</td>
                <td className="py-4 text-right font-bold text-foreground">{totalPower}W</td>
                <td className="py-4 text-right font-bold text-foreground">{dailyConsumption.toFixed(2)}</td>
                <td className="py-4 text-right font-bold text-foreground">{monthlyConsumption.toFixed(1)}</td>
                <td className="py-4 text-right font-bold text-foreground">
                  {mockFans.reduce((sum, f) => sum + (f.runtime || 0), 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
