import { CircleUserRound } from 'lucide-react'

import { ThemeToggle } from '@/components/molecules/ThemeToggle.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx'
import { useLogout } from '@/hooks/auth/useLogout.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export const Profile = ({ isMobile }) => {
  
  const username = useAuthStore((s) => s.user?.username)
  const mutation = useLogout()

  const handleLogout = async () => {
    await mutation.mutateAsync()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 border-1 px-4 py-2 rounded-md cursor-pointer border-slate-400">
          <CircleUserRound />
          {username}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className={'cursor-pointer'}>
          Profile
        </DropdownMenuItem>
        {isMobile && <ThemeToggle className={'px-2'} />}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={'cursor-pointer'}
          variant="destructive"
          onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
