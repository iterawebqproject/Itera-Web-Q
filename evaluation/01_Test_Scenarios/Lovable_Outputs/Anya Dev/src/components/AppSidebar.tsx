import {
  Home,
  BookOpen,
  FlaskConical,
  FolderKanban,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Blog", url: "/blog", icon: BookOpen },
  { title: "Experiments", url: "/experiments", icon: FlaskConical },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "About Me", url: "/about", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-6">
          {!collapsed && (
            <h2 className="font-serif text-lg text-foreground tracking-tight">
              Anya Dev
            </h2>
          )}
          {collapsed && (
            <span className="text-lg font-serif text-foreground" aria-hidden="true">A</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        aria-current={active ? "page" : undefined}
                        className={`transition-colors duration-150 ${
                          active
                            ? "bg-sidebar-accent text-secondary font-medium"
                            : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                        }`}
                        activeClassName=""
                      >
                        <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
