import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { OpenApiJson } from "@/types";
import CollapsibleGroup from "./collapsible-group";

interface SidebarSpecsProps {
  specs: OpenApiJson[];
}

const SidebarSpecs: React.FC<SidebarSpecsProps> = ({ specs }) => {
  return (
    <>
      {specs.map((spec, index) => (
        <SidebarGroup key={`spec-group-${index}`}>
          <SidebarGroupLabel className="text-lg font-semibold mb-4">{spec.info.title}</SidebarGroupLabel>
          <div className="text-sm ml-2 mb-6 line-clamp-3">{spec.info.description}</div>
          <CollapsibleGroup spec={spec} />
        </SidebarGroup>
      ))}
      <SidebarGroup />
    </>
  );
};

export default SidebarSpecs;
