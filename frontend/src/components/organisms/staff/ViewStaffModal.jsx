import { StaffForm } from '@/components/organisms/staff/StaffForm.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'

export const ViewStaffModal = ({
  open,
  onOpenChange,
  staff,
  form,
  onSubmit,
  navigate,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={'h-auto'}>
        <DialogHeader>
          <DialogTitle>Staff Profile : {staff.employeeId}</DialogTitle>
        </DialogHeader>

        <StaffForm
          purpose={'update'}
          form={form}
          onSubmit={onSubmit}
          className={'flex flex-col space-y-5 p-2'}
        />
        <DialogFooter>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={'outline'}
              onClick={() => navigate(`/staffs/${staff._id}`)}>
              View Full Page
            </Button>
            <Button form="staff-form" type="submit">
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
