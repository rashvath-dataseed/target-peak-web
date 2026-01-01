export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
};

export type Action<T> = {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  color?: string;
};
