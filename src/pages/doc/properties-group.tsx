import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Ellipsis } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ParsedProperty } from "@/types";

interface RequestBodyGroupProps {
  title?: string;
  properties: ParsedProperty[];
}

const PropertiesGroup: React.FC<RequestBodyGroupProps> = ({ title, properties }) => {
  const renderProperties = (properties: ParsedProperty[], level = 0) => {
    return properties.map((property, index) => {
      const hasChildren = (
        property.properties && property.properties.length > 0
      );
      const isEnum = property.enumValues && property.enumValues.length > 0;
      const isArray = property.type === "array" && property.items;

      if (isEnum) {
        return (
          <div key={index} className={`ml-${level}`}>
            <div className="text-sm font-semibold">
              {property.name}
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( Enum )</span>
              {
                property.required && <span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-400">( required )</span>
              }
              {
                property.readOnly && <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( readonly )</span>
              }
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( {property.description} )</span>
            </div>
            <ul className="list-disc ml-4 mt-1 text-gray-500 dark:text-gray-400">
              {property.enumValues?.map((enumValue, index) => (
                <li key={index} className="text-xs">
                  {enumValue}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      if (isArray) {
        return (
          <Collapsible
            key={index}
            className={`ml-${level * 4}`}
            defaultOpen={level === 0} // Abre somente o nível superior
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-4">
              <div className="text-sm font-semibold">
                {property.name}
                <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( Array )</span>
                {
                  property.required && <span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-400">( required )</span>
                }
                {
                  property.readOnly && <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( readonly )</span>
                }
                <span className="ml-4 text-xs font-normal text-gray-500 dark:text-gray-400">( {property.description} )</span>
              </div>
              <Ellipsis size={16} className="collapsible-arrow" />
            </CollapsibleTrigger>
            <Separator />
            <CollapsibleContent>
              <div className="ml-4 mt-2 text-gray-500 dark:text-gray-400">
                <div className="text-xs font-semibold">Items:</div>
                {renderProperties(property.items!, level + 1)}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      }
      return (
        <Collapsible
          key={index}
          className={`ml-${level * 4}`}
          defaultOpen={level === 0} // Abre somente o nível superior
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4">
            <div className="text-sm font-semibold text-left">
              {property.name}
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                ( {`${hasChildren ? "object" : property.type}`}{property.nullable ? " nullable" : ""} )
              </span>
              {
                property.required && <span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-400">( required )</span>
              }
              {
                property.readOnly && <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( readonly )</span>
              }
              {
                property.in ?
                  (<span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                    ({`in ${property.in}`})
                  </span>) : null
              }
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">( {property.description} )</span>
            </div>
            {hasChildren && <Ellipsis size={16} className="collapsible-arrow" />}
          </CollapsibleTrigger>
          <Separator />
          <CollapsibleContent>
            {hasChildren && (
              <div className="ml-4">
                {renderProperties(property.properties!, level + 1)}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      );
    });
  };

  const requestBodyGroup = (
    <div className="property-tree mt-4">
      {title && <div className="font-semibold text-base">{title}</div>}
      {renderProperties(properties)}
    </div>
  );

  if(properties.length === 0) {
    return null;
  }

  return (requestBodyGroup)
};

export default PropertiesGroup;
