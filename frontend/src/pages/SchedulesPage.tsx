import { useState } from 'react';
import { Schedule } from '../types/schedule';
import { SchedulesTable } from '../components/schedules/SchedulesTable';
import { ScheduleFormModal } from '../components/schedules/ScheduleFormModal';
import { DeleteScheduleDialog } from '../components/schedules/DeleteScheduleDialog';
import { mockFans } from '../data/mockFans';
import { 
  getSchedules, 
  createSchedule, 
  updateSchedule, 
  deleteSchedule, 
  toggleScheduleEnabled 
} from '../data/mockSchedules';
import { Calendar, Plus, Clock } from 'lucide-react';

export function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(getSchedules());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleCreateClick = () => {
    setFormMode('create');
    setSelectedSchedule(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (schedule: Schedule) => {
    setFormMode('edit');
    setSelectedSchedule(schedule);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveSchedule = (scheduleData: Omit<Schedule, 'id'> | Schedule) => {
    if (formMode === 'create') {
      const newSchedule = createSchedule(scheduleData as Omit<Schedule, 'id'>);
      setSchedules(getSchedules());
    } else if (formMode === 'edit' && 'id' in scheduleData) {
      updateSchedule(scheduleData.id, scheduleData);
      setSchedules(getSchedules());
    }
    setIsFormModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleConfirmDelete = () => {
    if (selectedSchedule) {
      deleteSchedule(selectedSchedule.id);
      setSchedules(getSchedules());
    }
    setIsDeleteDialogOpen(false);
    setSelectedSchedule(null);
  };

  const handleToggleEnabled = (scheduleId: string) => {
    toggleScheduleEnabled(scheduleId);
    setSchedules(getSchedules());
  };

  const enabledSchedules = schedules.filter(s => s.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedules Management</h1>
          <p className="text-muted-foreground">Automate fan control with scheduled actions</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Schedule</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Schedules</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{schedules.length}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/20 rounded-lg">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Active Schedules</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{enabledSchedules}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Inactive Schedules</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{schedules.length - enabledSchedules}</p>
        </div>
      </div>

      <SchedulesTable
        schedules={schedules}
        fans={mockFans}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onToggleEnabled={handleToggleEnabled}
      />

      <ScheduleFormModal
        mode={formMode}
        schedule={selectedSchedule || undefined}
        fans={mockFans}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedSchedule(null);
        }}
        onSave={handleSaveSchedule}
      />

      <DeleteScheduleDialog
        schedule={selectedSchedule}
        fan={mockFans.find(f => f.id === selectedSchedule?.fanId)}
        isOpen={isDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedSchedule(null);
        }}
      />
    </div>
  );
}
