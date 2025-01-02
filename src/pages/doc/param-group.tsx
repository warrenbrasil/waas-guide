import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { OpenApiParameter } from "@/types";
import MarkdownRenderer from "@/utils/MarkdownRenderer";

interface ParamGroupProps {
  title: string;
  parameters: OpenApiParameter[];
}

const ParamGroup: React.FC<ParamGroupProps> = ({ title, parameters }) => {
  const paramGroup = (
    <Collapsible className="group/collapsible" defaultOpen>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-4">
        <div className="text-base font-semibold">{title}</div>
        <ChevronDown size={16} className="collapsible-arrow group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <Separator />
      <CollapsibleContent>
        {
          parameters.map((parameter, index) => {
            return (
              <div key={index}>
                <div className="parameter">
                  <div className="text-sm">
                    <div className="font-semibold">{parameter.name}</div>
                    <div className="text-sm text-gray-500">
                      <MarkdownRenderer markdownContent={parameter.description} />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="parameter-type">{parameter.schema?.type}</Badge>
                    {parameter.required && <Badge variant="outline" className="parameter-type">required</Badge>}
                    {parameter.readOnly && <Badge variant="outline" className="parameter-type">readonly</Badge>}
                  </div>
                </div>
                <Separator />
              </div>
            )
          })
        }
      </CollapsibleContent>
    </Collapsible>
  );
  return parameters.length === 0 ? null : paramGroup;
};

export default ParamGroup;
