import { Schedule } from '../../types/schedule';
import { Fan } from '../../types/fan';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface DeleteScheduleDialogProps {
  schedule: Schedule | null;
  fan: Fan | undefined;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteScheduleDialog({ schedule, fan, isOpen, onConfirm, onCancel }: DeleteScheduleDialogProps) {
  if (!schedule) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-destructive/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle>Delete Schedule</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <p>Are you sure you want to delete this schedule?</p>
            <div className="bg-muted p-3 rounded-lg mt-3">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Fan:</span> {fan?.name || 'Unknown'} ({fan?.room || 'Unknown'})
              </p>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Time:</span> {schedule.time}
              </p>
            </div>
            <p className="text-destructive font-medium mt-3">This action cannot be undone.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Delete Schedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
