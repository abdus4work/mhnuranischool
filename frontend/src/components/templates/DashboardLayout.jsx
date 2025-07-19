import { Suspense } from 'react'
import { Outlet } from 'react-router'

import Logo from '@/assets/logo.png'
import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import { Profile } from '@/components/molecules/Profile.jsx'
import { ThemeToggle } from '@/components/molecules/ThemeToggle.jsx'
import { AppSidebar } from '@/components/organisms/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile.js'

export const DashboardLayout = () => {
  const isMobile = useIsMobile()
  return (
    <SidebarProvider >
      <ErrorBoundary>
        <Suspense fallback="Loading">
          <AppSidebar />
        </Suspense>
      </ErrorBoundary>
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between z-50">
          <div className={'flex items-center gap-2 h-full'}>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 " />
            <img className="h-10" src={Logo} />
            <span className='font-[Aclonica] text-[var(--brand)] text-sm md:text-lg'>M.H. NURANI NATIONAL SCHOOL</span>
          </div>

          <div className={'flex items-center md:gap-10 gap-2'}>
            <Profile isMobile={isMobile} />
            {!isMobile && <ThemeToggle />}
          </div>
        </header>
        <div className={'p-4 h-full'}>
          <Outlet />
        </div>
        <footer className="bg-background sticky bottom-0 flex h-16 shrink-0 items-center justify-between px-4">
          <span className="text-sm text-muted-foreground ">
            © {new Date().getFullYear()} M.H. NURANI NATIONAL SCHOOL
          </span>
          <span className="text-sm text-muted-foreground">
            All rights reserved.
          </span>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
