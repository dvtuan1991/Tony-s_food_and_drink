import { ComponentType, ReactNode } from "react";

export interface IRoute {
  path: string;
  element: ReactNode;
}