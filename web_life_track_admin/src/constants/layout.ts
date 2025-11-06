export const LAYOUT = {
  DEFAULT_LAYOUT: "DEFAULT_LAYOUT",
  NONE: "NONE",
};

export type LayoutValue = (typeof LAYOUT)[keyof typeof LAYOUT];
