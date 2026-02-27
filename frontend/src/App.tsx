import { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { SidebarNav } from './components/nav/SidebarNav';
import { FanListPage } from './pages/FanListPage';
import { EnergyConsumptionPage } from './pages/EnergyConsumptionPage';
import { FanSelectionPage } from './pages/FanSelectionPage';
import { SchedulesPage } from './pages/SchedulesPage';
import { SettingsPage } from './pages/SettingsPage';
import { FanControllerDashboardPage } from './pages/FanControllerDashboardPage';

type CurrentView = 'fans' | 'energy' | 'selection' | 'schedules' | 'settings' | 'dashboard';

function App() {
  const [selectedView, setSelectedView] = useState<CurrentView>('fans');

  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <FanControllerDashboardPage />;
      case 'fans':
        return <FanListPage />;
      case 'energy':
        return <EnergyConsumptionPage />;
      case 'selection':
        return <FanSelectionPage />;
      case 'schedules':
        return <SchedulesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <FanListPage />;
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <SidebarNav 
          selectedView={selectedView} 
          onViewChange={setSelectedView} 
        />
      }
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
