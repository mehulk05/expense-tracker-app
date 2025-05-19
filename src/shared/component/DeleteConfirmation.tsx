import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  title = "Delete Payment Method",
  message = "Are you sure you want to delete this payment method?",
  isDeleting,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm rounded-sm border-0 shadow-xl p-0 overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <AlertDialogHeader className="space-y-0 p-0">
            <AlertDialogTitle className="text-xl font-semibold">
              {title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 rounded-full"
            disabled={isDeleting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content area with icon */}
        <div className="p-6 pt-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-red-500 flex-shrink-0">
              <AlertTriangle size={20} />
            </div>
            <AlertDialogDescription className="text-base text-gray-600">
              {message}
            </AlertDialogDescription>
          </div>
        </div>

        {/* Action buttons */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 rounded-sm border border-gray-200 bg-white py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 rounded-sm bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;