import { GlobalState } from "./GlobalState";

export interface GlobalContextType {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}