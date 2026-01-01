import React from "react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
};

export type Action<T> = {
  label: string;
  onClick: (row: T) => void;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
};

export function DynamicTable<T>({ columns, data, actions }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border px-4 py-2 text-left text-sm font-semibold"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="border px-4 py-2 text-sm font-semibold">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="border px-4 py-2 text-sm">
                  {col.render ? col.render(row, index) : (row as any)[col.key]}
                </td>
              ))}

              {actions && (
                <td className="border px-4 py-2 space-x-2">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={`px-2 py-1 rounded text-white text-xs ${action.className}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DynamicTable;
