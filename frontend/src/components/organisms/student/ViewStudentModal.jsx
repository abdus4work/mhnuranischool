import { StudentUpdateForm } from '@/components/organisms/student/StudentUpdateForm.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'

export const ViewStudentModal = ({
  open,
  onOpenChange,
  student,
  form,
  onSubmit,
  navigate,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={'h-auto '}>
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className={'h-96 '}>
          <StudentUpdateForm
            form={form}
            onSubmit={onSubmit}
            student={student}
            />
        </ScrollArea>
        <DialogFooter>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={'outline'}
              onClick={() => navigate(`/students/${student._id}`)}>
              View Full Page
            </Button>
            <Button form="student-update-form" type="submit">
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
