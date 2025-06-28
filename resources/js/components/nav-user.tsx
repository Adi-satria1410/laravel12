import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    // Tentukan positioning yang lebih smart
    const getDropdownSide = () => {
        if (isMobile) return 'bottom';
        if (state === 'collapsed') return 'right';
        return 'bottom';
    };

    const getDropdownAlign = () => {
        if (isMobile) return 'center';
        if (state === 'collapsed') return 'start';
        return 'end';
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton 
                            size={isMobile ? "default" : "lg"} 
                            className={`
                                group text-sidebar-accent-foreground 
                                data-[state=open]:bg-sidebar-accent
                                ${isMobile ? 'h-10 px-2' : 'h-12 px-3'}
                                transition-all duration-200
                                hover:bg-sidebar-accent/50
                            `}
                        >
                            <UserInfo user={auth.user} />
                            <ChevronsUpDown className={`
                                ml-auto transition-transform duration-200
                                group-data-[state=open]:rotate-180
                                ${isMobile ? 'size-3' : 'size-4'}
                            `} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={`
                            rounded-lg shadow-lg border
                            ${isMobile 
                                ? 'w-screen max-w-sm mx-4 min-w-0' 
                                : 'w-(--radix-dropdown-menu-trigger-width) min-w-56'
                            }
                            ${state === 'collapsed' && !isMobile ? 'ml-2' : ''}
                        `}
                        align={getDropdownAlign()}
                        side={getDropdownSide()}
                        sideOffset={isMobile ? 8 : 4}
                        alignOffset={isMobile ? 0 : -4}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
