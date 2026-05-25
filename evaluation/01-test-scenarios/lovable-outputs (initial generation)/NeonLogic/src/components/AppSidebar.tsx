import { Home, Cpu, BrainCircuit, Newspaper, Zap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Tech", url: "/tech", icon: Cpu },
  { title: "AI", url: "/ai", icon: BrainCircuit },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className={`p-4 ${collapsed ? "text-center" : ""}`}>
          <h2 className="text-primary font-bold text-lg neon-text tracking-wider">
            {collapsed ? "NL" : "NeonLogic"}
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-widest text-xs">
            Navigate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-secondary transition-colors"
                      activeClassName="bg-primary/15 text-primary neon-border"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <div className={`flex items-center gap-2 text-muted-foreground text-xs ${collapsed ? "justify-center" : ""}`}>
            <Zap className="h-3 w-3 text-accent" />
            {!collapsed && <span>Live Feed Active</span>}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
