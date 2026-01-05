import React from "react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
};

export type Action<T> = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  className?: string;
};
