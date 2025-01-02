import { useGlobalContext } from "@/utils";
import React from "react";

const Logo: React.FC = () => {
  const { globalState } = useGlobalContext();
  return (
    <img src={globalState.branding.theme[globalState.theme].logo} alt={globalState.branding.name} className="h-4"/>
  )
}

export default Logo;