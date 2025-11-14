import type { JSX } from "react";

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface DynamicKeyObject {
  [key: string]: any;
}

export interface IOptionCustomLineChart {
  labels: {
    text: string;
    color: string;
    dataKey: string;
    unit?: string;
  }[];
  yAxis: {
    min: number;
    max: number;
    unit: string;
  }[];
}
