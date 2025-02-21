import { useLocation } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Operation } from "@/types";
import { Link } from "react-router-dom";

interface OperationsListProps {
  operations: Operation[];
  specTitle: string;
}

const OperationsList: React.FC<OperationsListProps> = ({ operations, specTitle }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <SidebarMenu className="py-4">
      {operations.filter((operation) => operation.details?.operationId).map((operation) => {
        const operationPath = `/guide/docs/${specTitle.toLocaleLowerCase()}/${operation.details?.operationId}`;
        const isSelected = pathname === operationPath;

        return (
          <SidebarMenuItem 
            key={operation.details?.operationId}
            className={isSelected ? "bg-[rgba(150,150,150,0.15)] rounded-lg" : ""}
          >
            <SidebarMenuButton asChild className="h-auto">
              <Link className="flex items-center justify-between w-full leading-tight" to={operationPath}>
                <span>{operation.details?.summary}</span>
                <span className={`method ${operation.method}`}>{operation.method}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default OperationsList;
