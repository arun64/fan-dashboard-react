import { useState, useEffect } from 'react';
import { Settings, Bell, Monitor, RefreshCw, Palette } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  soundAlerts: boolean;
  emailAlerts: boolean;
  refreshInterval: number;
  temperatureUnit: 'celsius' | 'fahrenheit';
  powerUnit: 'watts' | 'kilowatts';
  defaultView: string;
}

const STORAGE_KEY = 'bldc-fan-settings';

export function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall through to defaults
      }
    }
    return {
      theme: 'system',
      notifications: true,
      soundAlerts: false,
      emailAlerts: false,
      refreshInterval: 5,
      temperatureUnit: 'celsius',
      powerUnit: 'watts',
      defaultView: 'fans'
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your dashboard preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Display Preferences */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Display Preferences</h2>
                <p className="text-sm text-muted-foreground">Customize the appearance of your dashboard</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Select your preferred color theme</p>
              </div>
              <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value as SettingsState['theme'])}>
                <SelectTrigger id="theme" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="temperature-unit" className="text-base font-medium">Temperature Unit</Label>
                <p className="text-sm text-muted-foreground">Display temperature in Celsius or Fahrenheit</p>
              </div>
              <Select value={settings.temperatureUnit} onValueChange={(value) => updateSetting('temperatureUnit', value as SettingsState['temperatureUnit'])}>
                <SelectTrigger id="temperature-unit" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="power-unit" className="text-base font-medium">Power Unit</Label>
                <p className="text-sm text-muted-foreground">Display power consumption in Watts or Kilowatts</p>
              </div>
              <Select value={settings.powerUnit} onValueChange={(value) => updateSetting('powerUnit', value as SettingsState['powerUnit'])}>
                <SelectTrigger id="power-unit" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="watts">Watts (W)</SelectItem>
                  <SelectItem value="kilowatts">Kilowatts (kW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-success/10 via-chart-2/10 to-accent/10 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <Bell className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage alert preferences</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base font-medium">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for fan status changes</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-alerts" className="text-base font-medium">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound when alerts are triggered</p>
              </div>
              <Switch
                id="sound-alerts"
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => updateSetting('soundAlerts', checked)}
                disabled={!settings.notifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-alerts" className="text-base font-medium">Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Send email notifications for critical events</p>
              </div>
              <Switch
                id="email-alerts"
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => updateSetting('emailAlerts', checked)}
                disabled={!settings.notifications}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Defaults */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-secondary/10 via-primary/10 to-chart-5/10 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Monitor className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Dashboard Defaults</h2>
                <p className="text-sm text-muted-foreground">Configure default dashboard behavior</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="default-view" className="text-base font-medium">Default View</Label>
                <p className="text-sm text-muted-foreground">Page to show when opening the dashboard</p>
              </div>
              <Select value={settings.defaultView} onValueChange={(value) => updateSetting('defaultView', value)}>
                <SelectTrigger id="default-view" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fans">Fans</SelectItem>
                  <SelectItem value="energy">Energy Consumption</SelectItem>
                  <SelectItem value="selection">Fan Selection</SelectItem>
                  <SelectItem value="schedules">Schedules</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="refresh-interval" className="text-base font-medium">Auto-Refresh Interval</Label>
                  <p className="text-sm text-muted-foreground">Update dashboard data every {settings.refreshInterval} seconds</p>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground w-12 text-right">{settings.refreshInterval}s</span>
                </div>
              </div>
              <Slider
                id="refresh-interval"
                min={1}
                max={60}
                step={1}
                value={[settings.refreshInterval]}
                onValueChange={([value]) => updateSetting('refreshInterval', value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-warning/10 via-chart-4/10 to-primary/10 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Settings className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">System Information</h2>
                <p className="text-sm text-muted-foreground">Application details and version</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Application Version</span>
              <span className="text-sm font-medium text-foreground">1.0.0</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Platform</span>
              <span className="text-sm font-medium text-foreground">Internet Computer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
