import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import SidebarSpecs from "./sidebar-specs";
import { useFetchSpecs } from "./useFetchSpecs";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "@/utils";
import { useEffect } from "react";

export function AppSidebar() {
  const specs = useFetchSpecs();
  const location = useLocation();
  const { globalState } = useGlobalContext();
  const { setOpen } = useSidebar();

  useEffect(() => {
    const isPage = globalState.pages.includes(location.pathname);
    setOpen(!isPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, globalState.pages]);

  const sidebar = (
    <Sidebar variant="sidebar" >
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarSpecs specs={specs} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );

  return sidebar;
}
