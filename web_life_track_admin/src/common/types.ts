import type { JSX } from "react";

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface DynamicKeyObject {
  [key: string]: any;
}
