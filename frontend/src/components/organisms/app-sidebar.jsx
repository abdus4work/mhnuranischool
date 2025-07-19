import { Home } from 'lucide-react'
import * as React from 'react'
import { NavLink } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/useAuthStore.js'

// This is sample data.
const menuItemsByRoles = {
  admin: [
    {
      title: 'Student',
      url: '/students',
      items: [
        {
          title: 'View Students',
          url: '/students',
        },
        {
          title: 'Add Student',
          url: '/students/add',
        },
      ],
    },
    {
      title: 'Staffs',
      url: '/staffs',
      items: [
        {
          title: 'View Staffs',
          url: '/staffs',
        },
        {
          title: 'Add Staff',
          url: '/staffs/add',
        },
      ],
    },
    {
      title:'Fees',
      url:'/fees',
      items:[
        {
          title: 'View Fees',
          url: '/fees',
        }
      ]
    },
    {
      title:'Salary',
      url:'/salary',
      items:[
        {
          title: 'View Salary',
          url: '/salary',
        }
      ]
    },
    {
      title:'Transactions',
      url:'/transactions',
      items:[
        {
          title:'Add Transaction',
          url:'/transactions/add',
        },
        {
          title:'View Transactions',
          url:'/transactions',
        }
      ]
    }
    
  ],
}

export function AppSidebar({ ...props }) {
  const role=useAuthStore(state=>state.user?.role);
  const menuItems = menuItemsByRoles[role] || []
  return (
    <Sidebar {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to={'/'}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-semibold">Dashboard</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={'font-medium'}>
                  <NavLink to={`${item.url}`} >
                    {item.title}
                  </NavLink>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <NavLink to={item.url} end key={item.title}>
                          {({ isActive }) => (
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <span >{item.title}</span>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
