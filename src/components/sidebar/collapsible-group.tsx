import { SidebarGroupContent, SidebarSeparator } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { OpenApiJson } from "@/types";
import OperationsList from "./operations-list";
import { groupOperationsByTag } from "./groupOperationsByTag";

interface CollapsibleGroupProps {
  spec: OpenApiJson;
}

const CollapsibleGroup: React.FC<CollapsibleGroupProps> = ({ spec }) => {
  const groupedOperations = groupOperationsByTag(spec);

  return (
    <>
      {Object.entries(groupedOperations).map(([specKey, operations], index) => (
        <Collapsible defaultOpen className="group/collapsible" key={`spec-${specKey}-${index}`}>
          <SidebarGroupContent>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-4">
              <div className="text-xs uppercase ml-2 font-semibold">{specKey}</div>
              <ChevronDown size={16} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 mr-4" />
            </CollapsibleTrigger>
            <SidebarSeparator />
            <CollapsibleContent>
              <OperationsList operations={operations} specName={spec.name} />
            </CollapsibleContent>
          </SidebarGroupContent>
        </Collapsible>
      ))}
    </>
  );
};

export default CollapsibleGroup;
